'use client';

import { ItemManager } from '@/components/cms/ItemManager';

export default function EducationPage() {
  return (
    <ItemManager
      storageKey="education"
      titleKey="universityName"
      subtitleKeys={['degree', 'period']}
      imageKey="logo"
      emptyItem={{ universityName: '', degree: '', specialization: '', period: '', gpa: '', logo: '', achievements: [], description: '' }}
      fields={[
        { name: 'universityName', label: 'Nama institusi' },
        { name: 'degree', label: 'Degree' },
        { name: 'specialization', label: 'Spesialisasi' },
        { name: 'period', label: 'Periode', placeholder: '2017 - 2020' },
        { name: 'gpa', label: 'GPA', placeholder: '3.50/4.00' },
        { name: 'logo', label: 'Logo (path)', placeholder: '/unpas.png' },
        { name: 'achievements', label: 'Achievements (satu per baris)', type: 'lines', rows: 3, span: true },
        { name: 'description', label: 'Deskripsi', type: 'textarea', rows: 5, span: true },
      ]}
    />
  );
}
