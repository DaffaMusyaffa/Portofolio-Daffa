'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { Project } from '@/types/project';

export default function DashboardProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    const res = await fetch('/api/projects');
    setProjects(await res.json());
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const remove = async (id: number, title: string) => {
    if (!confirm(`Hapus "${title}"?`)) return;
    await fetch(`/api/projects/${id}`, { method: 'DELETE' });
    setProjects((p) => p.filter((x) => x.id !== id));
  };

  if (loading) return <p className="text-white-100">Memuat...</p>;

  return (
    <div className="space-y-3">
      {projects.length === 0 && <p className="text-white-100">Belum ada projects.</p>}
      {projects.map((p) => (
        <div key={p.id} className="flex items-center gap-4 bg-black-200 border border-white/10 rounded-xl p-4">
          <img src={p.img} alt={p.title} className="w-16 h-16 rounded-lg object-cover bg-white/5" />
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold truncate">{p.title}</h3>
            <p className="text-sm text-white-100">
              {p.category} • {p.status}
            </p>
          </div>
          <Link href={`/dashboard/${p.id}`} className="p-2 hover:bg-white/10 rounded-lg" title="Edit">
            <FaEdit className="text-purple" />
          </Link>
          <button onClick={() => remove(p.id, p.title)} className="p-2 hover:bg-white/10 rounded-lg" title="Hapus">
            <FaTrash className="text-red-400" />
          </button>
        </div>
      ))}
    </div>
  );
}
