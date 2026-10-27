'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { toProject } from '@/lib/project-mapper';
import { projects as staticProjects } from '@/data';
import { Project } from '@/types/project';

// Ambil projects dari Supabase; fallback ke data statis jika DB kosong/gagal
export function useProjects(): Project[] {
  const [projects, setProjects] = useState<Project[]>(staticProjects);

  useEffect(() => {
    supabase
      .from('projects')
      .select('*')
      .order('id')
      .then(({ data }) => {
        if (data && data.length > 0) setProjects(data.map(toProject));
      });
  }, []);

  return projects;
}
