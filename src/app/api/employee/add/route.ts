import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Employee from '@/models/Employee';

function generateEmployeeId(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substr(2, 5);
  return `EMP${timestamp}${random}`.toUpperCase().substr(0, 20);
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    const {
      employee_id, // 手動入力または未設定
      full_name,
      email,
      phone,
      department,
      position,
      status,
      skill,
      join_date
    } = await request.json();

    // 入力検証
    if (!full_name || !email || !department || !position || !status || !join_date) {
      return NextResponse.json({
        success: false,
        error: 'E301',
        message: '必須項目が入力されていません'
      }, { status: 400 });
    }

    // 社員IDの処理（手動入力優先、未設定の場合は自動生成）
    let finalEmployeeId = employee_id;
    if (!finalEmployeeId) {
      finalEmployeeId = generateEmployeeId();
    }

    // 社員IDの重複チェック
    const existingEmployeeById = await Employee.findOne({ employee_id: finalEmployeeId });
    if (existingEmployeeById) {
      return NextResponse.json({
        success: false,
        error: 'E302',
        message: 'この社員IDは既に使用されています'
      }, { status: 400 });
    }

    // メールアドレス重複チェック
    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      return NextResponse.json({
        success: false,
        error: 'E303',
        message: 'このメールアドレスは既に使用されています'
      }, { status: 400 });
    }

    // 電話番号重複チェック（電話番号がある場合）
    if (phone) {
      const existingPhone = await Employee.findOne({ phone });
      if (existingPhone) {
        return NextResponse.json({
          success: false,
          error: 'E304',
          message: 'この電話番号は既に使用されています'
        }, { status: 400 });
      }
    }

    // 新規社員登録
    const newEmployee = new Employee({
      employee_id: finalEmployeeId,
      full_name,
      email,
      phone: phone || undefined,
      department,
      position,
      status,
      skill: Array.isArray(skill) ? skill : [],
      join_date: new Date(join_date)
    });

    const savedEmployee = await newEmployee.save();

    return NextResponse.json({
      success: true,
      employee_id: savedEmployee.employee_id,
      full_name: savedEmployee.full_name,
      email: savedEmployee.email,
      phone: savedEmployee.phone,
      department: savedEmployee.department,
      position: savedEmployee.position,
      status: savedEmployee.status,
      skill: savedEmployee.skill,
      join_date: savedEmployee.join_date,
      message: '社員登録が完了しました'
    });

  } catch (error) {
    console.error('Add employee error:', error);
    
    if (error instanceof Error && error.name === 'ValidationError') {
      return NextResponse.json({
        success: false,
        error: 'E305',
        message: 'データの形式が正しくありません'
      }, { status: 400 });
    }

    return NextResponse.json({
      success: false,
      error: 'E399',
      message: 'システムエラー'
    }, { status: 500 });
  }
}