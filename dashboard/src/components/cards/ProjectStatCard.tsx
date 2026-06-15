import { motion } from 'framer-motion';
import type { IconType } from 'react-icons';
import GlassCard from '../ui/GlassCard';

interface ProjectStatCardProps {
  label: string;
  value: number;
  icon: IconType;
  gradient: string;
  index?: number;
}

export default function ProjectStatCard({
  label,
  value,
  icon: Icon,
  gradient,
  index = 0,
}: ProjectStatCardProps) {
  return (
    <GlassCard delay={index * 0.08}>
      <div className="flex items-start justify-between">
        <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${gradient} text-white shadow-md`}>
          <Icon className="h-6 w-6" />
        </div>
        <motion.span
          key={value}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-3xl font-bold text-slate-900 dark:text-white"
        >
          {value}
        </motion.span>
      </div>
      <p className="mt-3 text-sm font-medium text-slate-500 dark:text-slate-400">{label}</p>
    </GlassCard>
  );
}
