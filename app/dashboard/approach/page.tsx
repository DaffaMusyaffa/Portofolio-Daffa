'use client';

import { ItemManager } from '@/components/cms/ItemManager';

export default function ApproachPage() {
  return (
    <ItemManager
      storageKey="approach"
      titleKey="title"
      subtitleKeys={['phase']}
      emptyItem={{ title: '', phase: 'Phase 1', des: '' }}
      fields={[
        { name: 'title', label: 'Judul' },
        { name: 'phase', label: 'Phase', placeholder: 'Phase 1' },
        { name: 'des', label: 'Deskripsi', type: 'textarea', rows: 4, span: true },
      ]}
    />
  );
}
