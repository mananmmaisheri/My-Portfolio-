import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, ExternalLink, ArrowUpRight } from 'lucide-react';

import { projects } from '../constants';

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.project-card', 
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          stagger: 0.25,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24 text-center">
          <h2 className="text-7xl md:text-9xl font-black tracking-tighter text-glow">
            PROJECTS.
          </h2>
          <p className="text-imperial font-mono text-sm tracking-[0.5em] uppercase mt-4">
            A Curated Selection of My Work
          </p>
        </div>

        {/* Dynamic, High-impact Asymmetric Grid with Big sizes rhythm */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {projects.map((project, index) => {
            // Asymmetric layout spans to create visually pleasing rhythm
            const colSpan = index === 0 ? "lg:col-span-7" : "lg:col-span-5";
            const imageAspect = index === 0 ? "aspect-[16/9]" : "aspect-[16/10]";

            return (
              <div 
                key={project.id} 
                className={`project-card ${colSpan} flex flex-col`}
              >
                <Tilt
                  tiltMaxAngleX={4}
                  tiltMaxAngleY={4}
                  perspective={1000}
                  scale={1.02}
                  transitionSpeed={1200}
                  gyroscope={true}
                  className="h-full flex flex-col"
                >
                  <motion.div 
                    whileHover={{ y: -8 }}
                    className="group relative h-full flex flex-col glass-card rounded-[2.5rem] p-6 md:p-8 overflow-hidden transition-all duration-500 hover:border-imperial/50 hover:shadow-[0_0_50px_rgba(251,54,64,0.15)] bg-white/5 border border-white/10"
                  >
                    {/* Image Showcase */}
                    <div className={`relative ${imageAspect} rounded-[1.8rem] overflow-hidden mb-8 bg-black/40`}>
                      <motion.img
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 pointer-events-none" />
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        {/* Title & Badge */}
                        <div className="flex items-center justify-between gap-4 mb-4">
                          <h3 className="text-2xl md:text-3xl font-black tracking-tighter text-white uppercase group-hover:text-imperial transition-colors duration-300">
                            {project.title}
                          </h3>
                          <span className="text-[10px] font-mono font-bold tracking-widest text-imperial uppercase bg-imperial/10 px-3 py-1 rounded-full border border-imperial/25">
                            PROJ #{project.id}
                          </span>
                        </div>

                        {/* Tech stack */}
                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.tech.map((t) => (
                            <span 
                              key={t} 
                              className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-[10px] font-mono text-white/60 uppercase tracking-widest group-hover:border-white/20 transition-all duration-300"
                            >
                              {t}
                            </span>
                          ))}
                        </div>

                        {/* Description */}
                        <p className="text-sm md:text-base text-white/70 font-light leading-relaxed mb-8">
                          {project.description}
                        </p>
                      </div>

                      {/* Explicit Interactive Action Buttons */}
                      <div className="pt-6 border-t border-white/5 flex flex-wrap items-center gap-4">
                        <a 
                          href={project.github} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex-1 min-w-[120px] flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white px-5 py-3.5 rounded-full border border-white/10 hover:border-white/20 text-xs font-bold uppercase tracking-widest transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
                        >
                          <Github size={16} className="text-white/70 group-hover:text-imperial transition-colors" /> GITHUB
                        </a>
                        <a 
                          href={project.live} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex-1 min-w-[120px] flex items-center justify-center gap-2 bg-imperial hover:bg-imperial/90 text-white px-5 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest hover:shadow-[0_0_25px_rgba(251,54,64,0.35)] transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
                        >
                          <ExternalLink size={16} /> VERCEL (LIVE)
                        </a>
                      </div>
                    </div>

                    {/* Glowing highlight border */}
                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-imperial/20 rounded-[2.5rem] transition-all duration-1000 pointer-events-none" />
                  </motion.div>
                </Tilt>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

