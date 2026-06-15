import { motion } from 'framer-motion';
import { HiOutlineFolderOpen, HiOutlinePlus } from 'react-icons/hi';
import Button from './Button';

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export default function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white/50 px-8 py-16 text-center dark:border-slate-600 dark:bg-slate-800/30"
    >
      <div className="relative mb-6">
        <div className="absolute inset-0 rounded-full bg-violet-400/20 blur-2xl" />
        <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-xl">
          <HiOutlineFolderOpen className="h-10 w-10" />
        </div>
      </div>
      <h3 className="text-xl font-bold text-slate-900 dark:text-white">{title}</h3>
      <p className="mt-2 max-w-sm text-sm text-slate-500 dark:text-slate-400">{description}</p>
      {actionLabel && onAction && (
        <Button className="mt-6" onClick={onAction}>
          <HiOutlinePlus className="h-4 w-4" />
          {actionLabel}
        </Button>
      )}
    </motion.div>
  );
}
