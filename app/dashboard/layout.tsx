'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FaSignOutAlt } from 'react-icons/fa';

const navItems = [
  { href: '/dashboard', label: 'Kelola Projects' },
  { href: '/dashboard/experience', label: 'My Experiences' },
  { href: '/dashboard/education', label: 'My Education' },
  { href: '/dashboard/skills', label: 'My Skills' },
  { href: '/dashboard/approach', label: 'My Approach' },
  { href: '/dashboard/about', label: 'About Me' },
  { href: '/dashboard/logo-hero', label: 'Logo & Hero' },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const logout = async () => {
    await fetch('/api/auth', { method: 'DELETE' });
    router.push('/login');
  };

  const active = navItems.find((n) => (n.href === '/dashboard' ? pathname === '/dashboard' || pathname.startsWith('/dashboard/new') || /^\/dashboard\/\d+$/.test(pathname) : pathname.startsWith(n.href)));
  const title = active?.label ?? (pathname === '/dashboard/new' ? 'Project Baru' : 'Dashboard');

  return (
    <div className="min-h-screen bg-black-100 text-white flex">
      <aside className="w-64 border-r border-white/10 bg-black-200 p-6 flex flex-col justify-between max-md:hidden">
        <div className="space-y-6">
          <h1 className="text-xl font-bold">
            CMS <span className="text-purple">Portfolio</span>
          </h1>
          <nav className="space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-4 py-2 rounded-lg text-sm transition-colors ${active?.href === item.href ? 'bg-purple/20 text-purple border border-purple/30' : 'hover:bg-white/5'}`}
              >
                {item.label}
              </Link>
            ))}
            <Link href="/" target="_blank" className="block px-4 py-2 rounded-lg hover:bg-white/5 text-sm text-white-100">
              Lihat Website ↗
            </Link>
          </nav>
        </div>
        <button onClick={logout} className="flex items-center gap-2 px-4 py-2 text-sm text-white-100 hover:text-red-400">
          <FaSignOutAlt /> Logout
        </button>
      </aside>

      <main className="flex-1 p-6 md:p-10 max-w-5xl space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">{title}</h2>
        </div>
        {children}
      </main>
    </div>
  );
}
