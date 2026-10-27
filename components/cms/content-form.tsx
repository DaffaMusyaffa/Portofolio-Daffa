'use client';

import { useEffect, useState } from 'react';
import { defaultContent, ContentKey } from '@/lib/site-content';

export const inputCls = 'w-full bg-black-100 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:border-purple focus:outline-none';
export const labelCls = 'block text-sm text-white-100 mb-1';
export const cardCls = 'bg-black-200 border border-white/10 rounded-xl p-6 space-y-4';

export type ContentMap = Record<ContentKey, any>;

export function useContentForm(key: ContentKey) {
  const [content, setContent] = useState<any>(defaultContent[key]);
  const [status, setStatus] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch('/api/content')
      .then((r) => r.json())
      .then((data) => {
        if (data[key]) setContent({ ...defaultContent[key], ...data[key] });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const set = (patch: object) => setContent((c: any) => ({ ...c, ...patch }));

  const save = async () => {
    setSaving(true);
    setStatus('');
    const res = await fetch('/api/content', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key, value: content }),
    });
    setSaving(false);
    setStatus(res.ok ? 'Tersimpan ✓' : 'Gagal menyimpan');
  };

  return { content, set, save, saving, status };
}

export function SaveBar({ onSave, saving, status }: { onSave: () => void; saving: boolean; status: string }) {
  return (
    <div className="flex items-center gap-4 sticky bottom-4">
      <button onClick={onSave} disabled={saving} className="bg-purple hover:bg-purple/80 disabled:opacity-50 rounded-lg px-6 py-3 text-sm font-medium shadow-lg">
        {saving ? 'Menyimpan...' : 'Simpan'}
      </button>
      {status && <span className="text-sm text-white-100 bg-black-200 border border-white/10 rounded-lg px-4 py-2">{status}</span>}
    </div>
  );
}

// Helper: textarea JSON yang parse saat valid
export function JsonTextarea({ label, value, onChange, rows = 10 }: { label: string; value: any; onChange: (v: any) => void; rows?: number }) {
  const [text, setText] = useState(JSON.stringify(value, null, 2));
  const [error, setError] = useState(false);

  useEffect(() => {
    setText(JSON.stringify(value, null, 2));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(value)]);

  return (
    <div>
      <label className={labelCls}>{label}</label>
      <textarea
        rows={rows}
        className={`${inputCls} font-mono ${error ? 'border-red-500' : ''}`}
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          try {
            onChange(JSON.parse(e.target.value));
            setError(false);
          } catch {
            setError(true);
          }
        }}
      />
      {error && <p className="text-red-400 text-xs mt-1">JSON belum valid — perbaiki sebelum simpan</p>}
    </div>
  );
}

// Helper: list of objects jadi textarea "field | field" per baris
export function LinesTextarea({ label, value, onChange, columns, rows = 6 }: { label: string; value: string[][]; onChange: (v: string[][]) => void; columns: number; rows?: number }) {
  const text = value.map((row) => row.join(' | ')).join('\n');
  return (
    <div>
      <label className={labelCls}>
        {label} — satu item per baris, dipisah " | " ({columns} kolom)
      </label>
      <textarea
        rows={rows}
        className={inputCls}
        value={text}
        onChange={(e) => {
          const items = e.target.value.split('\n').map((l) => l.trim()).filter(Boolean).map((l) => {
            const cells = l.split('|').map((s) => s.trim());
            while (cells.length < columns) cells.push('');
            return cells;
          });
          onChange(items);
        }}
      />
    </div>
  );
}
