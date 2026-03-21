import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Cpu, Globe, Database, Cloud, Zap, Layout, Terminal } from 'lucide-react';

const skills = [
  { name: 'JavaScript', icon: <Code2 />, color: '#F7DF1E' },
  { name: 'React', icon: <Layout />, color: '#61DAFB' },
  { name: 'Next.js', icon: <Globe />, color: '#FFFFFF' },
  { name: 'Node.js', icon: <Terminal />, color: '#339933' },
  { name: 'Python', icon: <Cpu />, color: '#3776AB' },
  { name: 'AI Tools', icon: <Zap />, color: '#FB3640' },
  { name: 'Cloud', icon: <Cloud />, color: '#0089D6' },
  { name: 'WebGL', icon: <Database />, color: '#990000' },
];

export default function Skills() {
  return (
    <section id="skills" className="py-32 px-6 bg-night">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <h2 className="text-imperial font-mono text-sm tracking-[0.3em] uppercase mb-4">Expertise</h2>
          <h3 className="text-5xl md:text-7xl font-black tracking-tighter">Tech Stack<span className="text-imperial">.</span></h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              whileHover={{ y: -10, scale: 1.02 }}
              className="glass-card p-8 rounded-2xl flex flex-col items-center justify-center gap-4 group cursor-default"
            >
              <div className="text-4xl text-white/50 group-hover:text-imperial transition-colors duration-300">
                {skill.icon}
              </div>
              <span className="font-bold tracking-tight text-white/70 group-hover:text-white transition-colors">
                {skill.name}
              </span>
              
              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" 
                   style={{ boxShadow: `0 0 30px ${skill.color}22` }} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
