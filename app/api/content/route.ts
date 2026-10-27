import { NextResponse } from 'next/server';

function adminHeaders() {
  return {
    apikey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
    Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY!}`,
    'Content-Type': 'application/json',
  };
}

function checkAuth(req: Request) {
  return req.headers.get('cookie')?.match(/cms_token=([^;]+)/)?.[1] === process.env.ADMIN_SECRET;
}

export const dynamic = 'force-dynamic';

export async function GET() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/site_content?select=key,value`, {
    headers: adminHeaders(),
    cache: 'no-store',
  });
  if (!res.ok) return NextResponse.json({ error: await res.text() }, { status: 500 });
  const rows = await res.json();
  return NextResponse.json(Object.fromEntries(rows.map((row: { key: string; value: any }) => [row.key, row.value])));
}

export async function PUT(req: Request) {
  if (!checkAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { key, value } = await req.json();
  const res = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/site_content?on_conflict=key`, {
    method: 'POST',
    headers: { ...adminHeaders(), Prefer: 'resolution=merge-duplicates' },
    cache: 'no-store',
    body: JSON.stringify({ key, value, updated_at: new Date().toISOString() }),
  });
  if (!res.ok) return NextResponse.json({ error: await res.text() }, { status: 400 });
  return NextResponse.json({ ok: true });
}
