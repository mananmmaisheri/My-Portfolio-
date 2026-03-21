import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, ExternalLink, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: "MANANCODES PORTFOLIO.",
    description: "Personal interactive developer portfolio showcasing projects, coding journey, and blog. Built with a focus on cinematic animations and high-performance UI.",
    tech: ["Next.js", "GSAP", "Prisma", "Tailwind"],
    image: "https://picsum.photos/seed/portfolio/800/600",
    github: "https://github.com/mananmmaisheri",
    live: "https://manancodes.com",
  },
  {
    id: 2,
    title: "AI VOICE / CHAT AGENT.",
    description: "AI-powered voice and chatbot agent capable of conversation and automated responses. Integrated with advanced LLMs for natural interactions.",
    tech: ["React", "Node.js", "OpenAI", "Web Speech API"],
    image: "https://picsum.photos/seed/ai-agent/800/600",
    github: "https://github.com/mananmmaisheri",
    live: "#",
  },
];

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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          {projects.map((project) => (
            <Tilt
              key={project.id}
              tiltMaxAngleX={5}
              tiltMaxAngleY={5}
              perspective={1000}
              scale={1.02}
              transitionSpeed={1500}
              gyroscope={true}
              className="project-card"
            >
              <div className="group relative glass-card rounded-[3rem] overflow-hidden transition-all hover:border-imperial/50 hover:shadow-[0_0_40px_rgba(251,54,64,0.1)]">
                {/* Image Container */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-night via-night/50 to-transparent opacity-60" />
                </div>

                {/* Content */}
                <div className="p-10 relative">
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="text-3xl md:text-4xl font-black tracking-tighter group-hover:text-imperial transition-colors">
                      {project.title}
                    </h3>
                    <div className="flex gap-4">
                      <a href={project.github} className="text-white/50 hover:text-imperial transition-colors">
                        <Github size={24} />
                      </a>
                      <a href={project.live} className="text-white/50 hover:text-imperial transition-colors">
                        <ExternalLink size={24} />
                      </a>
                    </div>
                  </div>

                  <p className="text-lg text-white/50 mb-8 font-light leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-3 mb-10">
                    {project.tech.map((t) => (
                      <span key={t} className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-white/70 uppercase tracking-widest">
                        {t}
                      </span>
                    ))}
                  </div>

                  <Link
                    to={`/projects/${project.id}`}
                    className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.2em] text-imperial group/link"
                  >
                    VIEW DETAILS <ArrowUpRight className="group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" size={18} />
                  </Link>
                </div>

                {/* Glowing Border Animation */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-imperial/20 rounded-[3rem] transition-all duration-1000 pointer-events-none" />
              </div>
            </Tilt>
          ))}
        </div>
      </div>
    </div>
  );
}
