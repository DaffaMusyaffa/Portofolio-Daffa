'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FaExternalLinkAlt, FaArrowLeft, FaCalendar, FaMapMarkerAlt, FaBriefcase, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { navItems } from '@/data';
import { useExperiences } from '@/lib/use-experiences';
import { FloatingNav } from '@/components/ui/FloatingNavbar';
import Footer from '@/components/Footer';
import { notFound } from 'next/navigation';

interface ExperienceDetailProps {
  params: {
    slug: string;
  };
}

const ExperienceDetail = ({ params }: ExperienceDetailProps) => {
  const { experiences: experienceData, loaded } = useExperiences();
  const [mounted, setMounted] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const exp = experienceData.find((e) => e.slug === params.slug);
  const relatedExps = experienceData.filter((e) => e.slug !== params.slug).slice(0, 2);

  const openLightbox = () => {
    if (!exp?.image) return;
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'unset';
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!mounted) {
    return null;
  }

  if (!exp) {
    // Item baru dari CMS belum ada di data statis, tunggu data Supabase dulu
    if (!loaded) return null;
    notFound();
  }

  return (
    <>
      <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
        <div className="max-w-7xl w-full mt-20 md:mt-40">
          <FloatingNav navItems={navItems} />

          {/* Hero */}
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mb-12 md:mb-16">
            <Link href="/#experience" className="inline-flex items-center gap-2 text-white-100 hover:text-purple transition-colors mb-6 text-sm">
              <FaArrowLeft /> Back to Experience
            </Link>

            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 md:gap-12 items-start lg:items-center">
              <div className="order-2 lg:order-1">
                <div className="flex flex-wrap items-center gap-2 md:gap-4 mb-4 md:mb-6">
                  <span className="px-3 md:px-4 py-1 md:py-2 bg-purple/20 text-purple rounded-full border border-purple/30 text-xs md:text-sm font-medium">Experience</span>
                </div>

                <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold text-white mb-2 md:mb-4 leading-tight">{exp.title}</h1>
                <p className="text-purple text-base md:text-xl font-semibold mb-4 md:mb-6">{exp.company}</p>

                <p className="text-white-100 text-sm md:text-lg mb-6 md:mb-8 leading-relaxed">{exp.description}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
                  <div className="flex items-center gap-2 md:gap-3">
                    <FaCalendar className="text-purple text-sm md:text-base" />
                    <div>
                      <p className="text-white-100 text-xs md:text-sm">Period</p>
                      <p className="text-white font-medium text-sm md:text-base">{exp.period}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 md:gap-3">
                    <FaMapMarkerAlt className="text-purple text-sm md:text-base" />
                    <div>
                      <p className="text-white-100 text-xs md:text-sm">Location</p>
                      <p className="text-white font-medium text-sm md:text-base">{exp.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 md:gap-3 sm:col-span-2 lg:col-span-1">
                    <FaBriefcase className="text-purple text-sm md:text-base" />
                    <div>
                      <p className="text-white-100 text-xs md:text-sm">Role</p>
                      <p className="text-white font-medium text-sm md:text-base">{exp.title}</p>
                    </div>
                  </div>
                </div>

                {exp.link && (
                  <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                    <a href={exp.link} target="_blank" rel="noopener noreferrer" className="px-6 md:px-8 py-3 md:py-4 bg-purple hover:bg-purple/80 text-white rounded-xl font-medium transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 md:gap-3 text-sm md:text-base">
                      <FaExternalLinkAlt className="text-sm md:text-base" />
                      <span className="hidden sm:inline">View Company</span>
                      <span className="sm:hidden">Company</span>
                    </a>
                  </div>
                )}
              </div>

              {/* Main Image */}
              {exp.image && (
                <div className="relative order-1 lg:order-2 w-full">
                  <div className="relative z-10 rounded-xl md:rounded-2xl overflow-hidden border border-white/10 cursor-pointer group" onClick={openLightbox}>
                    <img src={exp.image} alt={exp.title} className="w-full h-48 sm:h-64 md:h-auto object-cover transition-transform duration-300 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/20 backdrop-blur-sm rounded-full p-3 md:p-4">
                        <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-purple/20 to-transparent rounded-xl md:rounded-2xl blur-3xl"></div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 mb-12 md:mb-20">
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="bg-black-200 rounded-xl md:rounded-2xl p-4 md:p-8 border border-white/10">
              <h3 className="text-lg md:text-2xl font-bold text-white mb-4 md:mb-6">Key Achievements</h3>
              <ul className="space-y-2 md:space-y-3">
                {exp.achievements.map((achievement, index) => (
                  <li key={index} className="flex items-start gap-2 md:gap-3 text-white-100 text-sm md:text-base">
                    <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-purple rounded-full mt-1.5 md:mt-2 flex-shrink-0"></span>
                    {achievement}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="bg-black-200 rounded-xl md:rounded-2xl p-4 md:p-8 border border-white/10">
              <h3 className="text-lg md:text-2xl font-bold text-white mb-4 md:mb-6">Technologies</h3>
              <div className="flex flex-wrap gap-2 md:gap-3">
                {exp.technologies.map((tech, index) => (
                  <span key={index} className="px-3 md:px-4 py-1.5 md:py-2 bg-purple/20 text-purple text-xs md:text-sm rounded-full border border-purple/30">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Related Experiences */}
          {relatedExps.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }} className="mb-12 md:mb-20">
              <h3 className="text-xl md:text-3xl font-bold text-white mb-6 md:mb-10 text-center">
                Other <span className="text-purple">Experiences</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {relatedExps.map((related, index) => (
                  <motion.div key={related.id} initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }} className="relative" style={{ zIndex: 10 }}>
                    <Link href={`/experience/${related.slug}`} className="block bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm border border-white/10 rounded-3xl p-6 hover:border-purple/30 transition-all duration-300 group cursor-pointer">
                      <div className={`relative overflow-hidden rounded-2xl mb-6 bg-gradient-to-br from-purple/20 to-blue/20 ${related.image ? '' : 'h-48'}`}>
                        {related.image && <img src={related.image} alt={related.title} className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110" />}
                      </div>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <h4 className="text-xl font-bold text-white group-hover:text-purple transition-colors duration-300">{related.title}</h4>
                          <span className="inline-block px-3 py-1 bg-purple/20 text-purple text-xs rounded-full border border-purple/30">{related.period}</span>
                        </div>
                        <p className="text-white-100 text-base leading-relaxed line-clamp-3">{related.description}</p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          <Footer />
        </div>
      </main>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={closeLightbox}>
            <button onClick={closeLightbox} className="absolute top-4 md:top-6 right-4 md:right-6 z-10 w-10 h-10 md:w-12 md:h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors duration-300">
              <FaTimes className="text-lg md:text-xl" />
            </button>

            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} transition={{ duration: 0.3 }} className="relative max-w-[90vw] max-h-[80vh]" onClick={(e) => e.stopPropagation()}>
              <img src={exp.image} alt={exp.title} className="w-full h-full object-contain rounded-lg" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ExperienceDetail;
