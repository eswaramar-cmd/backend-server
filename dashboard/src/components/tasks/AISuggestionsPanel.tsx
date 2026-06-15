import { motion } from 'framer-motion';
import { HiOutlineLightningBolt } from 'react-icons/hi';
import type { AISuggestion } from '../../utils/taskHelpers';
import GlassCard from '../ui/GlassCard';

interface AISuggestionsPanelProps {
  suggestions: AISuggestion[];
}

const TYPE_STYLES = {
  overdue: 'border-l-red-500 bg-red-50/50 dark:bg-red-950/20',
  priority: 'border-l-amber-500 bg-amber-50/50 dark:bg-amber-950/20',
  inactive: 'border-l-slate-400 bg-slate-50/50 dark:bg-slate-800/50',
};

export default function AISuggestionsPanel({ suggestions }: AISuggestionsPanelProps) {
  return (
    <GlassCard delay={0.1} className="h-full">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 text-white">
          <HiOutlineLightningBolt className="h-5 w-5" />
        </div>
        <div>
          <h3 className="font-semibold text-slate-900 dark:text-white">AI Suggestions</h3>
          <p className="text-xs text-slate-500">Smart insights for your day</p>
        </div>
      </div>

      <div className="space-y-3">
        {suggestions.length === 0 ? (
          <p className="rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
            You&apos;re all caught up. Great work!
          </p>
        ) : (
          suggestions.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className={`rounded-xl border-l-4 px-4 py-3 ${TYPE_STYLES[s.type]}`}
            >
              <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                {s.icon} {s.label}
              </p>
              <p className="mt-1 text-sm font-medium text-slate-800 dark:text-slate-200">
                {s.message}
              </p>
            </motion.div>
          ))
        )}
      </div>
    </GlassCard>
  );
}
