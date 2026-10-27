'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Project } from '@/types/project';

const empty: Partial<Project> = {
  title: '',
  slug: '',
  des: '',
  img: '',
  iconLists: [],
  link: '',
  pinTitle: '',
  category: '',
  status: 'Live',
  startDate: '',
  role: '',
  teamSize: '',
  gallery: [],
  features: [],
  challenges: [],
  technologies: [],
  detailedDescription: '',
  githubUrl: '',
  liveUrl: '',
};

const inputCls = 'w-full bg-black-100 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:border-purple focus:outline-none';
const labelCls = 'block text-sm text-white-100 mb-1';

// List sederhana menjadi multi-line text (satu item per baris)
const lines = (arr: string[]) => arr.join('\n');
const toLines = (v: string) => v.split('\n').map((s) => s.trim()).filter(Boolean);

export default function ProjectForm({ id }: { id?: string }) {
  const router = useRouter();
  const [form, setForm] = useState<Partial<Project>>(empty);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!id) return;
    fetch('/api/projects').then((r) => r.json()).then((list: Project[]) => {
      const p = list.find((x) => x.id === Number(id));
      if (p) setForm(p);
    });
  }, [id]);

  const set = (patch: Partial<Project>) => setForm((f) => ({ ...f, ...patch }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    const res = await fetch(id ? `/api/projects/${id}` : '/api/projects', {
      method: id ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, liveUrl: form.liveUrl || null }),
    });
    setSaving(false);
    if (res.ok) router.push('/dashboard');
    else setError((await res.json()).error ?? 'Gagal menyimpan');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      {error && <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg px-4 py-3">{error}</div>}

      <div className="grid md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className={labelCls}>Judul *</label>
          <input required value={form.title} onChange={(e) => set({ title: e.target.value })} className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Slug (URL) *</label>
          <input
            required
            value={form.slug}
            onChange={(e) => set({ slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') })}
            className={inputCls}
            placeholder="contoh-project"
          />
        </div>
        <div>
          <label className={labelCls}>Kategori</label>
          <input value={form.category} onChange={(e) => set({ category: e.target.value })} className={inputCls} placeholder="E-Commerce" />
        </div>
        <div>
          <label className={labelCls}>Status</label>
          <select value={form.status} onChange={(e) => set({ status: e.target.value })} className={inputCls}>
            <option>Live</option>
            <option>In Development</option>
            <option>Archived</option>
          </select>
        </div>
        <div>
          <label className={labelCls}>Tahun Mulai</label>
          <input value={form.startDate} onChange={(e) => set({ startDate: e.target.value })} className={inputCls} placeholder="2024" />
        </div>
        <div>
          <label className={labelCls}>Role</label>
          <input value={form.role} onChange={(e) => set({ role: e.target.value })} className={inputCls} placeholder="Full Stack Developer" />
        </div>
        <div>
          <label className={labelCls}>Ukuran Tim</label>
          <input value={form.teamSize} onChange={(e) => set({ teamSize: e.target.value })} className={inputCls} placeholder="1 Developer" />
        </div>
        <div className="md:col-span-2">
          <label className={labelCls}>Deskripsi Singkat</label>
          <textarea rows={2} value={form.des} onChange={(e) => set({ des: e.target.value })} className={inputCls} />
        </div>
        <div className="md:col-span-2">
          <label className={labelCls}>Deskripsi Detail</label>
          <textarea rows={5} value={form.detailedDescription} onChange={(e) => set({ detailedDescription: e.target.value })} className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Gambar Utama (path)</label>
          <input value={form.img} onChange={(e) => set({ img: e.target.value })} className={inputCls} placeholder="/projects/nama.png" />
        </div>
        <div>
          <label className={labelCls}>Pin Title</label>
          <input value={form.pinTitle} onChange={(e) => set({ pinTitle: e.target.value })} className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Link Live</label>
          <input value={form.liveUrl ?? ''} onChange={(e) => set({ liveUrl: e.target.value })} className={inputCls} placeholder="https://..." />
        </div>
        <div>
          <label className={labelCls}>GitHub</label>
          <input value={form.githubUrl} onChange={(e) => set({ githubUrl: e.target.value })} className={inputCls} placeholder="https://github.com/..." />
        </div>
        <div>
          <label className={labelCls}>Icon Tech Stack (path, satu per baris)</label>
          <textarea rows={3} value={lines(form.iconLists ?? [])} onChange={(e) => set({ iconLists: toLines(e.target.value) })} className={inputCls} placeholder={'/laravel.svg\n/tail.svg'} />
        </div>
        <div>
          <label className={labelCls}>Gallery (path, satu per baris)</label>
          <textarea rows={3} value={lines(form.gallery ?? [])} onChange={(e) => set({ gallery: toLines(e.target.value) })} className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Features (satu per baris)</label>
          <textarea rows={4} value={lines(form.features ?? [])} onChange={(e) => set({ features: toLines(e.target.value) })} className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Challenges (satu per baris)</label>
          <textarea rows={4} value={lines(form.challenges ?? [])} onChange={(e) => set({ challenges: toLines(e.target.value) })} className={inputCls} />
        </div>
      </div>

      <div className="flex gap-3">
        <button type="submit" disabled={saving} className="bg-purple hover:bg-purple/80 disabled:opacity-50 rounded-lg px-6 py-2.5 text-sm font-medium">
          {saving ? 'Menyimpan...' : id ? 'Simpan Perubahan' : 'Tambah Project'}
        </button>
        <button type="button" onClick={() => router.push('/dashboard')} className="border border-white/20 rounded-lg px-6 py-2.5 text-sm">
          Batal
        </button>
      </div>
    </form>
  );
}
