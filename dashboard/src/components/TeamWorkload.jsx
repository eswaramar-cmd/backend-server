import { HiOutlineUserGroup } from 'react-icons/hi';
import GlassCard from './GlassCard';
import { teamWorkload } from '../data/mockData';

function CapacityBar({ capacity }) {
  const color =
    capacity >= 90 ? 'bg-red-500' : capacity >= 75 ? 'bg-amber-500' : 'bg-emerald-500';

  return (
    <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
      <div
        className={`h-full rounded-full transition-all duration-500 ${color}`}
        style={{ width: `${capacity}%` }}
      />
    </div>
  );
}

export default function TeamWorkload({ delay = 0.4 }) {
  return (
    <GlassCard delay={delay}>
      <div className="mb-4 flex items-center gap-2">
        <HiOutlineUserGroup className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Team Workload</h3>
      </div>
      <ul className="space-y-4">
        {teamWorkload.map((member) => (
          <li key={member.id}>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-xs font-bold text-white">
                {member.avatar}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate font-medium text-slate-900 dark:text-white">{member.name}</p>
                  <span className="text-xs text-slate-500">{member.tasks} tasks</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">{member.role}</p>
                <CapacityBar capacity={member.capacity} />
              </div>
              <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                {member.capacity}%
              </span>
            </div>
          </li>
        ))}
      </ul>
    </GlassCard>
  );
}
