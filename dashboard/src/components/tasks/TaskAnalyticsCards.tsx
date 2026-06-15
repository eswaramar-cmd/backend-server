import { motion } from 'framer-motion';
import { HiOutlineChartBar, HiOutlineClock, HiOutlineTrendingUp } from 'react-icons/hi';
import GlassCard from '../ui/GlassCard';

interface TaskAnalyticsCardsProps {
  completedThisWeek: number;
  avgCompletionHours: number;
  productivityTrend: string;
}

export default function TaskAnalyticsCards({
  completedThisWeek,
  avgCompletionHours,
  productivityTrend,
}: TaskAnalyticsCardsProps) {
  const cards = [
    {
      label: 'Completed This Week',
      value: String(completedThisWeek),
      sub: 'tasks finished',
      icon: HiOutlineChartBar,
      gradient: 'from-indigo-500 to-violet-600',
    },
    {
      label: 'Avg. Completion Time',
      value: `${avgCompletionHours}h`,
      sub: 'per task',
      icon: HiOutlineClock,
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      label: 'Productivity Trend',
      value: productivityTrend,
      sub: 'vs last week',
      icon: HiOutlineTrendingUp,
      gradient: 'from-emerald-500 to-teal-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {cards.map((card, i) => (
        <GlassCard key={card.label} delay={i * 0.08}>
          <div className="flex items-start justify-between">
            <div
              className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${card.gradient} text-white shadow-md`}
            >
              <card.icon className="h-5 w-5" />
            </div>
            <motion.span
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="text-2xl font-bold text-slate-900 dark:text-white"
            >
              {card.value}
            </motion.span>
          </div>
          <p className="mt-3 text-sm font-medium text-slate-500 dark:text-slate-400">{card.label}</p>
          <p className="text-xs text-slate-400">{card.sub}</p>
        </GlassCard>
      ))}
    </div>
  );
}
