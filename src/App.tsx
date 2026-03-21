import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import SmoothScroll from './components/SmoothScroll';
import AnimatedBackground from './components/AnimatedBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Journey from './components/Journey';
import Blog from './components/Blog';
import Contact from './components/Contact';
import CustomCursor from './components/CustomCursor';
import Chatbot from './components/Chatbot';

function PageTransition({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, filter: 'blur(20px)' }}
        animate={{ opacity: 1, filter: 'blur(0px)' }}
        exit={{ opacity: 0, filter: 'blur(20px)' }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <Router>
      <SmoothScroll>
        <div className="relative min-h-screen bg-night text-white selection:bg-imperial selection:text-white">
          <CustomCursor />
          <AnimatedBackground />
          <Navbar />
          
          <main className="relative z-10">
            <PageTransition>
              <Routes>
                <Route path="/" element={<Hero />} />
                <Route path="/about" element={<About />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/journey" element={<Journey />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </PageTransition>
          </main>

          <Chatbot />

          <footer className="relative z-10 py-20 px-6 border-t border-white/5 bg-night/50 backdrop-blur-xl">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-2xl font-black tracking-tighter text-imperial text-glow">
                MANAN.
              </div>
              <div className="flex gap-8 text-white/30 font-mono text-xs uppercase tracking-widest">
                <a href="https://twitter.com/mananmmaisheri" target="_blank" rel="noopener noreferrer" className="hover:text-imperial transition-colors">Twitter</a>
                <a href="https://github.com/mananmmaisheri" target="_blank" rel="noopener noreferrer" className="hover:text-imperial transition-colors">Github</a>
                <a href="https://linkedin.com/in/mananmmaisheri" target="_blank" rel="noopener noreferrer" className="hover:text-imperial transition-colors">LinkedIn</a>
              </div>
              <p className="text-white/20 font-mono text-[10px] uppercase tracking-widest">
                © 2026 MANAN CODES. ALL RIGHTS RESERVED.
              </p>
            </div>
          </footer>
        </div>
      </SmoothScroll>
    </Router>
  );
}
