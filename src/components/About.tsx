import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Mail, ExternalLink } from 'lucide-react';

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

const techStack = [
  { name: 'JavaScript', logo: 'https://cdn.simpleicons.org/javascript' },
  { name: 'React', logo: 'https://cdn.simpleicons.org/react' },
  { name: 'Next.js', logo: 'https://cdn.simpleicons.org/nextdotjs/white' },
  { name: 'Python', logo: 'https://cdn.simpleicons.org/python' },
  { name: 'C Programming', logo: 'https://cdn.simpleicons.org/c' },
  { name: 'Node.js', logo: 'https://cdn.simpleicons.org/nodedotjs' },
  { name: 'Git', logo: 'https://cdn.simpleicons.org/git' },
  { name: 'AI Tools', logo: 'https://cdn.simpleicons.org/openai/white' },
  { name: 'Tailwind', logo: 'https://cdn.simpleicons.org/tailwindcss' },
  { name: 'Prisma', logo: 'https://cdn.simpleicons.org/prisma/white' },
];

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const techRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.story-block').forEach((block: any) => {
        gsap.fromTo(block, 
          { opacity: 0, y: 100, filter: 'blur(20px)' },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 1.5,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: block,
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play reverse play reverse',
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

      // Tech Stack Animation
      if (techRef.current) {
        gsap.to('.tech-logo-track', {
          xPercent: -50,
          ease: 'none',
          duration: 20,
          repeat: -1,
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-[450vh] py-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="mb-32 text-center">
          <motion.h2 
            style={{ scale, opacity }}
            className="text-7xl md:text-9xl font-black tracking-tighter text-glow"
          >
            STORYTELLING.
          </motion.h2>
          
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-white/50 font-mono text-sm uppercase tracking-widest">
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-imperial" />
              Mumbai, India
            </div>
            <div className="flex items-center gap-2">
              <Mail size={16} className="text-imperial" />
              contact@manancodes.com
            </div>
          </div>
        </div>

        <div className="space-y-64">
          {storyBlocks.map((block, i) => (
            <div 
              key={i} 
              className={`story-block flex flex-col ${block.align === 'right' ? 'md:items-end' : 'md:items-start'}`}
            >
              <div className={`max-w-2xl ${block.align === 'right' ? 'text-right' : 'text-left'}`}>
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
        <div ref={techRef} className="mt-64 relative overflow-hidden py-20">
          <h3 className="text-4xl md:text-6xl font-black mb-20 text-center">TECH STACK.</h3>
          <div className="tech-logo-track flex gap-20 whitespace-nowrap w-fit">
            {[...techStack, ...techStack].map((tech, i) => (
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
        <div className="mt-64 relative h-px w-full bg-white/10 overflow-hidden">
          <div className="divider-line absolute inset-0 bg-imperial shadow-[0_0_10px_#FB3640] origin-left" />
        </div>

        {/* Parallax Image Section */}
        <div className="mt-64 relative h-screen rounded-[4rem] overflow-hidden glass-card">
          <motion.div 
            style={{ scale: 1.1 }}
            className="absolute inset-0 bg-[url('https://picsum.photos/seed/tech/1920/1080')] bg-cover bg-center opacity-30 grayscale hover:grayscale-0 transition-all duration-1000"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
            <h4 className="text-5xl md:text-8xl font-black text-center mb-12">
              BUILDING THE <span className="text-imperial italic">FUTURE</span>.
            </h4>
            <a 
              href="https://manancodes.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-8 py-4 glass-card rounded-full text-sm font-black uppercase tracking-[0.3em] hover:bg-imperial hover:text-white transition-all group"
            >
              VISIT MAIN SITE <ExternalLink size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
