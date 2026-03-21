import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const codeSnippets = [
  'const dev = { name: "Manan", role: "Fullstack" };',
  'function buildFuture() { return "AI + Web"; }',
  'while(alive) { code(); eat(); sleep(); }',
  'import { motion } from "framer-motion";',
  'const [state, setState] = useState(null);',
  'useEffect(() => { init(); }, []);',
  'db.collection("projects").find({});',
  'git commit -m "feat: futuristic UI"',
  'npm install @google/genai',
  'console.log("Hello World");',
];

export default function TechBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    class Particle {
      x: number;
      y: number;
      size: number;
      baseSize: number;
      speedX: number;
      speedY: number;
      opacity: number;
      color: string;
      isImperial: boolean;
      pulse: number;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.baseSize = Math.random() * 2 + 0.5;
        this.size = this.baseSize;
        this.speedX = (Math.random() * 0.8 - 0.4) * (Math.random() > 0.5 ? 1.5 : 0.5);
        this.speedY = (Math.random() * 0.8 - 0.4) * (Math.random() > 0.5 ? 1.5 : 0.5);
        this.opacity = Math.random() * 0.4 + 0.1;
        this.isImperial = Math.random() > 0.8;
        this.color = this.isImperial ? '#FF6321' : '#FFFFFF';
        this.pulse = Math.random() * Math.PI * 2;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.pulse += 0.02;
        this.size = this.baseSize + Math.sin(this.pulse) * 0.5;

        if (this.x > canvas!.width) this.x = 0;
        if (this.x < 0) this.x = canvas!.width;
        if (this.y > canvas!.height) this.y = 0;
        if (this.y < 0) this.y = canvas!.height;
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        const currentOpacity = this.opacity + Math.sin(this.pulse) * 0.1;
        ctx.globalAlpha = Math.max(0.05, Math.min(1, currentOpacity));
        
        if (this.isImperial) {
          ctx.shadowBlur = 15 + Math.sin(this.pulse) * 5;
          ctx.shadowColor = '#FF6321';
        } else {
          ctx.shadowBlur = 0;
        }

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;
      }
    }

    const drawConnections = () => {
      if (!ctx) return;
      const maxDistance = 150;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            const opacity = (1 - distance / maxDistance) * 0.15;
            ctx.strokeStyle = particles[i].isImperial || particles[j].isImperial 
              ? `rgba(255, 99, 33, ${opacity})` 
              : `rgba(255, 255, 255, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = [];
      const particleCount = Math.min(100, (canvas.width * canvas.height) / 15000);
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawConnections();
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    const handleResize = () => {
      init();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-night">
      {/* Grid Overlay */}
      <div className="absolute inset-0 neural-grid opacity-20" />
      
      {/* Particles Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* Floating Code Snippets */}
      {codeSnippets.map((code, i) => (
        <motion.div
          key={i}
          initial={{ 
            x: Math.random() * 100 + '%', 
            y: Math.random() * 100 + '%', 
            opacity: 0 
          }}
          animate={{ 
            y: [null, (Math.random() * 100 - 50) + '%'],
            opacity: [0, 0.15, 0],
          }}
          transition={{ 
            duration: Math.random() * 20 + 20, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="absolute font-mono text-[10px] md:text-xs text-imperial whitespace-nowrap select-none"
        >
          {code}
        </motion.div>
      ))}

      {/* Gradient Vignette */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-night/50 to-night pointer-events-none" />
    </div>
  );
}
