'use client';

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Decal, Float, OrbitControls, Preload, useTexture, Html, useProgress } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { useContent } from '@/lib/site-content';
import { safeEvents } from '@/lib/safe-events';

// Loader tetap diperlukan untuk fallback Suspense selagi tekstur/gambar ikon dimuat.
// Kita pakai loader HTML sederhana agar tidak ada konflik 3D.
const Loader = () => {
  const { progress } = useProgress();
  return (
    <Html center>
      <p style={{ color: '#f1f1f1' }}>{progress.toFixed(0)}%</p>
    </Html>
  );
};

// --- KOMPONEN UTAMA YANG BARU ---
// Komponen ini sekarang menggabungkan kristal dan bola menjadi satu.
const Ball = ({ imgUrl }: { imgUrl: string }) => {
  const [decal] = useTexture([imgUrl]);

  return (
    <Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 0, 0.2]} />

      {/* Ini adalah Bola di bagian DALAM */}
      <mesh castShadow receiveShadow scale={2.75}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial color="#fff8eb" polygonOffset polygonOffsetFactor={-5} flatShading />
        <Decal position={[0, 0, 1]} rotation={[2 * Math.PI, 0, 6.25]} scale={1} map={decal} />
      </mesh>

      {/* Ini adalah Kristal di bagian LUAR */}
      {/* Kita buat sedikit lebih besar dan TfRANSPARAN */}
      <mesh scale={4.5}>
        {' '}
        {/* Ubah nilai scale ini untuk memperbesar/memperkecil kristal */}
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color="#7a7a7a"
          transparent={true}
          opacity={0.2} // Ubah nilai opacity (0.1 sangat transparan, 0.9 hampir solid)
          side={THREE.FrontSide} // Render hanya sisi depan agar tidak aneh
        />
      </mesh>
    </Float>
  );
};

// BallCanvas tidak banyak berubah, hanya memastikan menggunakan komponen Ball yang baru
const BallCanvas = ({ icon }: { icon: string }) => {
  return (
    <div className="w-full h-full">
      <Canvas
        events={safeEvents}
        frameloop="demand"
        dpr={[1, 2]}
        gl={{ preserveDrawingBuffer: true, alpha: true }}
        camera={{ position: [0, 0, 10], fov: 50 }} // Posisikan kamera sedikit lebih jauh
      >
        <Suspense fallback={<Loader />}>
          <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 2} />
          <Ball imgUrl={icon} />
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  );
};

// Komponen Skills utama
const Skills = () => {
  const skills = useContent('skills').items;
  return (
    <section className="py-20 w-full relative">
      <div className="w-full max-w-7xl mx-auto px-5">
        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: 'easeOut' }} viewport={{ once: true }} className="text-center mb-16">
          <h1 className="heading mb-6">
            My <span className="text-purple">Skills</span>
          </h1>
          <p className="text-white-100 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">Technologies and tools I use to bring ideas to life</p>
        </motion.div>
        <div className="relative z-10 grid grid-cols-2 place-items-center gap-8 md:flex md:flex-row md:flex-wrap md:justify-center md:gap-10">
          {skills.map((technology, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.1 }} viewport={{ once: true }} className="w-40 h-40 relative group">
              <BallCanvas icon={technology.icon} />
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                <div className="bg-black-100 text-white text-xs px-3 py-1 rounded-lg border border-purple/30 whitespace-nowrap">{technology.name}</div>
              </div>
              <p className="md:hidden text-white-100 text-xs text-center mt-2">{technology.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-purple/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-blue/5 rounded-full blur-3xl"></div>
      </div>
    </section>
  );
};

export default Skills;
