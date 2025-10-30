import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Employee from '@/models/Employee';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ employee_id: string }> }
) {
  try {
    await dbConnect();
    
    const { employee_id } = await params;
    const body = await request.json();

    const {
      full_name,
      email,
      phone,
      department,
      position,
      status,
      skill,
      join_date
    } = body;

    // 入力検証
    if (!full_name || !email || !department || !position || !status || !join_date) {
      return NextResponse.json({
        success: false,
        error: 'E201',
        message: '必須項目が入力されていません'
      }, { status: 400 });
    }

    // メールアドレスの重複チェック（自分以外）
    const existingEmployee = await Employee.findOne({ 
      email,
      employee_id: { $ne: employee_id }
    });
    
    if (existingEmployee) {
      return NextResponse.json({
        success: false,
        error: 'E202',
        message: 'このメールアドレスは既に使用されています'
      }, { status: 400 });
    }

    // 社員情報更新
    const updatedEmployee = await Employee.findOneAndUpdate(
      { employee_id },
      {
        full_name,
        email,
        phone: phone || undefined,
        department,
        position,
        status,
        skill: Array.isArray(skill) ? skill : [],
        join_date: new Date(join_date)
      },
      { 
        new: true,
        runValidators: true
      }
    );

    if (!updatedEmployee) {
      return NextResponse.json({
        success: false,
        error: 'E203',
        message: '社員情報が存在しません'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      employee_id: updatedEmployee.employee_id,
      full_name: updatedEmployee.full_name,
      email: updatedEmployee.email,
      phone: updatedEmployee.phone,
      department: updatedEmployee.department,
      position: updatedEmployee.position,
      status: updatedEmployee.status,
      skill: updatedEmployee.skill,
      join_date: updatedEmployee.join_date,
      updated_at: updatedEmployee.updated_at
    });

  } catch (error) {
    console.error('Employee update error:', error);
    
    if (error instanceof Error && error.name === 'ValidationError') {
      return NextResponse.json({
        success: false,
        error: 'E204',
        message: 'データの形式が正しくありません'
      }, { status: 400 });
    }

    return NextResponse.json({
      success: false,
      error: 'E299',
      message: 'システムエラー'
    }, { status: 500 });
  }
}