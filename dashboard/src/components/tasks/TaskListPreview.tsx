import { motion } from 'framer-motion';
import type { WorkspaceTask } from '../../types/task';
import { formatTimeRemaining, PRIORITY_STYLES } from '../../utils/taskHelpers';
import Badge from '../ui/Badge';
import { cn } from '../../utils/cn';

interface TaskListPreviewProps {
  tasks: WorkspaceTask[];
  onSelectFocus: (id: string) => void;
}

export default function TaskListPreview({ tasks, onSelectFocus }: TaskListPreviewProps) {
  if (tasks.length === 0) return null;

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400">Filtered Tasks</h3>
      {tasks.slice(0, 5).map((task, i) => (
        <motion.button
          key={task.id}
          type="button"
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.05 }}
          onClick={() => onSelectFocus(task.id)}
          className={cn(
            'flex w-full items-center justify-between rounded-xl border border-slate-200/80 bg-white/80 px-4 py-3 text-left transition hover:border-violet-300 hover:shadow-md dark:border-slate-700 dark:bg-slate-800/80',
            task.isFocus && 'ring-2 ring-violet-500/50',
          )}
        >
          <div className="min-w-0">
            <p className="truncate font-medium text-slate-900 dark:text-white">{task.title}</p>
            <p className="text-xs text-slate-500">{formatTimeRemaining(task.timeRemainingMinutes)} · {task.progress}%</p>
          </div>
          <Badge className={PRIORITY_STYLES[task.priority]}>{task.priority}</Badge>
        </motion.button>
      ))}
    </div>
  );
}
