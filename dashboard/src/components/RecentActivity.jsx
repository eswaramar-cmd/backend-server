import { HiOutlineLightningBolt } from 'react-icons/hi';
import GlassCard from './GlassCard';
import { recentActivity } from '../data/mockData';

export default function RecentActivity({ delay = 0.35 }) {
  return (
    <GlassCard delay={delay}>
      <div className="mb-4 flex items-center gap-2">
        <HiOutlineLightningBolt className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Recent Activity</h3>
      </div>
      <ul className="space-y-4">
        {recentActivity.map((item) => (
          <li key={item.id} className="flex gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-blue-500 text-xs font-bold text-white">
              {item.avatar}
            </div>
            <div className="min-w-0 flex-1 border-b border-slate-100 pb-4 last:border-0 last:pb-0 dark:border-slate-700/50">
              <p className="text-sm text-slate-700 dark:text-slate-200">
                <span className="font-semibold text-slate-900 dark:text-white">{item.user}</span>{' '}
                {item.action}{' '}
                <span className="font-medium text-violet-600 dark:text-violet-400">{item.target}</span>
              </p>
              <p className="mt-0.5 text-xs text-slate-400">{item.time}</p>
            </div>
          </li>
        ))}
      </ul>
    </GlassCard>
  );
}
