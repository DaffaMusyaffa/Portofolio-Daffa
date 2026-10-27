'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useContent } from '@/lib/site-content';

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();
  const logo = useContent('logo');
  const [visible, setVisible] = useState(true);
  const pathname = usePathname();

  useMotionValueEvent(scrollYProgress, 'change', (current) => {
    if (typeof current === 'number') {
      let direction = current! - scrollYProgress.getPrevious()!;

      if (scrollYProgress.get() < 0.05) {
        setVisible(true);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  // Menentukan apakah di halaman projects atau detail project
  const isHomePage = pathname === '/';
  const isProjectsPage = pathname === '/projects';
  const isProjectDetailPage = pathname?.startsWith('/projects/') && pathname !== '/projects';

  // Dynamic navigation items berdasarkan halaman
  const getDynamicNavItems = () => {
    if (isHomePage) {
      // Homepage: About, All Projects, Contact
      return [
        { name: 'About', link: '#about' },
        { name: 'All Projects', link: '/projects' },
        { name: 'Contact', link: '#contact' },
      ];
    } else if (isProjectsPage) {
      // All Projects page: Home, About, Contact
      return [
        { name: 'Home', link: '/' },
        { name: 'About', link: '/#about' },
        { name: 'Contact', link: '/#contact' },
      ];
    } else if (isProjectDetailPage) {
      // Project Detail page: Home, All Projects, Contact
      return [
        { name: 'Home', link: '/' },
        { name: 'All Projects', link: '/projects' },
        { name: 'Contact', link: '/#contact' },
      ];
    }

    // Default fallback
    return navItems;
  };

  const dynamicNavItems = getDynamicNavItems();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          'flex max-w-fit md:min-w-[70vw] lg:min-w-fit fixed z-[5000] top-10 inset-x-0 mx-auto px-10 py-5 rounded-lg border border-black/.1 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] items-center justify-center space-x-4',
          className,
        )}
        style={{
          backdropFilter: 'blur(16px) saturate(180%)',
          backgroundColor: 'rgba(17, 25, 40, 0.75)',
          borderRadius: '12px',
          border: '1px solid rgba(255, 255, 255, 0.125)',
        }}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <motion.div className="w-12 h-12 rounded-full overflow-hidden bg-white/10 flex items-center justify-center mr-2" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <img src={logo.img} alt="Logo" className="w-20 h-20 object-contain" />
          </motion.div>
        </Link>

        {/* Dynamic Navigation Items */}
        {dynamicNavItems.map((navItem: any, idx: number) => (
          <Link key={`link=${idx}`} href={navItem.link} className={cn('relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500 transition-colors duration-300')}>
            <span className="block sm:hidden">{navItem.icon}</span>
            <span className="text-sm !cursor-pointer">{navItem.name}</span>
          </Link>
        ))}
      </motion.div>
    </AnimatePresence>
  );
};
