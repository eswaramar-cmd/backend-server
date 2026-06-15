import React from 'react';
import { motion } from 'framer-motion';

export const GlassCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    whileHover={{ y: -4, transition: { duration: 0.2 } }}
    className={`
      relative
      bg-white/[0.04]
      backdrop-blur-3xl
      border border-white/[0.06]
      rounded-[24px]
      p-6
      shadow-[0_8px_40px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.05)]
      hover:border-blue-500/30
      hover:shadow-[0_12px_48px_rgba(0,0,0,0.55),0_0_20px_rgba(59,130,246,0.08),inset_0_1px_0_rgba(255,255,255,0.06)]
      transition-all duration-500
      ${className}
    `}
    style={{
      backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 50%, rgba(255,255,255,0.02) 100%)',
    }}
  >
    <div
      className="absolute inset-0 rounded-[24px] pointer-events-none opacity-40"
      style={{
        background: 'linear-gradient(180deg, rgba(255,255,255,0.04) 0%, transparent 50%)',
      }}
    />
    {children}
  </motion.div>
);
