'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { experienceData, ExperienceItem } from '@/lib/experience-data';

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

// Item dari CMS belum tentu punya id/slug/array lengkap
const normalize = (item: Partial<ExperienceItem>, index: number): ExperienceItem => ({
  id: index + 1,
  slug: item.slug || slugify(`${item.title ?? ''} ${item.company ?? ''}`) || `experience-${index + 1}`,
  title: item.title ?? '',
  company: item.company ?? '',
  period: item.period ?? '',
  location: item.location ?? '',
  image: item.image || undefined,
  description: item.description ?? '',
  technologies: item.technologies ?? [],
  link: item.link ?? '',
  achievements: item.achievements ?? [],
});

// Ambil experience dari CMS (site_content.experience); fallback ke data statis
export function useExperiences() {
  const [experiences, setExperiences] = useState<ExperienceItem[]>(experienceData);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    supabase
      .from('site_content')
      .select('value')
      .eq('key', 'experience')
      .single()
      .then(({ data }) => {
        const items = data?.value?.items;
        if (Array.isArray(items) && items.length > 0) setExperiences(items.map(normalize));
        setLoaded(true);
      });
  }, []);

  return { experiences, loaded };
}
