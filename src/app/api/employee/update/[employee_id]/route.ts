import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Employee from '@/models/Employee';
import * as yup from 'yup';

// メッセージ定義
const messages = {
  E201: '必須項目が入力されていません',
  E202: 'このメールアドレスは既に使用されています',
  E203: '社員情報が存在しません',
  E204: 'データの形式が正しくありません',
  E299: 'システムエラー',
  SUCCESS: '社員情報を更新しました'
};

// DTOバリデーションスキーマ
const employeeUpdateSchema = yup.object({
  full_name: yup.string().required(messages.E201),
  email: yup.string().email(messages.E204).required(messages.E201),
  phone: yup.string().nullable(),
  department: yup.string().required(messages.E201),
  position: yup.string().required(messages.E201),
  status: yup.string().required(messages.E201),
  skill: yup.array().of(yup.string()).nullable(),
  join_date: yup.date().required(messages.E201)
});

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ employee_id: string }> }
) {
  try {
    await dbConnect();
    const { employee_id } = await params;
    const body = await request.json();

    // DTOバリデーション
    try {
      await employeeUpdateSchema.validate(body, { abortEarly: false });
    } catch (validationError: any) {
      const result = {
        success: false,
        error: 'E201',
        message: validationError.errors?.[0] || messages.E201
      };
      return NextResponse.json(result, { status: 400 });
    }

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
    // メールアドレスの重複チェック（自分以外）
    const existingEmployee = await Employee.findOne({ 
      email,
      employee_id: { $ne: employee_id }
    });
    
    if (existingEmployee) {
      const result = {
        success: false,
        error: 'E202',
        message: messages.E202
      };
      return NextResponse.json(result, { status: 400 });
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
      const result = {
        success: false,
        error: 'E203',
        message: messages.E203
      };
      return NextResponse.json(result, { status: 404 });
    }

    const result = {
      success: true,
      message: messages.SUCCESS,
      employee: {
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
      }
    };
    return NextResponse.json(result);

  } catch (error) {
    console.error('Employee update error:', error);
    if (error instanceof Error && error.name === 'ValidationError') {
      const result = {
        success: false,
        error: 'E204',
        message: messages.E204
      };
      return NextResponse.json(result, { status: 400 });
    }
    const result = {
      success: false,
      error: 'E299',
      message: messages.E299
    };
    return NextResponse.json(result, { status: 500 });
  }
}