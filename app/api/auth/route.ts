import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { email, password } = await req.json();
  const ok = email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD;
  if (!ok) {
    return NextResponse.json({ error: 'Email atau password salah' }, { status: 401 });
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.set('cms_token', process.env.ADMIN_SECRET!, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.delete('cms_token');
  return res;
}
