'use client';

import { ItemManager } from '@/components/cms/ItemManager';

export default function SkillsPage() {
  return (
    <ItemManager
      storageKey="skills"
      titleKey="name"
      subtitleKeys={[]}
      imageKey="icon"
      emptyItem={{ name: '', icon: '' }}
      fields={[
        { name: 'name', label: 'Nama skill' },
        { name: 'icon', label: 'Icon (path)', placeholder: '/react.svg' },
      ]}
    />
  );
}
