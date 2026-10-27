'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from './ui/MovingBorders';
import MagicButton from './MagicButton';
import { motion } from 'framer-motion';
import { FaDownload } from 'react-icons/fa';
import dynamic from 'next/dynamic';
import { useContent } from '@/lib/site-content';

// Dynamic import untuk Show More button untuk menghindari hydration issues
const ShowMoreButton = dynamic(
  () =>
    Promise.resolve(({ onClick, expanded }: { onClick: () => void; expanded: boolean }) => (
      <button onClick={onClick} className="lg:hidden text-purple text-sm font-medium hover:text-purple/80 transition-colors inline-flex items-center gap-1 mt-2">
        {expanded ? 'Show Less' : 'Show More'}
      </button>
    )),
  { ssr: false },
);

const Profile = () => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const profile = useContent('profile');

  const firstParagraph = profile.firstParagraph;
  const secondParagraph = profile.secondParagraph;

  // Extract first 2 sentences dari paragraf pertama untuk mobile
  const sentences = firstParagraph.split('. ');
  const shortDescription = sentences.slice(0, 2).join('. ') + (sentences.length > 2 ? '.' : '');

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  return (
    <section className="py-20 w-full">
      <div className="w-full max-w-7xl mx-auto px-5">
        {/* Section Header with Animation */}
        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: 'easeOut' }} viewport={{ once: true }} className="text-center mb-16">
          <h1 className="heading mb-6">
            About <span className="text-purple">Me</span>
          </h1>
          <p className="text-white-100 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">{profile.subtitle}</p>
        </motion.div>

        {/* Profile Card with Stagger Animation */}
        <motion.div initial={{ opacity: 0, y: 100 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }} viewport={{ once: true }}>
          <Button
            duration={Math.floor(Math.random() * 10000) + 10000}
            borderRadius="1.75rem"
            style={{
              background: 'rgb(4,7,29)',
              backgroundColor: 'linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)',
              borderRadius: `calc(1.75rem* 0.96)`,
            }}
            className="flex-1 text-black dark:text-white border-neutral-200 dark:border-slate-800 w-full"
          >
            <div className="flex flex-col lg:flex-row lg:items-center p-8 py-12 md:p-12 lg:p-16 gap-12">
              {/* Profile Image with CV Button */}
              <div className="flex flex-col items-center lg:items-start flex-shrink-0">
                {/* Profile Image with Hover Animation */}
                <motion.div className="relative w-48 h-64 md:w-56 md:h-72 lg:w-64 lg:h-80 rounded-2xl overflow-hidden border-4 border-white/30 backdrop-blur-sm shadow-2xl" whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-cyan-500/10"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                  <Image src={profile.image} alt="Profile Picture" fill className="object-cover object-center relative z-10" priority />
                  {/* Professional Frame Effect */}
                  <div className="absolute inset-0 border-2 border-white/20 rounded-2xl"></div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-cyan-500/20 rounded-2xl blur-sm -z-10"></div>
                </motion.div>

                {/* CV Download Button */}
                <motion.div className="mt-6" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.8 }} viewport={{ once: true }}>
                  <div
                    className="relative inline-flex h-12 w-full md:w-60 overflow-hidden rounded-lg p-[1px] focus:outline-none cursor-pointer"
                    onClick={() => {
                      const link = document.createElement('a');
                      link.href = profile.cv;
                      link.download = 'CV-MUHAMMAD DAFFA MUSYAFFA.pdf';
                      link.click();
                    }}
                  >
                    <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                    <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-slate-950 px-7 text-sm font-medium text-white backdrop-blur-3xl gap-2 hover:bg-[#1a1f3a] transition-colors duration-300">
                      Download CV
                      <FaDownload />
                    </span>
                  </div>
                </motion.div>
              </div>

              {/* Profile Content with Stagger Animation */}
              <motion.div className="lg:ms-8 flex-1 text-center lg:text-left" initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.4 }} viewport={{ once: true }}>
                {/* Name and Title */}
                <motion.h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }} viewport={{ once: true }}>
                  {profile.name}
                </motion.h2>

                <motion.h3 className="text-xl md:text-2xl text-purple mb-8 font-medium" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6 }} viewport={{ once: true }}>
                  {profile.title}
                </motion.h3>

                {/* Description - Mobile: Limited, Desktop: Full */}
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.7 }} viewport={{ once: true }}>
                  {/* Mobile: Show limited description with toggle */}
                  <div className="lg:hidden">
                    <p className="text-white-100 text-base md:text-lg leading-relaxed mb-2">{showFullDescription ? firstParagraph : shortDescription}</p>

                    {showFullDescription && <p className="text-white-100 text-base md:text-lg leading-relaxed mb-2">{secondParagraph}</p>}

                    <ShowMoreButton onClick={toggleDescription} expanded={showFullDescription} />
                  </div>

                  {/* Desktop: Show full description (original) */}
                  <div className="hidden lg:block">
                    <motion.p className="text-white-100 text-base md:text-lg leading-relaxed mb-6" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.7 }} viewport={{ once: true }}>
                      {firstParagraph}
                    </motion.p>

                    <motion.p className="text-white-100 text-base md:text-lg leading-relaxed mb-8" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.8 }} viewport={{ once: true }}>
                      {secondParagraph}
                    </motion.p>
                  </div>
                </motion.div>

                {/* Skills Tags with Stagger Animation */}
                <motion.div
                  className="flex flex-wrap justify-center lg:justify-start gap-3 mt-8 lg:mt-0"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                  viewport={{ once: true }}
                >
                  {profile.tags.map((skill, index) => (
                    <motion.span
                      key={skill}
                      className="px-4 py-2 bg-purple/20 text-purple text-sm md:text-base rounded-full border border-purple/30 hover:bg-purple/30 transition-all duration-300 cursor-default"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 1 + index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.05 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </Button>
        </motion.div>

        {/* Statistics Section */}
        <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }} viewport={{ once: true }}>
          {profile.stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center p-6 rounded-2xl bg-gradient-to-b from-white/5 to-white/10 border border-white/10 backdrop-blur-sm"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <motion.h3 className="text-3xl md:text-4xl font-bold text-purple mb-2" initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }} viewport={{ once: true }}>
                {stat.number}
              </motion.h3>
              <p className="text-white-100 text-sm md:text-base">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Profile;
