import { motion } from 'framer-motion';
import {
  HiOutlineCheckCircle,
  HiOutlineDocumentAdd,
  HiOutlinePlusCircle,
  HiOutlineUserAdd,
} from 'react-icons/hi';
import type { ActivityItem } from '../../types/project';
import { formatDate } from '../../utils/formatDate';

const ICONS = {
  created: HiOutlinePlusCircle,
  task_added: HiOutlineDocumentAdd,
  member_joined: HiOutlineUserAdd,
  task_completed: HiOutlineCheckCircle,
  file_uploaded: HiOutlineDocumentAdd,
};

const COLORS = {
  created: 'from-indigo-500 to-violet-600',
  task_added: 'from-blue-500 to-cyan-500',
  member_joined: 'from-emerald-500 to-teal-500',
  task_completed: 'from-violet-500 to-purple-600',
  file_uploaded: 'from-amber-500 to-orange-500',
};

interface ActivityTimelineProps {
  activities: ActivityItem[];
}

export default function ActivityTimeline({ activities }: ActivityTimelineProps) {
  return (
    <div className="relative space-y-0">
      <div className="absolute left-5 top-2 bottom-2 w-px bg-gradient-to-b from-violet-300 via-indigo-200 to-transparent dark:from-violet-700 dark:via-indigo-800" />
      {activities.map((item, index) => {
        const Icon = ICONS[item.type] ?? HiOutlinePlusCircle;
        const gradient = COLORS[item.type] ?? COLORS.created;
        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.08 }}
            className="relative flex gap-4 pb-8 last:pb-0"
          >
            <div
              className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${gradient} text-white shadow-lg`}
            >
              <Icon className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1 rounded-xl border border-slate-100 bg-slate-50/80 p-4 dark:border-slate-700 dark:bg-slate-800/50">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <h4 className="font-semibold text-slate-900 dark:text-white">{item.title}</h4>
                <time className="text-xs text-slate-400">
                  {formatDate(item.timestamp)}
                </time>
              </div>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{item.description}</p>
              <p className="mt-2 text-xs text-violet-600 dark:text-violet-400">by {item.user}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
