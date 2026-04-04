import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { ArrowRight, Github, ExternalLink, ArrowUpRight, BookOpen } from 'lucide-react';
import { techStack, projects } from '../constants';
import { blogs } from '../blogData';
import Tilt from 'react-parallax-tilt';

gsap.registerPlugin(ScrollTrigger);

function Magnetic({ children }: { children: React.ReactNode }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;
    x.set(distanceX * 0.35);
    y.set(distanceY * 0.35);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className="relative"
    >
      {children}
    </motion.div>
  );
}

function CodeBackground() {
  const snippets = [
    "while(alive) { eat(); sleep(); code(); repeat(); }",
    "if (brain.isEmpty()) { coffee.refill(); }",
    "git commit -m \"fixed bugs, added new ones\"",
    "sudo make me a sandwich",
    "console.log(\"It works on my machine!\")",
    "404: Sleep not found",
    "import { happiness } from 'life';",
    "const life = { status: 'coding' };",
    "try { life() } catch (e) { coffee() }",
    "npm install sanity --save-dev",
    "// TODO: Fix this later (Narrator: He didn't)",
    "git push --force # YOLO",
    "!false // it's funny because it's true",
    "console.log(0.1 + 0.2 === 0.3); // false",
    "Array(16).join('wat' - 1) + ' Batman!'",
    "Object.is(NaN, NaN) // true",
    "typeof NaN === 'number' // true",
    "[] + [] // ''",
    "[] + {} // '[object Object]'",
    "{} + [] // 0",
    "[] + {} // '[object Object]'",
    "Array(16).join('wat' - 1) + ' Batman!'",
    "Object.is(NaN, NaN) // true",
    "typeof NaN === 'number' // true",
    "!![] // true",
    "!!{} // true",
    "!!'' // false",
    "!!0 // false",
    "0 == '0' // true",
    "0 === '0' // false",
    "null == undefined // true",
    "null === undefined // false",
    "[] == ![] // true",
    "NaN === NaN // false",
    "Math.min() > Math.max() // true",
    "9999999999999999 // 10000000000000000",
    "0.1 + 0.2 === 0.3 // false",
    "true + true === 2 // true",
    "true === 1 // false",
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      {snippets.map((snippet, i) => (
        <motion.div
          key={i}
          initial={{ 
            x: Math.random() * 100 + "%", 
            y: Math.random() * 100 + "%",
            opacity: 0 
          }}
          animate={{ 
            y: [null, (Math.random() * 100 - 50) + "%"],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: Math.random() * 20 + 20,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 10,
          }}
          className="absolute font-mono text-[10px] md:text-xs text-white/10 whitespace-nowrap"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            transform: `rotate(${Math.random() * 20 - 10}deg)`,
          }}
        >
          {snippet}
        </motion.div>
      ))}
    </div>
  );
}

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const techRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!titleRef.current) return;

    const ctx = gsap.context(() => {
      // Title Animation
      const chars = titleRef.current?.querySelectorAll('.char');
      if (chars) {
        gsap.to(chars, {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          stagger: 0.05,
          duration: 1,
          ease: 'power4.out',
          delay: 0.5,
        });
      }

      // Hero Parallax
      gsap.to('.hero-parallax', {
        y: -150,
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Section Reveals
      gsap.utils.toArray('section').forEach((section: any, i) => {
        if (i === 0) return; // Skip hero
        gsap.fromTo(section, 
          { opacity: 0, y: 100 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            }
          }
        );
      });

      // Project Image Parallax
      gsap.utils.toArray('.project-image').forEach((img: any) => {
        gsap.to(img, {
          y: -50,
          scrollTrigger: {
            trigger: img,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          }
        });
      });

      // Floating Elements Parallax
      gsap.to('.floating-blob', {
        y: -200,
        rotation: 45,
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 2,
        }
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const splitText = (text: string) => {
    return text.split('').map((char, i) => (
      <span key={i} className="char inline-block opacity-0 translate-y-full blur-[10px]">
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    <div className="flex flex-col">
      <section
        ref={heroRef}
        className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-32 overflow-hidden"
      >
        <CodeBackground />
        <div className="hero-parallax max-w-7xl w-full text-center z-10">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-imperial font-mono text-sm md:text-base tracking-[0.5em] uppercase mb-8"
          >
            Creative Developer & Builder
          </motion.p>

          <h1
            ref={titleRef}
            className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.9] mb-12 whitespace-nowrap sm:whitespace-normal"
          >
            {splitText("HI, I'M MANAN.")}
          </h1>

          <div className="h-12 md:h-16 mb-16">
            <TypeAnimation
              sequence={[
                'Software Developer',
                2000,
                'Full Stack Engineer',
                2000,
                'AI Enthusiast',
                2000,
                'Creative Technologist',
                2000,
              ]}
              wrapper="span"
              speed={50}
              className="text-2xl md:text-4xl lg:text-5xl font-bold text-white/50 uppercase tracking-widest"
              repeat={Infinity}
            />
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <Magnetic>
              <Link
                to="/projects"
                className="group relative px-12 py-6 bg-imperial text-white font-black uppercase tracking-[0.2em] rounded-full overflow-hidden transition-all hover:shadow-[0_0_40px_rgba(251,54,64,0.4)] flex items-center gap-3"
              >
                <span className="relative z-10 flex items-center gap-3">
                  VIEW PROJECTS <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </Link>
            </Magnetic>

            <Magnetic>
              <Link
                to="/blog"
                className="group relative px-12 py-6 border border-white/20 text-white font-black uppercase tracking-[0.2em] rounded-full overflow-hidden transition-all hover:bg-white/5 hover:border-imperial/50 flex items-center gap-3"
              >
                <span className="relative z-10 flex items-center gap-3">
                  READ MY BLOGS <BookOpen size={20} className="group-hover:rotate-12 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-imperial/5 -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
              </Link>
            </Magnetic>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] pointer-events-none opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(251,54,64,0.1)_0%,transparent_70%)]" />
          <div className="floating-blob absolute top-1/4 left-1/4 w-64 h-64 bg-imperial/20 rounded-full blur-3xl" />
          <div className="floating-blob absolute bottom-1/4 right-1/4 w-96 h-96 bg-imperial/10 rounded-full blur-3xl" />
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-20 relative overflow-hidden bg-night/50 backdrop-blur-sm border-y border-white/5">
        <CodeBackground />
        <div ref={techRef} className="max-w-7xl mx-auto px-6 relative z-10">
          <h2 className="text-3xl md:text-5xl font-black mb-16 text-center tracking-tighter">TECH STACK.</h2>
          <div className="flex gap-12 md:gap-20 whitespace-nowrap w-fit animate-marquee">
            {[...techStack, ...techStack, ...techStack].map((tech, i) => (
              <div key={i} className="flex flex-col items-center gap-4 group">
                <div className="w-16 h-16 md:w-24 md:h-24 glass-card rounded-2xl flex items-center justify-center p-4 transition-all group-hover:border-imperial group-hover:shadow-[0_0_20px_rgba(251,54,64,0.2)] group-hover:scale-110">
                  <img src={tech.logo} alt={tech.name} className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all" />
                </div>
                <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest group-hover:text-imperial transition-colors">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Projects Section */}
      <section className="py-32 px-6 relative overflow-hidden">
        <CodeBackground />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter">RECENT WORK.</h2>
              <p className="text-imperial font-mono text-sm tracking-[0.5em] uppercase mt-4">Selected Projects</p>
            </div>
            <Link to="/projects" className="group flex items-center gap-2 text-white/50 hover:text-imperial transition-colors font-bold uppercase tracking-widest text-sm">
              View All Projects <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {projects.slice(0, 2).map((project) => (
              <Tilt
                key={project.id}
                tiltMaxAngleX={5}
                tiltMaxAngleY={5}
                perspective={1000}
                scale={1.02}
                transitionSpeed={1500}
                className="project-card"
              >
                <div className="group relative glass-card rounded-[3rem] overflow-hidden transition-all hover:border-imperial/50">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="project-image w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-night via-night/20 to-transparent opacity-60" />
                  </div>
                  <div className="p-8">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-2xl font-black tracking-tighter">{project.title}</h3>
                      <div className="flex gap-4">
                        <a href={project.github} className="text-white/50 hover:text-imperial transition-colors"><Github size={20} /></a>
                        <a href={project.live} className="text-white/50 hover:text-imperial transition-colors"><ExternalLink size={20} /></a>
                      </div>
                    </div>
                    <p className="text-white/50 text-sm mb-6 line-clamp-2">{project.description}</p>
                    <Link to="/projects" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-imperial group/link">
                      VIEW DETAILS <ArrowUpRight className="group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" size={14} />
                    </Link>
                  </div>
                </div>
              </Tilt>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Blog Section */}
      <section className="py-32 px-6 bg-imperial/5 relative overflow-hidden">
        <CodeBackground />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter">LATEST THOUGHTS.</h2>
              <p className="text-imperial font-mono text-sm tracking-[0.5em] uppercase mt-4">From the Blog</p>
            </div>
            <Link to="/blog" className="group flex items-center gap-2 text-white/50 hover:text-imperial transition-colors font-bold uppercase tracking-widest text-sm">
              Read All Posts <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {blogs.slice(0, 2).map((post) => (
              <Link 
                key={post.id} 
                to="/blog"
                className="group relative glass-card rounded-[3rem] overflow-hidden p-10 hover:border-imperial/30 transition-all"
              >
                <div className="flex items-center justify-between mb-8">
                  <span className="text-xs font-mono text-white/30 uppercase tracking-widest">
                    {post.date}
                  </span>
                  <span className={`px-4 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest bg-gradient-to-r ${post.color} text-white`}>
                    {post.category}
                  </span>
                </div>
                <h3 className="text-3xl font-black tracking-tighter mb-6 group-hover:text-imperial transition-colors leading-tight">
                  {post.title}
                </h3>
                <p className="text-lg text-white/50 mb-10 font-light leading-relaxed line-clamp-2">
                  {post.description}
                </p>
                <div className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.2em] text-imperial">
                  READ POST <ArrowUpRight size={18} />
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-imperial/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
      </section>

    </div>
  );
}
