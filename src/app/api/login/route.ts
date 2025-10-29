import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { userId, password } = await request.json();
  // TODO: Replace with real authentication logic (e.g., DB lookup)
  if (userId === 'demo' && password === 'demo') {
    return NextResponse.json({ success: true, message: 'ログイン成功' });
  }
  return NextResponse.json({ success: false, message: 'ユーザーIDまたはパスワードが間違っています' }, { status: 401 });
}
