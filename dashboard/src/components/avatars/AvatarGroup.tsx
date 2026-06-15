import { cn } from '../../utils/cn';
import type { TeamMember } from '../../types/project';

interface AvatarGroupProps {
  members: TeamMember[];
  max?: number;
  size?: 'sm' | 'md';
}

export default function AvatarGroup({ members, max = 4, size = 'sm' }: AvatarGroupProps) {
  const visible = members.slice(0, max);
  const overflow = members.length - max;
  const sizeClass = size === 'sm' ? 'h-8 w-8 text-xs' : 'h-10 w-10 text-sm';

  return (
    <div className="flex -space-x-2">
      {visible.map((m) => (
        <div
          key={m.id}
          title={m.name}
          className={cn(
            'flex items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 font-bold text-white ring-2 ring-white dark:ring-slate-800',
            sizeClass,
          )}
        >
          {m.avatar}
        </div>
      ))}
      {overflow > 0 && (
        <div
          className={cn(
            'flex items-center justify-center rounded-full bg-slate-200 font-semibold text-slate-600 ring-2 ring-white dark:bg-slate-700 dark:text-slate-300 dark:ring-slate-800',
            sizeClass,
          )}
        >
          +{overflow}
        </div>
      )}
    </div>
  );
}
