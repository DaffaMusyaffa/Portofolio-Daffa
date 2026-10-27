// types/project.ts

// Interface dasar untuk compatibility dengan data existing
export interface ProjectBase {
  id: number;
  title: string;
  des: string;
  img: string;
  iconLists: string[];
  link: string;
}

// Interface lengkap untuk projects baru
export interface Project extends ProjectBase {
  slug: string;
  pinTitle: string;
  category: string;
  status: string;
  startDate: string;
  role: string;
  teamSize: string;
  gallery: string[];
  features: string[];
  challenges: string[];
  technologies: Technology[];
  detailedDescription: string;
  githubUrl: string;
  liveUrl: string | null;
}

export interface Technology {
  name: string;
  description: string;
}
