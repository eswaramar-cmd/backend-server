import { motion } from 'framer-motion';
import { Calendar } from '@/components/ui/calendar';

export default function CalendarPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mx-auto max-w-[1600px] space-y-6"
    >
      <div className="mb-2">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Calendar & Scheduling
        </h2>
        <p className="text-slate-500 dark:text-slate-400">
          Book meetings, view your schedule, and manage design questions.
        </p>
      </div>

      <div className="w-full">
        <Calendar />
      </div>
    </motion.div>
  );
}
