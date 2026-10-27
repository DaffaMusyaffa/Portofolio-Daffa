// Nama framework/tools berdasarkan file ikon di /public
const techNames: Record<string, string> = {
  '/next.svg': 'Next.js',
  '/re.svg': 'React',
  '/ts.svg': 'TypeScript',
  '/typescript.svg': 'TypeScript',
  '/tail.svg': 'Tailwind CSS',
  '/supabase.svg': 'Supabase',
  '/stream.svg': 'Stream',
  '/three.svg': 'Three.js',
  '/gsap.svg': 'GSAP',
  '/fm.svg': 'Framer Motion',
  '/laravel.svg': 'Laravel',
  '/livewire.svg': 'Livewire',
  '/filament.svg': 'Filament',
  '/mysql.svg': 'MySQL',
  '/sqlite.svg': 'SQLite',
  '/alpinejs.svg': 'Alpine.js',
  '/androidstudio.svg': 'Android Studio',
  '/kotlin.svg': 'Kotlin',
  '/jetpackcompose.svg': 'Jetpack Compose',
  '/expressjs.svg': 'Express.js',
  '/nodejs.svg': 'Node.js',
  '/javascript.svg': 'JavaScript',
  '/html.svg': 'HTML',
  '/css.svg': 'CSS',
  '/figma.svg': 'Figma',
  '/git.svg': 'Git',
  '/material.svg': 'Material UI',
};

export const getTechName = (icon: string): string =>
  techNames[icon] ?? icon.split('/').pop()?.replace(/\.\w+$/, '') ?? icon;
