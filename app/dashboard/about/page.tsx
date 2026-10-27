'use client';

import { useContentForm, SaveBar, inputCls, labelCls, cardCls } from '@/components/cms/content-form';

export default function AboutPage() {
  const { content, set, save, saving, status } = useContentForm('profile');

  return (
    <div className="space-y-6 max-w-2xl">
      <div className={cardCls}>
        <div className="flex items-center gap-4 mb-2">
          <img src={content.image} alt="preview" className="w-16 h-16 rounded-full object-cover bg-white/5" />
          <div className="flex-1">
            <label className={labelCls}>Foto profil (path)</label>
            <input value={content.image} onChange={(e) => set({ image: e.target.value })} className={inputCls} placeholder="/profile.jpg" />
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Nama</label>
            <input value={content.name} onChange={(e) => set({ name: e.target.value })} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Title</label>
            <input value={content.title} onChange={(e) => set({ title: e.target.value })} className={inputCls} />
          </div>
          <div className="md:col-span-2">
            <label className={labelCls}>Subtitle section</label>
            <input value={content.subtitle} onChange={(e) => set({ subtitle: e.target.value })} className={inputCls} />
          </div>
          <div className="md:col-span-2">
            <label className={labelCls}>Paragraf 1</label>
            <textarea rows={3} value={content.firstParagraph} onChange={(e) => set({ firstParagraph: e.target.value })} className={inputCls} />
          </div>
          <div className="md:col-span-2">
            <label className={labelCls}>Paragraf 2</label>
            <textarea rows={3} value={content.secondParagraph} onChange={(e) => set({ secondParagraph: e.target.value })} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>CV (path)</label>
            <input value={content.cv} onChange={(e) => set({ cv: e.target.value })} className={inputCls} placeholder="/cv.pdf" />
          </div>
          <div>
            <label className={labelCls}>Skill tags (pisahkan koma)</label>
            <input value={(content.tags ?? []).join(', ')} onChange={(e) => set({ tags: e.target.value.split(',').map((s) => s.trim()).filter(Boolean) })} className={inputCls} />
          </div>
          <div className="md:col-span-2">
            <label className={labelCls}>Statistik (format: Angka | Label, satu per baris)</label>
            <textarea
              rows={4}
              value={(content.stats ?? []).map((s: any) => `${s.number} | ${s.label}`).join('\n')}
              onChange={(e) =>
                set({
                  stats: e.target.value
                    .split('\n')
                    .map((l) => l.trim())
                    .filter(Boolean)
                    .map((l) => {
                      const [number, ...rest] = l.split('|').map((s) => s.trim());
                      return { number, label: rest.join(' | ') };
                    }),
                })
              }
              className={inputCls}
              placeholder={'50+ | Projects Completed'}
            />
          </div>
        </div>
      </div>
      <SaveBar onSave={save} saving={saving} status={status} />
    </div>
  );
}
