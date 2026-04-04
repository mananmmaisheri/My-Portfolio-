import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Mail } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const storyBlocks = [
  {
    title: "THE BEGINNING.",
    text: "Manan, an Information Technology Student at Shah and Anchor Engineering College, started his digital realm journey with a simple 'Hello World'. What began as curiosity quickly evolved into a passion for building complex, high-performance systems.",
    align: "left",
  },
  {
    title: "THE VISION.",
    text: "I believe that technology should be as beautiful as it is functional. My goal is to bridge the gap between creative design and robust engineering, creating experiences that are both cinematic and seamless.",
    align: "right",
  },
  {
    title: "THE CRAFT.",
    text: "From full-stack development to AI-driven applications, I specialize in building scalable solutions that solve real-world problems. Every line of code is written with precision and purpose.",
    align: "left",
  },
];

import { techStack } from '../constants';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const techRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);
  const opacity = useTransform(scrollYProgress, [0, 0.05, 0.1, 0.15], [1, 1, 0.5, 0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.story-block').forEach((block: any) => {
        gsap.fromTo(block, 
          { opacity: 0, y: 100, filter: 'blur(10px)' },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 1.5,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: block,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            }
          }
        );
      });

      gsap.fromTo('.divider-line', 
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 2,
          ease: 'power4.inOut',
          scrollTrigger: {
            trigger: '.divider-line',
            start: 'top 90%',
            scrub: true,
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-[200vh] py-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="sticky top-0 h-screen flex flex-col items-center justify-center pointer-events-none">
          <motion.h2 
            style={{ scale, opacity }}
            className="text-7xl md:text-9xl font-black tracking-tighter text-glow"
          >
            STORYTELLING.
          </motion.h2>
          
          <motion.div 
            style={{ opacity }}
            className="mt-12 flex flex-wrap justify-center gap-8 text-white/50 font-mono text-sm uppercase tracking-widest"
          >
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-imperial" />
              Mumbai, India
            </div>
            <div className="flex items-center gap-2">
              <Mail size={16} className="text-imperial" />
              contact@manancodes.com
            </div>
          </motion.div>
        </div>

        <div className="relative z-10 space-y-24 mt-[15vh]">
          {storyBlocks.map((block, i) => (
            <div 
              key={i} 
              className={`story-block flex flex-col ${block.align === 'right' ? 'md:items-end' : 'md:items-start'}`}
            >
              <div className={`max-w-2xl ${block.align === 'right' ? 'text-right' : 'text-left'} glass-card p-12 rounded-[3rem]`}>
                <h3 className="text-4xl md:text-6xl font-black mb-8 text-imperial">
                  {block.title}
                </h3>
                <p className="text-xl md:text-2xl text-white/70 leading-relaxed font-light">
                  {block.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Tech Stack Section */}
        <div ref={techRef} className="mt-20 relative overflow-hidden py-20">
          <h3 className="text-4xl md:text-6xl font-black mb-20 text-center">TECH STACK.</h3>
          <div className="flex gap-20 whitespace-nowrap w-fit animate-marquee">
            {[...techStack, ...techStack, ...techStack].map((tech, i) => (
              <div key={i} className="flex flex-col items-center gap-4 group">
                <div className="w-24 h-24 md:w-32 md:h-32 glass-card rounded-3xl flex items-center justify-center p-6 transition-all group-hover:border-imperial group-hover:shadow-[0_0_30px_rgba(251,54,64,0.2)] group-hover:scale-110">
                  <img src={tech.logo} alt={tech.name} className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all" />
                </div>
                <span className="text-xs font-mono text-white/30 uppercase tracking-widest group-hover:text-imperial transition-colors">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Animated Divider */}
        <div className="mt-20 relative h-px w-full bg-white/10 overflow-hidden">
          <div className="divider-line absolute inset-0 bg-imperial shadow-[0_0_10px_#FB3640] origin-left" />
        </div>

        {/* Parallax Image Section */}
        <div className="mt-20 relative h-[60vh] rounded-[4rem] overflow-hidden glass-card">
          <motion.div 
            style={{ scale: 1.1 }}
            className="absolute inset-0 bg-[url('https://picsum.photos/seed/tech/1920/1080')] bg-cover bg-center opacity-30 grayscale hover:grayscale-0 transition-all duration-1000"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
            <h4 className="text-5xl md:text-8xl font-black text-center">
              BUILDING THE <span className="text-imperial italic">FUTURE</span>.
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
}
