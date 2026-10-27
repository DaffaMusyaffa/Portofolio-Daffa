export interface ExperienceItem {
  id: number;
  slug: string;
  title: string;
  company: string;
  period: string;
  location: string;
  image?: string;
  description: string;
  technologies: string[];
  link: string;
  achievements: string[];
}

export const experienceData: ExperienceItem[] = [
  {
    id: 4,
    slug: 'indonesianext-top-33',
    title: 'Top 33 Digital Talent - Hacker',
    company: 'IndonesiaNEXT by Telkomsel',
    period: 'Jul 2026',
    location: 'Indonesia',
    image: '/experience/indonesianext.jpg',
    description:
      'Selected as one of the Top 33 Digital Talents in IndonesiaNEXT, The Digital Talent Accelerator program by Telkomsel, in the Hacker (developer) role. Advanced to the next stage of the program after a national selection, representing Universitas Pasundan. Built Dekompres, an AI-powered structured journaling web app for students, as part of the IndonesiaNEXT hackathon.',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase', 'LLM API'],
    link: 'https://dekompres.vercel.app/',
    achievements: [
      'Selected as Top 33 Digital Talent nationwide in IndonesiaNEXT by Telkomsel',
      'Passed in the Hacker (developer) role representing Universitas Pasundan',
      'Built Dekompres, an AI journaling web app, for the IndonesiaNEXT hackathon',
    ],
  },
  {
    id: 2,
    slug: 'laboratory-assistant',
    title: 'Laboratory Assistant',
    company: 'University Laboratory',
    period: 'Oct 2024 - Dec 2024',
    location: 'Bandung, Indonesia',
    image: '/experience/aslab.jpg',
    description:
      'Serving as a Teaching Assistant for Programming Practicum 1 course, providing hands-on guidance to students in fundamental programming concepts. Responsible for conducting lab sessions, evaluating student assignments, and supporting the learning process through practical demonstrations and problem-solving assistance.',
    technologies: ['Java', 'MySQL', 'IntelliJ IDEA', 'Git'],
    link: 'https://university-lab.com',
    achievements: ['Recognition as Outstanding Lab Assistant from Faculty', 'Successfully guided 100+ students in programming fundamentals', 'Developed practical exercise materials for enhanced learning'],
  },
  {
    id: 3,
    slug: 'web-programming-mentor',
    title: 'Web Programming Mentor',
    company: 'University Web Programming Course',
    period: 'Jan 2025 - Mar 2025',
    location: 'Bandung, Indonesia',
    image: '/experience/mentor-web.jpg',
    description:
      'Entrusted by faculty as a mentor for Web Programming course, responsible for teaching and guiding students throughout their web development learning journey. Conduct mentoring sessions, provide technical guidance, and evaluate student progress to ensure comprehensive understanding of web programming fundamentals and best practices.',
    technologies: ['PHP', 'MySQL', 'Bootstrap', 'HTML5'],
    link: 'https://university-webprog.com',
    achievements: ['Recognized as Outstanding Web Programming Mentor by Faculty', 'Successfully mentored and evaluated 80+ students in web development', 'Developed comprehensive learning materials and assessment methods'],
  },
];
