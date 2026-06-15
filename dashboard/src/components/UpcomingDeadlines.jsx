import { HiOutlineCalendar } from 'react-icons/hi';
import GlassCard from './GlassCard';
import { upcomingDeadlines } from '../data/mockData';

const priorityStyles = {
  high: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400',
  medium: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400',
  low: 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300',
};

export default function UpcomingDeadlines({ delay = 0.3 }) {
  return (
    <GlassCard delay={delay}>
      <div className="mb-4 flex items-center gap-2">
        <HiOutlineCalendar className="h-5 w-5 text-violet-600 dark:text-violet-400" />
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Upcoming Deadlines</h3>
      </div>
      <ul className="space-y-3">
        {upcomingDeadlines.map((item) => (
          <li
            key={item.id}
            className="flex items-start justify-between gap-2 rounded-xl border border-slate-100 bg-slate-50/50 p-3 transition hover:border-violet-200 dark:border-slate-700 dark:bg-slate-800/40 dark:hover:border-violet-700/50"
          >
            <div className="min-w-0">
              <p className="truncate font-medium text-slate-900 dark:text-white">{item.title}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{item.project}</p>
            </div>
            <div className="shrink-0 text-right">
              <p className="text-xs font-medium text-slate-600 dark:text-slate-300">{item.date}</p>
              <span className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${priorityStyles[item.priority]}`}>
                {item.priority}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </GlassCard>
  );
}
