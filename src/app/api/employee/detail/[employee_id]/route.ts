import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Employee from '@/models/Employee';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ employee_id: string }> }
) {
  try {
    await dbConnect();
    
    const { employee_id } = await params;

    // 社員情報取得
    const employee = await Employee.findOne({ employee_id });
    
    if (!employee) {
      return NextResponse.json({
        success: false,
        error: 'E301',
        message: '社員情報が存在しません'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      employee_id: employee.employee_id,
      full_name: employee.full_name,
      email: employee.email,
      phone: employee.phone,
      department: employee.department,
      position: employee.position,
      status: employee.status,
      skill: employee.skill,
      join_date: employee.join_date,
      created_at: employee.created_at,
      updated_at: employee.updated_at
    });

  } catch (error) {
    console.error('Employee detail error:', error);
    return NextResponse.json({
      success: false,
      error: 'E302',
      message: 'データ取得失敗'
    }, { status: 500 });
  }
}