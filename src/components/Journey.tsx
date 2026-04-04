import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, Award, Code, Rocket, GraduationCap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const journeyData = [
  {
    year: '2026',
    title: 'Data Science',
    description: 'Learning Data Science from Code with Harry, mastering data manipulation, visualization, and statistical analysis.',
    icon: Award,
    color: '#FB3640',
    progress: 40,
  },
  {
    year: '2026',
    title: 'AIML Mastery',
    description: 'Deep diving into Artificial Intelligence and Machine Learning through the DeepLearning.AI specialization.',
    icon: Rocket,
    color: '#FB3640',
    progress: 30,
  },
  {
    year: '2026',
    title: 'Advanced Python',
    description: 'Almost completed advanced Python concepts, including decorators, generators, and asynchronous programming.',
    icon: Code,
    color: '#FB3640',
    progress: 90,
  },
  {
    year: '2026',
    title: 'DSA (JAVA)',
    description: 'Mastering Data Structures and Algorithms using Java to build a strong foundation for problem-solving.',
    icon: GraduationCap,
    color: '#FB3640',
    progress: 25,
  },
  {
    year: '2026',
    title: 'AI Exploration',
    description: 'Exploring the vast landscape of AI, from prompt engineering to building intelligent agents.',
    icon: Rocket,
    color: '#FB3640',
    progress: 50,
  },
  {
    year: '2025',
    title: 'Internship in AI',
    description: 'Gained hands-on experience with AI projects. Developed "AI Study Pal", an AI Para Summarizer, and an intelligent test generator.',
    icon: Award,
    color: '#FB3640',
    progress: 100,
  },
  {
    year: '2025',
    title: 'Python Fundamentals',
    description: 'Completed 100% of Python programming fundamentals, building a solid base for backend development.',
    icon: Code,
    color: '#FB3640',
    progress: 100,
  },
  {
    year: '2025',
    title: 'C & C++ Programming',
    description: 'Mastered the fundamentals of C and C++ programming from Code with Harry, focusing on memory management and performance.',
    icon: GraduationCap,
    color: '#FB3640',
    progress: 100,
  },
  {
    year: '2024',
    title: 'Web Development',
    description: 'Started my journey with Web Development, learning HTML, CSS, and JavaScript to build interactive digital experiences.',
    icon: Calendar,
    color: '#FB3640',
    progress: 100,
  },
];

export default function Journey() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.journey-item').forEach((item: any, i: number) => {
        gsap.fromTo(item, 
          { opacity: 0, x: i % 2 === 0 ? -50 : 50, filter: 'blur(10px)' },
          {
            opacity: 1,
            x: 0,
            filter: 'blur(0px)',
            duration: 1,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play reverse play reverse',
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative py-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="mb-32 text-center">
          <h2 className="text-7xl md:text-9xl font-black tracking-tighter text-glow">
            JOURNEY.
          </h2>
          <p className="text-imperial font-mono text-sm tracking-[0.5em] uppercase mt-4">
            The Path of a Creative Builder
          </p>
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2 hidden md:block" />
          <motion.div 
            style={{ scaleY: pathLength }}
            className="absolute left-1/2 top-0 bottom-0 w-px bg-imperial shadow-[0_0_10px_#FB3640] -translate-x-1/2 origin-top hidden md:block"
          />

          <div className="space-y-32">
            {journeyData.map((item, index) => (
              <div
                key={index}
                className={`journey-item relative flex flex-col md:flex-row items-center gap-12 ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Icon Circle */}
                <div className="absolute left-1/2 -translate-x-1/2 w-16 h-16 bg-night border border-imperial/50 rounded-full flex items-center justify-center z-20 hidden md:flex shadow-[0_0_20px_rgba(251,54,64,0.3)]">
                  <item.icon size={24} className="text-imperial" />
                </div>

                {/* Content Card */}
                <div className="w-full md:w-[45%]">
                  <div className="glass-card p-10 rounded-[3rem] hover:border-imperial/30 transition-all group relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                      <item.icon size={80} className="text-imperial" />
                    </div>
                    
                    <span className="text-sm font-mono text-imperial mb-4 block tracking-[0.3em] uppercase">
                      {item.year}
                    </span>
                    <h4 className="text-3xl md:text-4xl font-black mb-6 group-hover:text-imperial transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-lg text-white/50 leading-relaxed font-light mb-8">
                      {item.description}
                    </p>

                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-mono text-white/30 uppercase tracking-widest">
                        <span>Progress</span>
                        <span>{item.progress}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.progress}%` }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                          className="h-full bg-imperial shadow-[0_0_10px_#FB3640]"
                        />
                      </div>
                    </div>

                    {/* Glowing Accent */}
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-imperial/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>

                {/* Spacer for Desktop */}
                <div className="hidden md:block w-[45%]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
