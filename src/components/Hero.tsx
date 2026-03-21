import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!titleRef.current) return;

    const chars = titleRef.current.querySelectorAll('.char');
    gsap.to(chars, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      stagger: 0.05,
      duration: 1,
      ease: 'power4.out',
      delay: 0.5,
    });

    gsap.to('.hero-parallax', {
      y: -100,
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });
  }, []);

  const splitText = (text: string) => {
    return text.split('').map((char, i) => (
      <span key={i} className="char inline-block opacity-0 translate-y-full blur-[10px]">
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-32 overflow-hidden"
    >
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
          className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.9] mb-12"
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

        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <Link
            to="/projects"
            className="marquee-btn group relative px-10 py-5 bg-imperial text-white font-bold rounded-full overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_30px_#FB3640]"
          >
            <span className="relative z-10 flex items-center gap-2">
              VIEW PROJECTS <ArrowRight size={20} />
            </span>
          </Link>

          <Link
            to="/contact"
            className="group relative px-10 py-5 border border-white/20 text-white font-bold rounded-full overflow-hidden transition-all hover:bg-white/5 hover:border-imperial/50"
          >
            <span className="relative z-10">CONTACT ME</span>
          </Link>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] pointer-events-none opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(251,54,64,0.1)_0%,transparent_70%)]" />
      </div>
    </section>
  );
}
