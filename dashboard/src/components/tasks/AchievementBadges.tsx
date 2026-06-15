import { motion } from 'framer-motion';
import type { Achievement } from '../../types/task';
import GlassCard from '../ui/GlassCard';
import { cn } from '../../utils/cn';

interface AchievementBadgesProps {
  achievements: Achievement[];
}

export default function AchievementBadges({ achievements }: AchievementBadgesProps) {
  return (
    <GlassCard delay={0.18}>
      <h3 className="mb-4 font-semibold text-slate-900 dark:text-white">Achievements</h3>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {achievements.map((a, i) => (
          <motion.div
            key={a.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.06 }}
            whileHover={{ scale: a.unlocked ? 1.05 : 1 }}
            className={cn(
              'rounded-xl border p-3 text-center transition',
              a.unlocked
                ? 'border-violet-200 bg-gradient-to-br from-violet-50 to-indigo-50 dark:border-violet-800 dark:from-violet-950/50 dark:to-indigo-950/50'
                : 'border-slate-200 bg-slate-50 opacity-60 grayscale dark:border-slate-700 dark:bg-slate-800/50',
            )}
          >
            <span className="text-2xl">{a.icon}</span>
            <p className="mt-1 text-xs font-bold text-slate-900 dark:text-white">{a.title}</p>
            <p className="mt-0.5 text-[10px] text-slate-500 line-clamp-2">{a.description}</p>
          </motion.div>
        ))}
      </div>
    </GlassCard>
  );
}
