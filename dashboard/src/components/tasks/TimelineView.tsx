import { motion } from 'framer-motion';
import type { TimelineBlock } from '../../types/task';
import { TIMELINE_COLORS } from '../../utils/taskHelpers';
import GlassCard from '../ui/GlassCard';
import { cn } from '../../utils/cn';

interface TimelineViewProps {
  blocks: TimelineBlock[];
}

export default function TimelineView({ blocks }: TimelineViewProps) {
  return (
    <GlassCard delay={0.2}>
      <h3 className="mb-4 font-semibold text-slate-900 dark:text-white">Today&apos;s Timeline</h3>
      <div className="relative space-y-0 pl-4">
        <div className="absolute bottom-2 left-[7px] top-2 w-0.5 bg-gradient-to-b from-violet-400 via-indigo-300 to-transparent dark:from-violet-600" />
        {blocks.map((block, i) => (
          <motion.div
            key={block.id}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="relative flex gap-4 pb-6 last:pb-0"
          >
            <div
              className={cn(
                'relative z-10 mt-1 h-4 w-4 shrink-0 rounded-full bg-gradient-to-br ring-4 ring-white dark:ring-slate-800',
                TIMELINE_COLORS[block.type],
              )}
            />
            <div className="flex min-w-0 flex-1 items-baseline justify-between gap-2 rounded-xl border border-slate-100 bg-slate-50/80 px-4 py-3 dark:border-slate-700 dark:bg-slate-800/40">
              <span className="font-medium text-slate-900 dark:text-white">{block.title}</span>
              <span className="shrink-0 text-sm font-semibold text-violet-600 dark:text-violet-400">
                {block.time}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </GlassCard>
  );
}
