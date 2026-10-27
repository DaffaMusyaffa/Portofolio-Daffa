'use client';

import { ItemManager } from '@/components/cms/ItemManager';

export default function ExperiencePage() {
  return (
    <ItemManager
      storageKey="experience"
      titleKey="title"
      subtitleKeys={['company', 'period']}
      imageKey="image"
      emptyItem={{ title: '', slug: '', company: '', period: '', location: '', image: '', description: '', technologies: [], link: '', achievements: [] }}
      fields={[
        { name: 'title', label: 'Title' },
        { name: 'slug', label: 'Slug URL detail (kosongkan = otomatis dari title)', placeholder: 'indonesianext-top-33' },
        { name: 'company', label: 'Company' },
        { name: 'period', label: 'Periode', placeholder: '2024 - Present' },
        { name: 'location', label: 'Lokasi' },
        { name: 'image', label: 'Gambar (path, kosongkan jika tidak ada)', placeholder: '/experience/aslab.jpg' },
        { name: 'link', label: 'Link company' },
        { name: 'technologies', label: 'Technologies (pisahkan koma)', type: 'comma', span: true },
        { name: 'description', label: 'Deskripsi', type: 'textarea', rows: 4, span: true },
        { name: 'achievements', label: 'Achievements (satu per baris)', type: 'lines', rows: 3, span: true },
      ]}
    />
  );
}
