import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

export default function Placeholder() {
  const { pathname } = useLocation();
  const title = pathname.slice(1).replace(/-/g, ' ') || 'page';

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex min-h-[50vh] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white/50 p-12 text-center dark:border-slate-700 dark:bg-slate-800/30"
    >
      <p className="text-lg font-semibold capitalize text-slate-700 dark:text-slate-200">{title}</p>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
        Coming soon. Projects module is fully built.
      </p>
    </motion.div>
  );
}
