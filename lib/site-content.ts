'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { experienceData } from '@/lib/experience-data';

// Struktur & nilai default = konten yang sekarang hardcode di komponen
export const defaultContent = {
  logo: { img: '/head.png' },
  hero: {
    tagline: 'mdmcodework',
    heading: 'Transforming Concepts into Seamless User Experiences',
    intro: "Hi! I'm Muhammad Daffa Musyaffa, a Web Developer based in Bandung.",
  },
  profile: {
    name: 'Muhammad Daffa Musyaffa',
    title: 'Web Developer',
    subtitle: 'Passionate Full Stack Developer dedicated to creating exceptional digital experiences',
    firstParagraph: "Hello, my name is Muhammad Daffa Musyaffa. I am a graduate of Informatics Engineering at Universitas Pasundan. I'm not just studying technology, I'm actively building it. With hands-on experience developing real-world applications for both commercial and educational sectors, I transform ideas into impactful digital solutions.",
    secondParagraph: 'My approach combines technical excellence with creative thinking, ensuring every project delivers exceptional user experiences. I believe in continuous learning and staying ahead of industry trends to provide cutting-edge solutions for my clients.',
    image: '/profile.jpg',
    cv: '/cv-muhammad-daffa-musyaffa.pdf',
    tags: ['React', 'Next.js', 'TypeScript', 'Python', 'Supabase'],
    stats: [
      { label: 'Projects Completed', number: '5+' },
      { label: 'Years Experience', number: '1+' },
      { label: 'Happy Clients', number: '10+' },
      { label: 'Technologies', number: '15+' },
    ],
  },
  skills: {
    items: [
      { name: 'HTML5', icon: '/html.svg' },
      { name: 'CSS3', icon: '/css.svg' },
      { name: 'JavaScript', icon: '/javascript.svg' },
      { name: 'TypeScript', icon: '/typescript.svg' },
      { name: 'React JS', icon: '/re.svg' },
      { name: 'Next.js', icon: '/next.svg' },
      { name: 'Tailwind CSS', icon: '/tail.svg' },
      { name: 'Laravel', icon: '/laravel.svg' },
      { name: 'MySQL', icon: '/mysql.svg' },
      { name: 'Git', icon: '/git.svg' },
      { name: 'Figma', icon: '/figma.svg' },
    ],
  },
  education: {
    items: [
      {
        universityName: 'SMAN 6 Karawang',
        degree: 'Senior High School - Sciences Major',
        specialization: 'Science',
        period: '2019 - 2022',
        gpa: '85.5/100',
        logo: '/sma-logo.png',
        achievements: [
          'Graduated with Honors in Science',
          'Active participant in Student Council',
          'Self-taught programming enthusiast during high school years',
        ],
        description: 'Completed senior high school education with a focus on natural sciences (IPA). Developed a strong interest in technology and self-taught programming fundamentals. This diverse educational background built strong communication skills, critical thinking, and adaptability that later proved valuable in transitioning to the computer science field.',
      },
      {
        universityName: 'Universitas Pasundan',
        degree: 'Bachelor of Informatics Engineering (S.T.)',
        specialization: 'Full-Stack Development & Software Engineering',
        period: '2022 - 2026',
        gpa: '3.55/4.00',
        logo: '/unpas-logo.png',
        achievements: [
          'Graduated in 2026 with a final GPA of 3.55/4.00 in Informatics Engineering',
          'Developed a point-of-sale system used for daily operations at a local coffee shop (DuaPersen POS)',
          "Built the AI Checker feature on BRIN's Smart Research Environment (SRE) Writer platform",
          'Mentored 180+ students as a Programming Laboratory Assistant and Web Programming Mentor',
          'Active in student organizations at HMTIF UNPAS and PERMIKOMNAS',
        ],
        description: 'Graduated in 2026 with a Bachelor of Engineering (S.T.) in Informatics Engineering from Universitas Pasundan, final GPA 3.55/4.00. Built real-world applications for commercial and educational sectors throughout the study period, specializing in Laravel, Livewire, Tailwind CSS, and modern JavaScript stacks (React, Next.js). Experienced in end-to-end delivery, from database design and authentication to responsive user interfaces, with a focus on digital solutions that solve real operational problems.',
      },
    ],
  },
  approach: {
    items: [
      {
        title: 'Planning & Strategy',
        des: "We'll collaborate to map out your website's goals, target audience, and key functionalities. We'll discuss things like site structure, navigation, and content requirements.",
        phase: 'Phase 1',
      },
      {
        title: 'Development & Progress Update',
        des: 'Once we agree on the plan, I cue my lofi playlist and dive into coding. From initial sketches to polished code, I keep you updated every step of the way.',
        phase: 'Phase 2',
      },
      {
        title: 'Development & Launch',
        des: "This is where the magic happens! Based on the approved design, I'll translate everything into functional code, building your website from the ground up.",
        phase: 'Phase 3',
      },
    ],
  },
  // Sumber awal = lib/experience-data.ts; setelah disimpan dari CMS, data diambil dari Supabase
  experience: { items: experienceData.map(({ id, ...item }) => item) },
};

export type ContentKey = keyof typeof defaultContent;
export type ContentType<K extends ContentKey> = (typeof defaultContent)[K];

// Ambil konten dari Supabase; fallback ke default
export function useContent<K extends ContentKey>(key: K): ContentType<K> {
  const [value, setValue] = useState<ContentType<K>>(defaultContent[key] as ContentType<K>);

  useEffect(() => {
    supabase
      .from('site_content')
      .select('value')
      .eq('key', key)
      .single()
      .then(({ data }) => {
        if (data?.value) setValue({ ...(defaultContent[key] as object), ...data.value } as ContentType<K>);
      });
  }, [key]);

  return value;
}
