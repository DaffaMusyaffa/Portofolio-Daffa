'use client';

import { ItemManager } from '@/components/cms/ItemManager';

export default function CertificatesPage() {
  return (
    <ItemManager
      storageKey="certificates"
      titleKey="title"
      subtitleKeys={['issuer', 'year']}
      imageKey="image"
      emptyItem={{ title: '', issuer: '', year: '', image: '', file: '', link: '', description: '' }}
      fields={[
        { name: 'title', label: 'Nama sertifikat', span: true },
        { name: 'issuer', label: 'Penerbit', placeholder: 'Dicoding Indonesia' },
        { name: 'year', label: 'Tahun', placeholder: '2024' },
        { name: 'image', label: 'Gambar sertifikat (path)', placeholder: '/certificates/aws.png' },
        { name: 'file', label: 'File PDF (path)', placeholder: '/certificates/aws.pdf' },
        { name: 'link', label: 'Link verifikasi', placeholder: 'https://...' },
        { name: 'description', label: 'Deskripsi', type: 'textarea', rows: 3, span: true },
      ]}
    />
  );
}
