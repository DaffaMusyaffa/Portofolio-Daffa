'use client';
import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { Button } from './ui/MovingBorders';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useContent } from '@/lib/site-content';

// Navigation Buttons Component - dynamic import to avoid hydration issues
const NavigationButtons = dynamic(
  () =>
    Promise.resolve(({ scrollLeft, scrollRight }: { scrollLeft: () => void; scrollRight: () => void }) => (
      <div className="flex justify-center gap-3 mb-6 lg:hidden">
        <button onClick={scrollLeft} className="bg-purple/80 hover:bg-purple text-white p-2 rounded-full shadow-lg transition-all duration-300" aria-label="Scroll left">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button onClick={scrollRight} className="bg-purple/80 hover:bg-purple text-white p-2 rounded-full shadow-lg transition-all duration-300" aria-label="Scroll right">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    )),
  { ssr: false },
);

// Show More Button Component - dynamic import to avoid hydration issues
const ShowMoreButton = dynamic(
  () =>
    Promise.resolve(({ onClick, expanded }: { onClick: () => void; expanded: boolean }) => (
      <button onClick={onClick} className="lg:hidden text-purple text-sm font-medium hover:text-purple/80 transition-colors">
        {expanded ? 'Show Less' : 'Show More'}
      </button>
    )),
  { ssr: false },
);

const Education = () => {
  const [expandedDescriptions, setExpandedDescriptions] = useState<{ [key: number]: boolean }>({});
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const toggleDescription = (id: number) => {
    setExpandedDescriptions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -scrollContainerRef.current.clientWidth * 0.8,
        behavior: 'smooth',
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: scrollContainerRef.current.clientWidth * 0.8,
        behavior: 'smooth',
      });
    }
  };

  const educationData = useContent('education').items;

  const truncateText = (text: string, lines: number = 2) => {
    const words = text.split(' ');
    const wordsPerLine = 12; // Estimasi kata per baris
    const maxWords = lines * wordsPerLine;

    if (words.length <= maxWords) return text;
    return words.slice(0, maxWords).join(' ') + '...';
  };

  return (
    <section className="py-20 w-full bg-gradient-to-b from-transparent to-black-100/50">
      <div className="w-full max-w-7xl mx-auto px-5">
        {/* Section Header with Animation */}
        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: 'easeOut' }} viewport={{ once: true }} className="text-center mb-16">
          <motion.h1 className="heading mb-6" initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }} viewport={{ once: true }}>
            My <span className="text-purple">Education</span>
          </motion.h1>
          <motion.p className="text-white-100 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} viewport={{ once: true }}>
            Academic foundation that shaped my technical expertise and analytical thinking
          </motion.p>
        </motion.div>

        {/* Mobile Navigation Buttons */}
        <NavigationButtons scrollLeft={scrollLeft} scrollRight={scrollRight} />

        {/* Education Cards Container */}
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-4 pb-4 lg:grid lg:grid-cols-2 lg:gap-8 lg:overflow-visible lg:pb-0"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {educationData.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 100, rotateX: 45 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="h-full w-80 lg:w-full flex-shrink-0"
            >
              <Button
                duration={Math.floor(Math.random() * 10000) + 10000}
                borderRadius="1.75rem"
                style={{
                  background: 'rgb(4,7,29)',
                  backgroundColor: 'linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)',
                  borderRadius: `calc(1.75rem* 0.96)`,
                }}
                className="flex-1 text-black dark:text-white border-neutral-200 dark:border-slate-800 w-full h-full"
              >
                <div className="p-6 lg:p-8 py-8 lg:py-10 h-full flex flex-col">
                  {/* University Logo and Header */}
                  <motion.div className="flex items-center gap-4 lg:gap-6 mb-6 lg:mb-8" initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.3 + index * 0.2 }} viewport={{ once: true }}>
                    <div className="relative w-20 h-20 lg:w-24 lg:h-24 rounded-xl overflow-hidden border-2 border-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0 p-2">
                      <Image src={edu.logo} alt={`${edu.universityName} Logo`} fill className="object-contain p-1" />
                    </div>

                    <div className="flex-1">
                      <h3 className="text-xl lg:text-2xl font-bold text-white mb-2 leading-tight text-left">{edu.universityName}</h3>
                      <div className="flex flex-wrap items-center gap-2 lg:gap-3">
                        <span className="text-white-100 text-sm bg-white/10 px-3 py-1 rounded-full border border-white/20">📅 {edu.period}</span>
                        <span className="text-purple text-sm bg-purple/20 px-3 py-1 rounded-full border border-purple/30 font-medium">GPA: {edu.gpa}</span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Education Details */}
                  <motion.div className="flex-1 space-y-4 lg:space-y-6" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 + index * 0.2 }} viewport={{ once: true }}>
                    {/* Degree & Specialization */}
                    <div>
                      <h4 className="text-lg lg:text-xl font-semibold text-white mb-2 leading-tight">{edu.degree}</h4>
                      <p className="text-purple font-medium text-base mb-4">{edu.specialization}</p>
                    </div>

                    {/* Description */}
                    <div>
                      <p className="text-white-100 text-base leading-relaxed mb-3">
                        <span className="lg:hidden">{expandedDescriptions[index] ? edu.description : truncateText(edu.description)}</span>
                        <span className="hidden lg:inline">{edu.description}</span>
                      </p>

                      {/* Show More/Less button */}
                      <ShowMoreButton onClick={() => toggleDescription(index)} expanded={expandedDescriptions[index] || false} />
                    </div>

                    {/* Achievements - hanya di desktop */}
                    <div className="hidden lg:block">
                      <h5 className="text-white font-semibold mb-3 text-lg">Key Achievements:</h5>
                      <div className="space-y-2">
                        {edu.achievements.map((achievement, idx) => (
                          <motion.div
                            key={idx}
                            className="flex items-start gap-3 p-3 rounded-lg border border-white/10 backdrop-blur-sm hover:bg-white/5 transition-all duration-300"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: 0.7 + index * 0.2 + idx * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.1)' }}
                          >
                            <div className="w-2 h-2 bg-purple rounded-full flex-shrink-0 mt-2"></div>
                            <p className="text-white-100 text-base">{achievement}</p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Education Summary */}
        <motion.div className="mt-8 lg:mt-16 text-center" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }} viewport={{ once: true }}>
          <div className="bg-gradient-to-r from-purple/10 via-blue/10 to-cyan/10 border border-white/20 rounded-2xl p-6 lg:p-8 backdrop-blur-sm">
            <motion.h3
              className="text-xl lg:text-2xl xl:text-3xl font-bold text-white mb-3 lg:mb-4"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
            >
              Academic Excellence & Innovation
            </motion.h3>
            <motion.p className="text-white-100 text-sm lg:text-lg max-w-4xl mx-auto leading-relaxed" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.7 }} viewport={{ once: true }}>
              My educational journey has provided me with a solid foundation in computer science principles, advanced programming techniques, and modern software development methodologies. Through rigorous academic training and hands-on
              projects, I've developed the analytical thinking and technical skills essential for solving complex real-world problems.
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Education;

