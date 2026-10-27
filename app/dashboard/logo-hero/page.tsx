'use client';

import { useContentForm, SaveBar, inputCls, labelCls, cardCls } from '@/components/cms/content-form';

export default function LogoHeroPage() {
  const logo = useContentForm('logo');
  const hero = useContentForm('hero');

  return (
    <div className="space-y-6 max-w-2xl">
      <div className={cardCls}>
        <h3 className="font-bold text-lg mb-2">Logo</h3>
        <div className="flex items-center gap-4">
          <img src={logo.content.img} alt="preview" className="w-16 h-16 rounded-full object-cover bg-white/5" />
          <div className="flex-1">
            <label className={labelCls}>Path logo</label>
            <input value={logo.content.img} onChange={(e) => logo.set({ img: e.target.value })} className={inputCls} placeholder="/head.png" />
          </div>
        </div>
      </div>

      <div className={cardCls}>
        <h3 className="font-bold text-lg mb-2">Hero</h3>
        <div className="space-y-4">
          <div>
            <label className={labelCls}>Tagline kecil</label>
            <input value={hero.content.tagline} onChange={(e) => hero.set({ tagline: e.target.value })} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Judul besar</label>
            <input value={hero.content.heading} onChange={(e) => hero.set({ heading: e.target.value })} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Intro</label>
            <input value={hero.content.intro} onChange={(e) => hero.set({ intro: e.target.value })} className={inputCls} />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6 sticky bottom-4">
        <button onClick={logo.save} disabled={logo.saving} className="bg-purple hover:bg-purple/80 disabled:opacity-50 rounded-lg px-6 py-3 text-sm font-medium shadow-lg">
          {logo.saving ? 'Menyimpan...' : 'Simpan Logo'}
        </button>
        <button onClick={hero.save} disabled={hero.saving} className="bg-purple hover:bg-purple/80 disabled:opacity-50 rounded-lg px-6 py-3 text-sm font-medium shadow-lg">
          {hero.saving ? 'Menyimpan...' : 'Simpan Hero'}
        </button>
        {(logo.status || hero.status) && <span className="text-sm text-white-100 bg-black-200 border border-white/10 rounded-lg px-4 py-2">{logo.status || hero.status}</span>}
      </div>
    </div>
  );
}
