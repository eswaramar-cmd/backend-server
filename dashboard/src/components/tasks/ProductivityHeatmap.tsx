import { motion } from 'framer-motion';
import { useMemo } from 'react';
import type { HeatmapDay } from '../../types/task';
import GlassCard from '../ui/GlassCard';
import { cn } from '../../utils/cn';

interface ProductivityHeatmapProps {
  data: HeatmapDay[];
}

const LEVELS = [
  'bg-slate-100 dark:bg-slate-800',
  'bg-violet-200 dark:bg-violet-900',
  'bg-violet-400 dark:bg-violet-700',
  'bg-violet-600 dark:bg-violet-500',
  'bg-indigo-600 dark:bg-indigo-400',
];

function getLevel(count: number): number {
  if (count === 0) return 0;
  if (count === 1) return 1;
  if (count === 2) return 2;
  if (count <= 4) return 3;
  return 4;
}

export default function ProductivityHeatmap({ data }: ProductivityHeatmapProps) {
  const weeks = useMemo(() => {
    const result: HeatmapDay[][] = [];
    for (let i = 0; i < data.length; i += 7) {
      result.push(data.slice(i, i + 7));
    }
    return result;
  }, [data]);

  return (
    <GlassCard delay={0.15}>
      <h3 className="mb-1 font-semibold text-slate-900 dark:text-white">Productivity Heatmap</h3>
      <p className="mb-4 text-xs text-slate-500">Your activity over the last 12 weeks</p>

      <div className="overflow-x-auto pb-2">
        <div className="flex gap-1 min-w-max">
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-1">
              {week.map((day) => (
                <motion.div
                  key={day.date}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: wi * 0.02 }}
                  title={`${day.date}: ${day.count} tasks`}
                  className={cn(
                    'h-3 w-3 rounded-sm transition hover:ring-2 hover:ring-violet-400 sm:h-3.5 sm:w-3.5',
                    LEVELS[getLevel(day.count)],
                  )}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3 flex items-center justify-end gap-1 text-xs text-slate-500">
        <span>Less</span>
        {LEVELS.map((l, i) => (
          <div key={i} className={cn('h-3 w-3 rounded-sm', l)} />
        ))}
        <span>More</span>
      </div>
    </GlassCard>
  );
}
