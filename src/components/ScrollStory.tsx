import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TechBackground from './TechBackground';
import Journey from './Journey';

gsap.registerPlugin(ScrollTrigger);

const techStack = [
  { name: 'HTML', slug: 'html5' },
  { name: 'CSS', slug: 'css3' },
  { name: 'JavaScript', slug: 'javascript' },
  { name: 'TypeScript', slug: 'typescript' },
  { name: 'React', slug: 'react' },
  { name: 'SQL', slug: 'sqlite' },
  { name: 'MongoDB', slug: 'mongodb' },
  { name: 'Python', slug: 'python' },
  { name: 'C', slug: 'c' },
  { name: 'Java', slug: 'openjdk' },
  { name: 'Git', slug: 'git' },
  { name: 'Next.js', slug: 'nextdotjs' },
  { name: 'Node.js', slug: 'nodedotjs' },
];

export default function ScrollStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const section1Ref = useRef<HTMLDivElement>(null);
  const section2Ref = useRef<HTMLDivElement>(null);
  const section3Ref = useRef<HTMLDivElement>(null);
  const section4Ref = useRef<HTMLDivElement>(null);
  const section5Ref = useRef<HTMLDivElement>(null);
  const section6Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Text reveals
      const sections = [section1Ref, section2Ref, section3Ref, section4Ref, section5Ref, section6Ref];
      sections.forEach((section, index) => {
        if (!section.current) return;
        gsap.fromTo(section.current.querySelectorAll('.reveal-text'),
          { opacity: 0, y: 50, filter: 'blur(10px)' },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 1,
            stagger: 0.2,
            scrollTrigger: {
              trigger: section.current,
              start: 'top center',
              end: 'bottom center',
              toggleActions: 'play reverse play reverse'
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full">
      <TechBackground />

      {/* Section 1: Intro */}
      <section ref={section1Ref} className="relative h-screen flex items-center justify-center px-6 z-10">
        <div className="max-w-4xl text-center">
          <h1 className="reveal-text text-7xl md:text-9xl font-black mb-6">
            HI, I'M <span className="text-imperial text-glow">MANAN</span>.
          </h1>
          <p className="reveal-text text-xl md:text-2xl font-mono text-white/50 uppercase tracking-[0.3em]">
            A Creative Developer.
          </p>
        </div>
      </section>

      {/* Section 2: Coding Scene */}
      <section ref={section2Ref} className="relative h-screen flex items-center justify-end px-6 md:px-32 z-10">
        <div className="max-w-2xl text-right">
          <h2 className="reveal-text text-5xl md:text-7xl font-black mb-6">
            I BUILD <span className="text-imperial text-glow">INTELLIGENT</span> DIGITAL EXPERIENCES.
          </h2>
          <p className="reveal-text text-lg md:text-xl text-white/50 leading-relaxed">
            Merging aesthetics with performance to create seamless, high-impact web applications.
          </p>
        </div>
      </section>

      {/* Section 3: Journey */}
      <div ref={section3Ref}>
        <Journey />
      </div>

      {/* Section 4: Skills */}
      <section ref={section4Ref} id="skills" className="relative min-h-screen flex items-center justify-center py-32 px-6 z-10">
        <div className="max-w-5xl w-full">
          <h2 className="reveal-text text-5xl md:text-7xl font-black mb-16 text-center">
            TECH <span className="text-imperial text-glow">STACK</span>.
          </h2>
          <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-8">
            {techStack.map((tech, i) => (
              <motion.div
                key={tech.name}
                whileHover={{ scale: 1.1, y: -5 }}
                className="reveal-text flex flex-col items-center gap-4 group"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 glass-card rounded-2xl flex items-center justify-center p-4 group-hover:border-imperial/50 transition-all shadow-lg">
                  <img 
                    src={`https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/${tech.slug}.svg`} 
                    alt={tech.name}
                    className="w-full h-full invert opacity-70 group-hover:opacity-100 transition-opacity"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest group-hover:text-imperial transition-colors">
                  {tech.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: Projects */}
      <section ref={section5Ref} id="projects" className="relative min-h-screen py-32 px-6 z-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="reveal-text text-5xl md:text-7xl font-black mb-20 text-center">
            FEATURED <span className="text-imperial text-glow">PROJECTS</span>.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[1, 2, 3, 4].map((p) => (
              <div key={p} className="reveal-text group relative overflow-hidden rounded-3xl glass-card aspect-video cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-t from-night to-transparent opacity-60 z-10" />
                <div className="absolute inset-0 bg-imperial/10 group-hover:bg-imperial/20 transition-colors z-0" />
                <div className="absolute bottom-0 left-0 p-8 z-20">
                  <h3 className="text-3xl font-bold mb-2">Project Name {p}</h3>
                  <p className="text-white/50 mb-4">A futuristic digital experience built with Next.js and AI.</p>
                  <div className="flex gap-2">
                    <span className="text-xs font-mono px-3 py-1 bg-white/10 rounded-full">React</span>
                    <span className="text-xs font-mono px-3 py-1 bg-white/10 rounded-full">Three.js</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 6: CTA */}
      <section ref={section6Ref} className="relative h-screen flex items-center justify-center px-6 z-10">
        <div className="max-w-4xl text-center">
          <h2 className="reveal-text text-6xl md:text-8xl font-black mb-12">
            LET'S BUILD SOMETHING <span className="text-imperial text-glow italic">AMAZING</span>.
          </h2>
          <div className="reveal-text flex flex-col md:flex-row gap-6 justify-center">
            <button className="px-12 py-5 bg-imperial text-white font-bold rounded-full hover:scale-105 transition-transform imperial-glow">
              VIEW PROJECTS
            </button>
            <button className="px-12 py-5 border border-white/20 text-white font-bold rounded-full hover:bg-white/5 transition-colors">
              CONTACT ME
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
