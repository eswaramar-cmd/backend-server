import {
  HiOutlineCheckCircle,
  HiOutlineClipboardList,
  HiOutlineClock,
  HiOutlineFolder,
  HiOutlineUserGroup,
} from 'react-icons/hi';
import GlassCard from './GlassCard';

const icons = {
  projects: HiOutlineFolder,
  tasks: HiOutlineClipboardList,
  completed: HiOutlineCheckCircle,
  pending: HiOutlineClock,
  team: HiOutlineUserGroup,
};

export default function StatCard({ stat, index }) {
  const Icon = icons[stat.icon] || HiOutlineFolder;

  return (
    <GlassCard delay={index * 0.08} className="flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${stat.color} text-white shadow-md`}
        >
          <Icon className="h-5 w-5" />
        </div>
        <span
          className={`rounded-full px-2 py-0.5 text-xs font-medium ${
            stat.trend === 'up'
              ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400'
              : 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400'
          }`}
        >
          {stat.change}
        </span>
      </div>
      <div>
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{stat.label}</p>
        <p className="mt-0.5 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          {stat.value}
        </p>
      </div>
    </GlassCard>
  );
}
