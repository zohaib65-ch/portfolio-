import { NextRequest, NextResponse } from 'next/server';
import { getAdminCreds, createSessionCookieVal, getSessionCookieName } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();
    const creds = getAdminCreds();

    if (username === creds.username && password === creds.password) {
      const token = createSessionCookieVal(username);
      
      const response = NextResponse.json({ success: true, message: 'Logged in successfully' });
      
      // Set secure HTTP-only cookie
      response.cookies.set(getSessionCookieName(), token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24, // 1 day
      });

      return response;
    }

    return NextResponse.json(
      { success: false, error: 'Invalid username or password' },
      { status: 401 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || 'Server error' },
      { status: 500 }
    );
  }
}
