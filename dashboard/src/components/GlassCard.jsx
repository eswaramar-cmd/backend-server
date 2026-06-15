import { motion } from 'framer-motion';

export default function GlassCard({
  children,
  className = '',
  delay = 0,
  hover = true,
  ...props
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={hover ? { y: -2, transition: { duration: 0.2 } } : undefined}
      className={`
        rounded-2xl border border-white/60 bg-white/70 p-5 shadow-lg shadow-slate-200/50
        backdrop-blur-xl transition-shadow duration-300
        dark:border-slate-700/50 dark:bg-slate-800/60 dark:shadow-slate-900/50
        dark:hover:shadow-violet-500/10
        hover:shadow-xl hover:shadow-violet-200/30
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.div>
  );
}
