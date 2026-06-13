import { NextRequest, NextResponse } from 'next/server';
import { verifySession } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const isAuth = verifySession(req);
  return NextResponse.json({ authenticated: isAuth });
}
