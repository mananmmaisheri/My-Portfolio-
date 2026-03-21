import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      const target = e.target as HTMLElement;
      setIsPointer(window.getComputedStyle(target).cursor === 'pointer' || target.tagName === 'A' || target.tagName === 'BUTTON');
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full border border-imperial pointer-events-none z-[9999] mix-blend-difference hidden md:block"
      animate={{
        x: position.x - 16,
        y: position.y - 16,
        scale: isPointer ? 2.5 : 1,
        backgroundColor: isPointer ? 'rgba(251, 54, 64, 0.3)' : 'rgba(251, 54, 64, 0)',
      }}
      transition={{ type: 'spring', damping: 30, stiffness: 250, mass: 0.5 }}
    />
  );
}
