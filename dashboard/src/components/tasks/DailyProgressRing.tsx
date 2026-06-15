import { motion } from 'framer-motion';
import GlassCard from '../ui/GlassCard';

interface DailyProgressRingProps {
  percent: number;
}

export default function DailyProgressRing({ percent }: DailyProgressRingProps) {
  const size = 140;
  const stroke = 10;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <GlassCard delay={0.12} className="flex flex-col items-center justify-center text-center">
      <h3 className="mb-4 w-full text-left font-semibold text-slate-900 dark:text-white">
        Today&apos;s Progress
      </h3>
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={stroke}
            className="text-slate-200 dark:text-slate-700"
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="url(#progressGradient)"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />
          <defs>
            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="50%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            key={percent}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-3xl font-bold text-slate-900 dark:text-white"
          >
            {percent}%
          </motion.span>
          <span className="text-xs text-slate-500">complete</span>
        </div>
      </div>
      <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
        Keep going — you&apos;re crushing it today.
      </p>
    </GlassCard>
  );
}
