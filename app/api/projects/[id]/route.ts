import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase-admin';
import { toProject, toRow } from '@/lib/project-mapper';

function checkAuth(req: Request) {
  return req.headers.get('cookie')?.match(/cms_token=([^;]+)/)?.[1] === process.env.ADMIN_SECRET;
}

type Params = { params: { id: string } };

export async function PUT(req: Request, { params }: Params) {
  if (!checkAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await req.json();
  const { data, error } = await createAdminClient().from('projects').update(toRow(body)).eq('id', params.id).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(toProject(data));
}

export async function DELETE(req: Request, { params }: Params) {
  if (!checkAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { error } = await createAdminClient().from('projects').delete().eq('id', params.id);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ ok: true });
}
