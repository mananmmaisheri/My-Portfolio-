import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, ExternalLink, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

import { projects } from '../constants';

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.project-card', 
        { opacity: 0, y: 50, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          stagger: 0.2,
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
        <div className="mb-32 text-center">
          <h2 className="text-7xl md:text-9xl font-black tracking-tighter text-glow">
            PROJECTS.
          </h2>
          <p className="text-imperial font-mono text-sm tracking-[0.5em] uppercase mt-4">
            A Curated Selection of My Work
          </p>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {projects.map((project) => (
            <Tilt
              key={project.id}
              tiltMaxAngleX={5}
              tiltMaxAngleY={5}
              perspective={1000}
              scale={1.05}
              transitionSpeed={1500}
              gyroscope={true}
              className="project-card break-inside-avoid"
            >
              <motion.div 
                whileHover={{ y: -10 }}
                className="group relative glass-card rounded-[2rem] overflow-hidden transition-all hover:border-imperial/50 hover:shadow-[0_0_50px_rgba(251,54,64,0.2)]"
              >
                {/* Image Container */}
                <div className="relative overflow-hidden">
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    src={project.image}
                    alt={project.title}
                    className="w-full h-auto object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-night/90 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-center p-8 backdrop-blur-sm">
                    <h3 className="text-2xl font-black tracking-tighter text-imperial mb-4">
                      {project.title}
                    </h3>
                    <p className="text-sm text-white/70 mb-6 font-light leading-relaxed">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.tech.map((t) => (
                        <span key={t} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-mono text-white/50 uppercase tracking-widest">
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-6">
                      <a 
                        href={project.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-white/50 hover:text-imperial transition-colors"
                      >
                        <Github size={18} /> GITHUB
                      </a>
                      <a 
                        href={project.live} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-white/50 hover:text-imperial transition-colors"
                      >
                        <ExternalLink size={18} /> VERCEL
                      </a>
                    </div>
                  </div>
                </div>

                {/* Default Content (Visible when not hovered) */}
                <div className="p-6 group-hover:opacity-0 transition-opacity duration-300">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-black tracking-tighter">
                      {project.title}
                    </h3>
                    <ArrowUpRight className="text-white/30 group-hover:text-imperial transition-colors" size={20} />
                  </div>
                </div>

                {/* Glowing Border Animation */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-imperial/30 rounded-[2rem] transition-all duration-1000 pointer-events-none" />
              </motion.div>
            </Tilt>
          ))}
        </div>
      </div>
    </div>
  );
}
