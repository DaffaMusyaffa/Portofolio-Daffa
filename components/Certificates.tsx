'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useContent } from '@/lib/site-content';

const Certificates = () => {
  const certificates = useContent('certificates').items;

  if (!certificates.length) return null;

  const single = certificates.length === 1;

  return (
    <section className="py-20 w-full">
      <div className="w-full max-w-7xl mx-auto px-5">
        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: 'easeOut' }} viewport={{ once: true }} className="text-center mb-16">
          <h1 className="heading mb-6">
            My <span className="text-purple">Certificates</span>
          </h1>
          <p className="text-white-100 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">Courses and credentials that support my technical skills</p>
        </motion.div>

        <div className={single ? 'flex justify-center' : 'grid gap-6 md:grid-cols-2 lg:grid-cols-3'}>
          {certificates.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`flex flex-col text-left rounded-2xl border border-white/10 bg-[rgb(4,7,29)] overflow-hidden hover:border-purple/40 transition-colors duration-300 ${single ? 'w-full max-w-xl' : ''}`}
            >
              {cert.image && (
                <a href={cert.file || cert.image} target="_blank" rel="noopener noreferrer" className="group relative block w-full aspect-[1287/910] bg-white/5 border-b border-white/10 overflow-hidden" aria-label={`Open ${cert.title} certificate`}>
                  <Image src={cert.image} alt={cert.title} fill sizes="(min-width: 768px) 576px, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                </a>
              )}

              <div className="flex flex-col flex-1 p-6 gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  {cert.issuer && <span className="text-purple text-sm bg-purple/20 px-3 py-1 rounded-full border border-purple/30 font-medium">{cert.issuer}</span>}
                  {cert.year && <span className="text-white-100 text-sm bg-white/10 px-3 py-1 rounded-full border border-white/20">{cert.year}</span>}
                </div>

                <h3 className="text-lg lg:text-xl font-semibold text-white leading-snug">{cert.title}</h3>

                {cert.description && <p className="text-white-100 text-base leading-relaxed">{cert.description}</p>}

                {(cert.link || cert.file) && (
                  <div className="mt-auto pt-2 flex flex-wrap gap-x-5 gap-y-2">
                    {cert.link && (
                      <a href={cert.link} target="_blank" rel="noopener noreferrer" className="text-purple text-sm font-medium hover:text-purple/80 transition-colors">
                        Verify certificate →
                      </a>
                    )}
                    {cert.file && (
                      <a href={cert.file} target="_blank" rel="noopener noreferrer" className="text-white-100 text-sm font-medium hover:text-white transition-colors">
                        View PDF
                      </a>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certificates;
