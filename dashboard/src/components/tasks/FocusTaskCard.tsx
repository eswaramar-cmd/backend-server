import { motion } from 'framer-motion';
import { HiOutlinePlay, HiOutlineSparkles } from 'react-icons/hi';
import type { WorkspaceTask } from '../../types/task';
import { formatTimeRemaining, PRIORITY_STYLES } from '../../utils/taskHelpers';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

interface FocusTaskCardProps {
  task: WorkspaceTask;
  onContinue: () => void;
}

export default function FocusTaskCard({ task, onContinue }: FocusTaskCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative overflow-hidden rounded-2xl border border-violet-200/60 bg-gradient-to-br from-indigo-600 via-violet-600 to-blue-600 p-6 text-white shadow-2xl shadow-violet-500/30 dark:border-violet-500/30"
    >
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-blue-400/20 blur-3xl" />

      <div className="relative">
        <div className="mb-4 flex items-center gap-2 text-violet-200">
          <HiOutlineSparkles className="h-5 w-5" />
          <span className="text-sm font-semibold uppercase tracking-wider">Today&apos;s Main Focus</span>
        </div>

        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{task.title}</h2>
        {task.projectName && (
          <p className="mt-1 text-sm text-violet-200">{task.projectName}</p>
        )}

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Badge className={PRIORITY_STYLES[task.priority]}>{task.priority}</Badge>
          <span className="text-sm text-violet-100">
            {formatTimeRemaining(task.timeRemainingMinutes)} remaining
          </span>
        </div>

        <div className="mt-6">
          <div className="mb-2 flex justify-between text-sm">
            <span className="text-violet-200">Progress</span>
            <span className="font-bold">{task.progress}%</span>
          </div>
          <div className="h-2.5 overflow-hidden rounded-full bg-white/20">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${task.progress}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="h-full rounded-full bg-white shadow-lg"
            />
          </div>
        </div>

        <div className="mt-2 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

        <Button
          onClick={onContinue}
          className="mt-6 w-full border-0 bg-white text-violet-700 shadow-xl hover:bg-violet-50 sm:w-auto"
        >
          <HiOutlinePlay className="h-5 w-5" />
          Continue Working
        </Button>
      </div>
    </motion.div>
  );
}
