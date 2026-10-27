import { Project } from '@/types/project';

export type ProjectRow = {
  id: number;
  title: string;
  des: string | null;
  img: string | null;
  icon_lists: string[] | null;
  link: string | null;
  slug: string;
  pin_title: string | null;
  category: string | null;
  status: string | null;
  start_date: string | null;
  role: string | null;
  team_size: string | null;
  gallery: string[] | null;
  features: string[] | null;
  challenges: string[] | null;
  technologies: { name: string; description: string }[] | null;
  detailed_description: string | null;
  github_url: string | null;
  live_url: string | null;
};

export const toProject = (row: ProjectRow): Project => ({
  id: row.id,
  title: row.title,
  des: row.des ?? '',
  img: row.img ?? '',
  iconLists: row.icon_lists ?? [],
  link: row.link ?? '',
  slug: row.slug,
  pinTitle: row.pin_title ?? '',
  category: row.category ?? '',
  status: row.status ?? '',
  startDate: row.start_date ?? '',
  role: row.role ?? '',
  teamSize: row.team_size ?? '',
  gallery: row.gallery ?? [],
  features: row.features ?? [],
  challenges: row.challenges ?? [],
  technologies: row.technologies ?? [],
  detailedDescription: row.detailed_description ?? '',
  githubUrl: row.github_url ?? '',
  liveUrl: row.live_url ?? null,
});

export const toRow = (p: Partial<Project>) => ({
  title: p.title,
  des: p.des,
  img: p.img,
  icon_lists: p.iconLists,
  link: p.link,
  slug: p.slug,
  pin_title: p.pinTitle,
  category: p.category,
  status: p.status,
  start_date: p.startDate,
  role: p.role,
  team_size: p.teamSize,
  gallery: p.gallery,
  features: p.features,
  challenges: p.challenges,
  technologies: p.technologies,
  detailed_description: p.detailedDescription,
  github_url: p.githubUrl,
  live_url: p.liveUrl,
});
