import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    const { user_id, password, userType } = await request.json();

    // 入力検証
    if (!user_id || !password) {
      return NextResponse.json({
        success: false,
        error: 'E003',
        message: '入力不備'
      }, { status: 400 });
    }

    // ユーザー認証
    const user = await User.findOne({ user_id });
    if (!user) {
      return NextResponse.json({
        success: false,
        error: 'E001',
        message: '認証失敗'
      }, { status: 401 });
    }

    // パスワード検証
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({
        success: false,
        error: 'E001',
        message: '認証失敗'
      }, { status: 401 });
    }

    // テスト環境用ユーザー種別変更
    let role = user.role;
    if (userType && process.env.NODE_ENV === 'development') {
      role = userType;
    }

    // JWTトークン生成
    const token = jwt.sign(
      { 
        user_id: user.user_id,
        role: role 
      },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    // 最終ログイン日時更新
    await User.updateOne(
      { user_id },
      { last_login: new Date() }
    );

    return NextResponse.json({
      success: true,
      token,
      user_id: user.user_id,
      role: role,
      expires_in: 3600
    });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({
      success: false,
      error: 'E999',
      message: 'システムエラー'
    }, { status: 500 });
  }
}