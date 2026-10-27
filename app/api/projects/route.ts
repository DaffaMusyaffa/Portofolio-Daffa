import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase-admin';
import { toProject, toRow } from '@/lib/project-mapper';

function checkAuth(req: Request) {
  return req.headers.get('cookie')?.match(/cms_token=([^;]+)/)?.[1] === process.env.ADMIN_SECRET;
}

export async function GET() {
  const { data, error } = await createAdminClient().from('projects').select('*').order('id');
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data.map(toProject));
}

export async function POST(req: Request) {
  if (!checkAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await req.json();
  const { data, error } = await createAdminClient().from('projects').insert(toRow(body)).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(toProject(data));
}
