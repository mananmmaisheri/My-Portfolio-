import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Projects', path: '/projects' },
  { name: 'Journey', path: '/journey' },
  { name: 'Blog', path: '/blog' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        'fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 w-[90%] max-w-4xl',
        isScrolled ? 'top-4' : 'top-8'
      )}
    >
      <div className="glass-card rounded-full px-6 py-3 flex items-center justify-between shadow-2xl shadow-black/50">
        <Link to="/" className="text-2xl font-black tracking-tighter text-imperial text-glow">
          MANAN.
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={cn(
                'relative text-sm font-medium uppercase tracking-widest transition-colors hover:text-imperial',
                location.pathname === link.path ? 'text-imperial' : 'text-white/70'
              )}
            >
              {link.name}
              {location.pathname === link.path && (
                <motion.div
                  layoutId="nav-underline"
                  className="absolute -bottom-1 left-0 w-full h-0.5 bg-imperial shadow-[0_0_10px_#FB3640]"
                />
              )}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="absolute top-20 left-0 w-full glass-card rounded-3xl p-6 flex flex-col gap-4 md:hidden"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  'text-lg font-bold uppercase tracking-widest p-4 rounded-2xl transition-all',
                  location.pathname === link.path
                    ? 'bg-imperial/10 text-imperial border border-imperial/20'
                    : 'text-white/70 hover:bg-white/5'
                )}
              >
                {link.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
