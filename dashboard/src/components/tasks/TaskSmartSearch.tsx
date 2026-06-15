import { motion } from 'framer-motion';
import { HiOutlineSearch, HiOutlineX } from 'react-icons/hi';
import { TEAM_MEMBERS } from '../../data/teamMembers';
import type { TaskFilters } from '../../types/task';
import Button from '../ui/Button';

interface TaskSmartSearchProps {
  filters: TaskFilters;
  allTags: string[];
  onChange: <K extends keyof TaskFilters>(key: K, value: TaskFilters[K]) => void;
  onReset: () => void;
  hasActive: boolean;
}

const selectClass =
  'rounded-xl border border-slate-200 bg-white/90 px-3 py-2 text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-slate-600 dark:bg-slate-900 dark:text-white';

export default function TaskSmartSearch({
  filters,
  allTags,
  onChange,
  onReset,
  hasActive,
}: TaskSmartSearchProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-slate-200/80 bg-white/70 p-4 shadow-sm backdrop-blur-xl dark:border-slate-700 dark:bg-slate-800/70"
    >
      <div className="relative mb-3">
        <HiOutlineSearch className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-violet-500" />
        <input
          type="search"
          placeholder="Smart search — title, tags..."
          value={filters.search}
          onChange={(e) => onChange('search', e.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
        />
      </div>
      <div className="flex flex-wrap gap-2">
        <select
          value={filters.priority}
          onChange={(e) => onChange('priority', e.target.value as TaskFilters['priority'])}
          className={selectClass}
          aria-label="Priority"
        >
          <option value="all">All Priority</option>
          <option value="urgent">Urgent</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <select
          value={filters.tag}
          onChange={(e) => onChange('tag', e.target.value)}
          className={selectClass}
          aria-label="Tags"
        >
          <option value="all">All Tags</option>
          {allTags.map((tag) => (
            <option key={tag} value={tag}>
              #{tag}
            </option>
          ))}
        </select>
        <select
          value={filters.assigneeId}
          onChange={(e) => onChange('assigneeId', e.target.value)}
          className={selectClass}
          aria-label="Team member"
        >
          <option value="all">All Members</option>
          {TEAM_MEMBERS.map((m) => (
            <option key={m.id} value={m.id}>
              {m.name}
            </option>
          ))}
        </select>
        <input
          type="date"
          value={filters.dueBefore}
          onChange={(e) => onChange('dueBefore', e.target.value)}
          className={selectClass}
          aria-label="Due before"
          title="Due before"
        />
        {hasActive && (
          <Button variant="ghost" size="sm" onClick={onReset}>
            <HiOutlineX className="h-4 w-4" />
            Clear
          </Button>
        )}
      </div>
    </motion.div>
  );
}
