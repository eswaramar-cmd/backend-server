import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  id: number;
  left: string;
  top: string;
  delay: number;
  duration: number;
  size: number;
}

export const Background = () => {
  const particles = useMemo<Particle[]>(() => [
    { id: 1, left: '5%', top: '15%', delay: 0, duration: 8, size: 2 },
    { id: 2, left: '92%', top: '20%', delay: 2, duration: 12, size: 3 },
    { id: 3, left: '70%', top: '8%', delay: 1, duration: 10, size: 2 },
    { id: 4, left: '25%', top: '75%', delay: 3, duration: 14, size: 3 },
    { id: 5, left: '10%', top: '60%', delay: 4, duration: 9, size: 2 },
    { id: 6, left: '85%', top: '45%', delay: 2.5, duration: 11, size: 2 },
    { id: 7, left: '55%', top: '5%', delay: 1.5, duration: 13, size: 3 },
    { id: 8, left: '40%', top: '85%', delay: 3.5, duration: 10, size: 2 },
    { id: 9, left: '80%', top: '70%', delay: 0.5, duration: 15, size: 3 },
    { id: 10, left: '15%', top: '40%', delay: 4.5, duration: 12, size: 2 },
    { id: 11, left: '65%', top: '90%', delay: 1, duration: 11, size: 2 },
    { id: 12, left: '88%', top: '88%', delay: 3, duration: 9, size: 3 },
    { id: 13, left: '30%', top: '30%', delay: 2, duration: 14, size: 2 },
    { id: 14, left: '95%', top: '55%', delay: 0, duration: 10, size: 2 },
    { id: 15, left: '8%', top: '95%', delay: 5, duration: 8, size: 2 },
  ], []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden" style={{ backgroundColor: '#030712' }}>
      {/* Base Radial Gradients from Design Spec */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 20% 20%, rgba(59,130,246,0.35), transparent 40%),
            radial-gradient(circle at 80% 30%, rgba(6,182,212,0.25), transparent 40%),
            radial-gradient(circle at 50% 80%, rgba(99,102,241,0.25), transparent 50%),
            radial-gradient(circle at 10% 90%, rgba(37,99,235,0.15), transparent 40%)
          `
        }}
      />

      {/* Deep Base Gradient */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at top, rgba(59,130,246,0.08), transparent 60%),
            radial-gradient(ellipse at bottom, rgba(99,102,241,0.06), transparent 60%),
            radial-gradient(ellipse at left, rgba(6,182,212,0.04), transparent 60%)
          `
        }}
      />

      {/* Animated Moving Gradient Blobs */}
      <motion.div
        animate={{
          x: ['-5%', '5%', '-5%'],
          y: ['-5%', '5%', '-5%'],
          scale: [1, 1.3, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        className="absolute top-[-20%] left-[-10%]"
        style={{
          width: '700px',
          height: '700px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(59,130,246,0.15), transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      <motion.div
        animate={{
          x: ['5%', '-5%', '5%'],
          y: ['8%', '-8%', '8%'],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        className="absolute top-[10%] right-[-15%]"
        style={{
          width: '800px',
          height: '800px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(6,182,212,0.12), transparent 70%)',
          filter: 'blur(100px)',
        }}
      />

      <motion.div
        animate={{
          x: ['-3%', '3%', '-3%'],
          y: ['-8%', '8%', '-8%'],
          scale: [1, 1.15, 1],
        }}
        transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
        className="absolute bottom-[-15%] left-[20%]"
        style={{
          width: '900px',
          height: '900px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99,102,241,0.1), transparent 70%)',
          filter: 'blur(120px)',
        }}
      />

      <motion.div
        animate={{
          x: ['4%', '-4%', '4%'],
          y: ['-3%', '3%', '-3%'],
          scale: [1, 1.25, 1],
        }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
        className="absolute top-[40%] left-[50%]"
        style={{
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(37,99,235,0.08), transparent 70%)',
          filter: 'blur(90px)',
        }}
      />

      {/* Animated Light Streaks */}
      <motion.div
        animate={{
          opacity: [0.02, 0.06, 0.02],
          x: ['-10%', '110%'],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="absolute top-0 left-0 w-full h-1"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(59,130,246,0.4) 30%, rgba(6,182,212,0.4) 50%, transparent 100%)',
          filter: 'blur(1px)',
        }}
      />

      <motion.div
        animate={{
          opacity: [0.015, 0.05, 0.015],
          x: ['-20%', '120%'],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear', delay: 5 }}
        className="absolute top-[30%] left-0 w-full h-0.5"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(99,102,241,0.3) 25%, rgba(37,99,235,0.3) 75%, transparent 100%)',
          filter: 'blur(2px)',
        }}
      />

      <motion.div
        animate={{
          opacity: [0.01, 0.04, 0.01],
          x: ['-5%', '105%'],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear', delay: 10 }}
        className="absolute top-[70%] left-0 w-3/4 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(6,182,212,0.3) 40%, rgba(59,130,246,0.3) 60%, transparent 100%)',
          filter: 'blur(1px)',
        }}
      />

      {/* Horizontal Glow Streaks */}
      <div className="absolute top-[15%] left-[10%] w-[30%] h-[1px]" 
        style={{ background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.2), transparent)', filter: 'blur(1px)' }} />
      <div className="absolute top-[55%] left-[40%] w-[25%] h-[1px]"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(6,182,212,0.15), transparent)', filter: 'blur(1px)' }} />
      <div className="absolute top-[80%] left-[20%] w-[35%] h-[1px]"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.2), transparent)', filter: 'blur(1px)' }} />

      {/* Vertical Glow Streaks */}
      <div className="absolute top-[10%] left-[15%] w-[1px] h-[30%]"
        style={{ background: 'linear-gradient(180deg, transparent, rgba(37,99,235,0.15), transparent)', filter: 'blur(1px)' }} />
      <div className="absolute top-[40%] right-[20%] w-[1px] h-[25%]"
        style={{ background: 'linear-gradient(180deg, transparent, rgba(6,182,212,0.12), transparent)', filter: 'blur(1px)' }} />

      {/* Grid Overlay */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 70%)',
        }}
      />

      {/* Fine Grid Lines */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)
          `,
          backgroundSize: '120px 120px',
          maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 20%, transparent 70%)',
        }}
      />

      {/* Floating Glowing Particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          animate={{
            y: [0, -40, 0, 30, 0],
            opacity: [0, 0.6, 0.2, 0.6, 0],
            scale: [1, 1.5, 0.8, 1.3, 1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: p.delay,
          }}
          className="absolute rounded-full"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            background: 'radial-gradient(circle, rgba(147,197,253,0.9), rgba(59,130,246,0.4), transparent)',
            boxShadow: `0 0 ${p.size * 3}px rgba(59,130,246,0.4), 0 0 ${p.size * 6}px rgba(6,182,212,0.2)`,
          }}
        />
      ))}

      {/* Larger Ambient Glow Particles */}
      {[
        { id: 101, left: '12%', top: '25%', delay: 0, size: 4 },
        { id: 102, left: '78%', top: '15%', delay: 2, size: 5 },
        { id: 103, left: '45%', top: '70%', delay: 4, size: 3 },
        { id: 104, left: '88%', top: '60%', delay: 1, size: 4 },
        { id: 105, left: '22%', top: '80%', delay: 3, size: 3 },
      ].map((p) => (
        <motion.div
          key={p.id}
          animate={{
            y: [0, -30, 0, -20, 0],
            opacity: [0.05, 0.2, 0.08, 0.18, 0.05],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: p.delay,
          }}
          className="absolute rounded-full"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            background: 'rgba(255,255,255,0.8)',
            boxShadow: `0 0 ${p.size * 2}px rgba(255,255,255,0.3), 0 0 ${p.size * 4}px rgba(59,130,246,0.15)`,
          }}
        />
      ))}

      {/* Diagonal Light Rays */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            rotate: [0, 360],
            opacity: [0.01, 0.03, 0.01],
          }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[1px]"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(147,197,253,0.15), transparent)',
            filter: 'blur(2px)',
            transformOrigin: 'center',
          }}
        />
      </div>

      {/* Soft Surface Texture */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 30% 20%, rgba(59,130,246,0.03), transparent 40%),
            radial-gradient(circle at 70% 60%, rgba(6,182,212,0.02), transparent 40%),
            radial-gradient(circle at 50% 50%, rgba(99,102,241,0.02), transparent 50%)
          `,
        }}
      />

      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03]" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          mixBlendMode: 'overlay',
          pointerEvents: 'none',
        }}
      />

      {/* Vignette Effect */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(3,7,18,0.6) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Ambient Corner Glow */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px]"
        style={{
          background: 'radial-gradient(circle at 0% 0%, rgba(59,130,246,0.06), transparent 60%)',
          filter: 'blur(60px)',
        }}
      />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px]"
        style={{
          background: 'radial-gradient(circle at 100% 100%, rgba(99,102,241,0.05), transparent 60%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Parallax Depth Layers */}
      <motion.div
        animate={{
          y: [0, -10, 0, 10, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 80% 20%, rgba(59,130,246,0.08), transparent 30%)',
          pointerEvents: 'none',
        }}
      />

      <motion.div
        animate={{
          y: [0, 8, 0, -8, 0],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 20% 70%, rgba(6,182,212,0.06), transparent 35%)',
          pointerEvents: 'none',
        }}
      />

      {/* Soft Orbs */}
      <motion.div
        animate={{
          x: ['0%', '8%', '0%', '-8%', '0%'],
          y: ['0%', '-5%', '0%', '5%', '0%'],
        }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        className="absolute top-[25%] left-[30%] w-[300px] h-[300px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      />

      <motion.div
        animate={{
          x: ['0%', '-6%', '0%', '6%', '0%'],
          y: ['0%', '4%', '0%', '-4%', '0%'],
        }}
        transition={{ duration: 45, repeat: Infinity, ease: 'linear', delay: 2 }}
        className="absolute bottom-[30%] right-[25%] w-[350px] h-[350px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(6,182,212,0.05) 0%, transparent 70%)',
          filter: 'blur(55px)',
        }}
      />
    </div>
  );
};
