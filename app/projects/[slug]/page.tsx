'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaArrowLeft, FaCalendar, FaUsers, FaCog, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { navItems } from '@/data';
import { useProjects } from '@/lib/use-projects';
import { notFound } from 'next/navigation';
import { Project } from '@/types/project';
import { FloatingNav } from '@/components/ui/FloatingNavbar';
import Footer from '@/components/Footer';
import { getTechName } from '@/lib/tech-icons';

interface ProjectDetailProps {
  params: {
    slug: string;
  };
}

const ProjectDetail = ({ params }: ProjectDetailProps) => {
  const projects = useProjects();
  const getProjectBySlugDynamic = (slug: string) => projects.find((p) => p.slug === slug);
  const [mounted, setMounted] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Fix hydration error
  useEffect(() => {
    setMounted(true);
  }, []);

  const project: Project | undefined = getProjectBySlugDynamic(params.slug);

  if (!project) {
    notFound();
  }

  // Get related projects (exclude current project)
  const relatedProjects: Project[] = projects.filter((p) => p.id !== project.id).slice(0, 3);

  // Combine main image with gallery for lightbox
  const allImages = [project.img, ...project.gallery];

  // Lightbox functions
  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent background scroll
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'unset'; // Restore scroll
  };

  const goToPrevious = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentImageIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;

      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        goToPrevious();
      } else if (e.key === 'ArrowRight') {
        goToNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen]);

  if (!mounted) {
    return null; // Prevent hydration mismatch
  }

  return (
    <>
      <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
        <div className="max-w-7xl w-full mt-20 md:mt-40">
          {/* Navbar */}
          <FloatingNav navItems={navItems} />

          {/* Hero Section - Mobile Optimized */}
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mb-12 md:mb-16">
            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 md:gap-12 items-start lg:items-center mt-20 md:mt-0">
              {/* Project Info */}
              <div className="order-2 lg:order-1">
                <div className="flex flex-wrap items-center gap-2 md:gap-4 mb-4 md:mb-6">
                  <span className="px-3 md:px-4 py-1 md:py-2 bg-purple/20 text-purple rounded-full border border-purple/30 text-xs md:text-sm font-medium">{project.category}</span>
                  <span
                    className={`px-3 md:px-4 py-1 md:py-2 rounded-full text-xs md:text-sm font-medium ${
                      project.status === 'Live'
                        ? 'bg-green-500/20 text-green-400 border border-green-400/30'
                        : project.status === 'In Development'
                        ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-400/30'
                        : 'bg-blue-500/20 text-blue-400 border border-blue-400/30'
                    }`}
                  >
                    {project.status}
                  </span>
                </div>

                <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight">{project.title}</h1>

                <p className="text-white-100 text-sm md:text-lg mb-6 md:mb-8 leading-relaxed">{project.detailedDescription}</p>

                {/* Tech Stack Icons - hover untuk lihat nama */}
                {project.iconLists.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-6 md:mb-8">
                    {project.iconLists.map((icon, index) => (
                      <div key={index} className="relative group">
                        <div className="border border-white/[.2] rounded-full bg-black w-10 h-10 md:w-12 md:h-12 flex justify-center items-center transition-all duration-300 group-hover:border-purple group-hover:scale-110">
                          <img src={icon} alt={getTechName(icon)} className="p-2 md:p-2.5" />
                        </div>
                        <span className="pointer-events-none absolute left-1/2 -translate-x-1/2 -top-9 whitespace-nowrap rounded-md bg-black-200 border border-white/10 px-2 py-1 text-xs text-white opacity-0 translate-y-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0">
                          {getTechName(icon)}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Project Meta - Mobile Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
                  <div className="flex items-center gap-2 md:gap-3">
                    <FaCalendar className="text-purple text-sm md:text-base" />
                    <div>
                      <p className="text-white-100 text-xs md:text-sm">Year</p>
                      <p className="text-white font-medium text-sm md:text-base">{project.startDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 md:gap-3">
                    <FaUsers className="text-purple text-sm md:text-base" />
                    <div>
                      <p className="text-white-100 text-xs md:text-sm">Team Size</p>
                      <p className="text-white font-medium text-sm md:text-base">{project.teamSize}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 md:gap-3 sm:col-span-2 lg:col-span-1">
                    <FaCog className="text-purple text-sm md:text-base" />
                    <div>
                      <p className="text-white-100 text-xs md:text-sm">Role</p>
                      <p className="text-white font-medium text-sm md:text-base">{project.role}</p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons - Mobile Stack */}
                <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 md:px-8 py-3 md:py-4 bg-purple hover:bg-purple/80 text-white rounded-xl font-medium transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 md:gap-3 text-sm md:text-base"
                    >
                      <FaExternalLinkAlt className="text-sm md:text-base" />
                      <span className="hidden sm:inline">Live Demo</span>
                      <span className="sm:hidden">Demo</span>
                    </a>
                  )}

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 md:px-8 py-3 md:py-4 border border-white/20 hover:border-purple text-white-100 hover:text-purple rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 md:gap-3 text-sm md:text-base"
                    >
                      <FaGithub className="text-sm md:text-base" />
                      <span className="hidden sm:inline">Source Code</span>
                      <span className="sm:hidden">Code</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Main Project Image - Mobile First */}
              <div className="relative order-1 lg:order-2 w-full">
                <div className="relative z-10 rounded-xl md:rounded-2xl overflow-hidden border border-white/10 cursor-pointer group" onClick={() => openLightbox(0)}>
                  <img src={project.img} alt={project.title} className="w-full h-48 sm:h-64 md:h-auto object-cover transition-transform duration-300 group-hover:scale-105" />

                  {/* Click to Enlarge Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/20 backdrop-blur-sm rounded-full p-3 md:p-4">
                      <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </div>
                  </div>

                  {/* Image Counter */}
                  <div className="absolute top-3 md:top-4 right-3 md:right-4 bg-black/60 text-white px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium backdrop-blur-sm">Main Image</div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-purple/20 to-transparent rounded-xl md:rounded-2xl blur-3xl"></div>
              </div>
            </div>
          </motion.div>

          {/* Project Sections - Mobile Stack */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12 mb-12 md:mb-20">
            {/* Features */}
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="bg-black-200 rounded-xl md:rounded-2xl p-4 md:p-8 border border-white/10">
              <h3 className="text-lg md:text-2xl font-bold text-white mb-4 md:mb-6">Key Features</h3>
              <ul className="space-y-2 md:space-y-3">
                {project.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2 md:gap-3 text-white-100 text-sm md:text-base">
                    <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-purple rounded-full mt-1.5 md:mt-2 flex-shrink-0"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Technologies */}
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="bg-black-200 rounded-xl md:rounded-2xl p-4 md:p-8 border border-white/10">
              <h3 className="text-lg md:text-2xl font-bold text-white mb-4 md:mb-6">Technologies</h3>
              <div className="space-y-3 md:space-y-4">
                {project.technologies.map((tech, index) => (
                  <div key={index} className="border-l-2 border-purple/30 pl-3 md:pl-4">
                    <h4 className="text-white font-medium text-sm md:text-base">{tech.name}</h4>
                    <p className="text-white-100 text-xs md:text-sm">{tech.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Challenges */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-black-200 rounded-xl md:rounded-2xl p-4 md:p-8 border border-white/10 md:col-span-2 lg:col-span-1"
            >
              <h3 className="text-lg md:text-2xl font-bold text-white mb-4 md:mb-6">Challenges</h3>
              <ul className="space-y-2 md:space-y-3">
                {project.challenges.map((challenge, index) => (
                  <li key={index} className="flex items-start gap-2 md:gap-3 text-white-100 text-sm md:text-base">
                    <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-red-400 rounded-full mt-1.5 md:mt-2 flex-shrink-0"></span>
                    {challenge}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Gallery Section - Mobile: Horizontal Scroll, Desktop: Grid */}
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="mb-12 md:mb-20">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 md:mb-8 text-center">Project Gallery</h3>

            {/* Mobile: Horizontal Scroll */}
            <div className="block md:hidden">
              <div className="relative">
                <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory">
                  {project.gallery.map((image, index) => (
                    <div
                      key={index}
                      className="relative group cursor-pointer rounded-lg overflow-hidden border border-white/10 flex-shrink-0 snap-center"
                      onClick={() => openLightbox(index + 1)}
                      style={{ width: 'calc(50% - 6px)', minWidth: '150px' }}
                    >
                      <img src={image} alt={`${project.title} gallery ${index + 1}`} className="w-full h-32 sm:h-40 object-cover transition-transform duration-300 group-hover:scale-110" />

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/20 backdrop-blur-sm rounded-full p-2">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                        </div>
                      </div>

                      {/* Image Counter */}
                      <div className="absolute top-2 right-2 bg-black/60 text-white px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm">{index + 1}</div>
                    </div>
                  ))}
                </div>

                {/* Scroll Indicator */}
                <div className="flex justify-center mt-4 gap-1">
                  {project.gallery.map((_, index) => (
                    <div key={index} className="w-2 h-2 rounded-full bg-white/20" />
                  ))}
                </div>
              </div>
            </div>

            {/* Desktop: Grid Layout */}
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.gallery.map((image, index) => (
                <div key={index} className="relative group cursor-pointer rounded-xl overflow-hidden border border-white/10" onClick={() => openLightbox(index + 1)}>
                  <img src={image} alt={`${project.title} gallery ${index + 1}`} className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110" />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/20 backdrop-blur-sm rounded-full p-3">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                  </div>

                  {/* Image Counter */}
                  <div className="absolute top-3 right-3 bg-black/60 text-white px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
                    {index + 1} / {project.gallery.length}
                  </div>
                </div>
              ))}
            </div>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.6 }} className="text-center text-white-100 mt-6 md:mt-8 text-sm md:text-base">
              <span className="md:hidden">Swipe to see more images • Click any image to view in full size</span>
              <span className="hidden md:inline">Click any image to view in full size.</span>
            </motion.p>
          </motion.div>

          {/* Related Projects - FIXED VERSION */}
          {relatedProjects.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }} className="mb-12 md:mb-20">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 md:mb-12 text-center">Related Projects</h3>

              {/* Mobile: 2 Column Grid, item ganjil terakhir full width */}
              <div className="grid grid-cols-2 gap-3 md:hidden">
                {relatedProjects.map((relatedProject, index) => (
                  <motion.div key={relatedProject.id} initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }} className={`relative ${relatedProjects.length % 2 === 1 && index === relatedProjects.length - 1 ? 'col-span-2' : ''}`} style={{ zIndex: 10 }}>
                    <Link
                      href={`/projects/${relatedProject.slug}`}
                      className="block bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm border border-white/10 rounded-2xl p-3 hover:border-purple/30 transition-all duration-300 group cursor-pointer"
                    >
                      <div className="relative overflow-hidden rounded-xl mb-3 bg-gradient-to-br from-purple/20 to-blue/20">
                        <img src={relatedProject.img} alt={relatedProject.title} className="w-full h-28 sm:h-36 object-cover transition-transform duration-300 group-hover:scale-110" />
                      </div>

                      <div className="space-y-2">
                        <div className="space-y-1">
                          <h4 className="text-sm sm:text-base font-bold text-white line-clamp-2 group-hover:text-purple transition-colors duration-300">{relatedProject.title}</h4>
                          <span className="inline-block px-2 py-1 bg-purple/20 text-purple text-xs rounded-full border border-purple/30">{relatedProject.category}</span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Desktop: 3 Column Cards */}
              <div className="hidden md:grid md:grid-cols-3 gap-6 lg:gap-8">
                {relatedProjects.map((relatedProject, index) => (
                  <motion.div key={relatedProject.id} initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }} className="relative" style={{ zIndex: 10 }}>
                    <Link
                      href={`/projects/${relatedProject.slug}`}
                      className="block bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm border border-white/10 rounded-3xl p-6 hover:border-purple/30 transition-all duration-300 group cursor-pointer"
                    >
                      <div className="relative overflow-hidden rounded-2xl mb-6 bg-gradient-to-br from-purple/20 to-blue/20">
                        <img src={relatedProject.img} alt={relatedProject.title} className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110" />
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <h4 className="text-xl font-bold text-white group-hover:text-purple transition-colors duration-300">{relatedProject.title}</h4>
                          <span className="inline-block px-3 py-1 bg-purple/20 text-purple text-xs rounded-full border border-purple/30">{relatedProject.category}</span>
                        </div>

                        <p className="text-white-100 text-base leading-relaxed line-clamp-3">{relatedProject.des}</p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Footer */}
          <Footer />
        </div>
      </main>

      {/* Lightbox - Mobile Optimized */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={closeLightbox}>
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 md:top-6 right-4 md:right-6 z-10 w-10 h-10 md:w-12 md:h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors duration-300"
            >
              <FaTimes className="text-lg md:text-xl" />
            </button>

            {/* Navigation Buttons */}
            {allImages.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goToPrevious();
                  }}
                  className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors duration-300"
                >
                  <FaChevronLeft className="text-lg md:text-xl" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goToNext();
                  }}
                  className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors duration-300"
                >
                  <FaChevronRight className="text-lg md:text-xl" />
                </button>
              </>
            )}

            {/* Image Counter */}
            <div className="absolute top-4 md:top-6 left-1/2 -translate-x-1/2 bg-black/60 text-white px-3 md:px-4 py-1 md:py-2 rounded-full text-sm font-medium backdrop-blur-sm">
              {currentImageIndex + 1} / {allImages.length}
            </div>

            {/* Main Image */}
            <motion.div
              key={currentImageIndex}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-[90vw] max-h-[80vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={allImages[currentImageIndex]} alt={`${project.title} - Image ${currentImageIndex + 1}`} className="w-full h-full object-contain rounded-lg" />
            </motion.div>

            {/* Image Description */}
            <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 bg-black/60 text-white px-4 md:px-6 py-2 md:py-3 rounded-full text-sm font-medium backdrop-blur-sm max-w-md text-center">
              {currentImageIndex === 0 ? 'Main Project Image' : `Gallery Image ${currentImageIndex}`}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProjectDetail;
