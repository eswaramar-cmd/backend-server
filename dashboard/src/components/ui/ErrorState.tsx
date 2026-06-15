import { motion } from 'framer-motion';
import { HiOutlineExclamationCircle, HiOutlineRefresh } from 'react-icons/hi';
import Button from './Button';

interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

export default function ErrorState({
  title = 'Something went wrong',
  message,
  onRetry,
}: ErrorStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center rounded-2xl border border-red-200 bg-red-50/80 px-8 py-12 text-center dark:border-red-900/50 dark:bg-red-950/30"
    >
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400">
        <HiOutlineExclamationCircle className="h-8 w-8" />
      </div>
      <h3 className="text-lg font-bold text-slate-900 dark:text-white">{title}</h3>
      <p className="mt-2 max-w-md text-sm text-slate-600 dark:text-slate-400">{message}</p>
      {onRetry && (
        <Button variant="secondary" className="mt-6" onClick={onRetry}>
          <HiOutlineRefresh className="h-4 w-4" />
          Try again
        </Button>
      )}
    </motion.div>
  );
}
