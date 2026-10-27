'use client';

import { useEffect, useState } from 'react';
import { inputCls, labelCls, cardCls } from '@/components/cms/content-form';

export interface EditableItem {
  id?: number;
  [key: string]: any;
}

interface Field {
  name: string;
  label: string;
  type?: 'text' | 'textarea' | 'lines' | 'comma' | 'image';
  rows?: number;
  placeholder?: string;
  span?: boolean;
}

export function ItemManager({
  storageKey,
  titleKey,
  subtitleKeys,
  imageKey,
  fields,
  emptyItem,
}: {
  storageKey: string;
  titleKey: string;
  subtitleKeys?: string[];
  imageKey?: string;
  fields: Field[];
  emptyItem: EditableItem;
}) {
  const [items, setItems] = useState<EditableItem[]>([]);
  const [editing, setEditing] = useState<EditableItem | null>(null);
  // Index item yang sedang diedit; null = item baru
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [status, setStatus] = useState('');
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/content')
      .then((r) => r.json())
      .then((data) => {
        setItems(data[storageKey]?.items ?? []);
        setLoading(false);
      });
  }, [storageKey]);

  const persist = async (next: EditableItem[]) => {
    setSaving(true);
    setStatus('');
    const res = await fetch('/api/content', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key: storageKey, value: { items: next } }),
    });
    setSaving(false);
    setStatus(res.ok ? 'Tersimpan ✓' : 'Gagal menyimpan');
  };

  const startEdit = (item: EditableItem, idx: number | null) => {
    setEditing({ ...item });
    setEditIndex(idx);
    setStatus('');
  };

  const cancelEdit = () => {
    setEditing(null);
    setEditIndex(null);
  };

  const saveEdit = () => {
    if (!editing) return;
    if (!String(editing[titleKey] ?? '').trim()) {
      setStatus('Judul wajib diisi');
      return;
    }
    const next = editIndex === null ? [...items, editing] : items.map((it, i) => (i === editIndex ? editing : it));
    setItems(next);
    persist(next);
    cancelEdit();
  };

  const remove = (idx: number) => {
    if (!confirm('Hapus item ini?')) return;
    const next = items.filter((_, i) => i !== idx);
    setItems(next);
    persist(next);
  };

  const move = (idx: number, dir: -1 | 1) => {
    const next = [...items];
    const target = idx + dir;
    if (target < 0 || target >= next.length) return;
    [next[idx], next[target]] = [next[target], next[idx]];
    setItems(next);
    persist(next);
  };

  const setValue = (name: string, raw: string, type?: Field['type']) => {
    if (!editing) return;
    let value: any = raw;
    if (type === 'comma') value = raw.split(',').map((s) => s.trim()).filter(Boolean);
    if (type === 'lines') value = raw.split('\n').map((s) => s.trim()).filter(Boolean);
    setEditing({ ...editing, [name]: value });
  };

  const displayValue = (value: any, type?: Field['type']) => (type === 'comma' || type === 'lines' ? (value ?? []).join(type === 'comma' ? ', ' : '\n') : value ?? '');

  if (loading) return <p className="text-white-100">Memuat...</p>;

  // Form edit item
  if (editing) {
    return (
      <div className="space-y-6 max-w-2xl">
        <div className={cardCls}>
          <div className="grid md:grid-cols-2 gap-4">
            {fields.map((f) => (
              <div key={f.name} className={f.span ? 'md:col-span-2' : ''}>
                <label className={labelCls}>{f.label}</label>
                {f.type === 'textarea' || f.type === 'lines' ? (
                  <textarea rows={f.rows ?? 3} value={displayValue(editing[f.name], f.type)} onChange={(e) => setValue(f.name, e.target.value, f.type)} className={inputCls} placeholder={f.placeholder} />
                ) : (
                  <input value={displayValue(editing[f.name], f.type)} onChange={(e) => setValue(f.name, e.target.value, f.type)} className={inputCls} placeholder={f.placeholder} />
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-3 sticky bottom-4">
          <button onClick={saveEdit} disabled={saving} className="bg-purple hover:bg-purple/80 disabled:opacity-50 rounded-lg px-6 py-3 text-sm font-medium shadow-lg">
            {saving ? 'Menyimpan...' : 'Simpan'}
          </button>
          <button onClick={cancelEdit} className="border border-white/20 rounded-lg px-6 py-3 text-sm">
            Batal
          </button>
          {status && <span className="text-sm text-white-100 bg-black-200 border border-white/10 rounded-lg px-4 py-2">{status}</span>}
        </div>
      </div>
    );
  }

  // List tampilan seperti Kelola Projects
  return (
    <div className="space-y-3">
      {items.length === 0 && <p className="text-white-100">Belum ada item.</p>}
      {items.map((item, idx) => (
        <div key={idx} className="flex items-center gap-4 bg-black-200 border border-white/10 rounded-xl p-4">
          {imageKey && item[imageKey] && <img src={item[imageKey]} alt="" className="w-16 h-16 rounded-lg object-cover bg-white/5" />}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold truncate">{item[titleKey] || '(tanpa judul)'}</h3>
            {subtitleKeys && (
              <p className="text-sm text-white-100 truncate">
                {subtitleKeys.map((k) => item[k]).filter(Boolean).join(' • ')}
              </p>
            )}
          </div>
          <button onClick={() => move(idx, -1)} className="px-2 py-1 text-white-100 hover:bg-white/10 rounded-lg" title="Naik">
            ↑
          </button>
          <button onClick={() => move(idx, 1)} className="px-2 py-1 text-white-100 hover:bg-white/10 rounded-lg" title="Turun">
            ↓
          </button>
          <button onClick={() => startEdit(item, idx)} className="p-2 hover:bg-white/10 rounded-lg" title="Edit">
            <span className="text-purple text-sm font-medium">Edit</span>
          </button>
          <button onClick={() => remove(idx)} className="p-2 hover:bg-white/10 rounded-lg" title="Hapus">
            <span className="text-red-400 text-sm font-medium">Hapus</span>
          </button>
        </div>
      ))}
      <button onClick={() => startEdit(emptyItem, null)} className="w-full border border-dashed border-white/20 rounded-xl py-4 text-sm text-white-100 hover:border-purple hover:text-purple">
        + Tambah Baru
      </button>
      {status && <p className="text-sm text-white-100">{status}</p>}
    </div>
  );
}
