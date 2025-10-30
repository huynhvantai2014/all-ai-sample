import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    // Authorizationヘッダーからトークン取得
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({
        success: false,
        error: 'E101',
        message: 'トークン無効'
      }, { status: 401 });
    }

    const token = authHeader.substring(7);

    try {
      // トークン検証
      const decoded = jwt.verify(token, JWT_SECRET) as any;
      
      // ユーザー情報取得
      const user = await User.findOne({ user_id: decoded.user_id });
      if (!user) {
        return NextResponse.json({
          success: false,
          error: 'E103',
          message: 'ユーザー情報取得失敗'
        }, { status: 404 });
      }

      return NextResponse.json({
        success: true,
        user_id: user.user_id,
        username: user.username,
        role: user.role,
        department: user.department,
        last_login: user.last_login
      });

    } catch (jwtError) {
      return NextResponse.json({
        success: false,
        error: 'E102',
        message: 'トークン期限切れ'
      }, { status: 401 });
    }

  } catch (error) {
    console.error('UserInfo error:', error);
    return NextResponse.json({
      success: false,
      error: 'E999',
      message: 'システムエラー'
    }, { status: 500 });
  }
}