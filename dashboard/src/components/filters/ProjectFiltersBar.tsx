import { motion } from 'framer-motion';
import { HiOutlineSearch, HiOutlineX } from 'react-icons/hi';
import { TEAM_MEMBERS } from '../../data/teamMembers';
import type { ProjectFilters } from '../../types/project';
import Button from '../ui/Button';

interface ProjectFiltersBarProps {
  filters: ProjectFilters;
  onChange: <K extends keyof ProjectFilters>(key: K, value: ProjectFilters[K]) => void;
  onReset: () => void;
  hasActiveFilters: boolean;
}

const selectClass =
  'rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-slate-600 dark:bg-slate-800 dark:text-white';

export default function ProjectFiltersBar({
  filters,
  onChange,
  onReset,
  hasActiveFilters,
}: ProjectFiltersBarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-4 rounded-2xl border border-slate-200/80 bg-white/80 p-4 shadow-sm backdrop-blur-sm dark:border-slate-700 dark:bg-slate-800/80 lg:flex-row lg:items-center"
    >
      <div className="relative min-w-0 flex-1">
        <HiOutlineSearch className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
        <input
          type="search"
          placeholder="Search projects..."
          value={filters.search}
          onChange={(e) => onChange('search', e.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <select
          value={filters.status}
          onChange={(e) => onChange('status', e.target.value as ProjectFilters['status'])}
          className={selectClass}
          aria-label="Filter by status"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
          <option value="planning">Planning</option>
          <option value="overdue">Overdue</option>
          <option value="on-hold">On Hold</option>
        </select>

        <select
          value={filters.priority}
          onChange={(e) => onChange('priority', e.target.value as ProjectFilters['priority'])}
          className={selectClass}
          aria-label="Filter by priority"
        >
          <option value="all">All Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
          <option value="urgent">Urgent</option>
        </select>

        <select
          value={filters.category}
          onChange={(e) => onChange('category', e.target.value as ProjectFilters['category'])}
          className={selectClass}
          aria-label="Filter by category"
        >
          <option value="all">All Categories</option>
          <option value="engineering">Engineering</option>
          <option value="design">Design</option>
          <option value="marketing">Marketing</option>
          <option value="operations">Operations</option>
          <option value="product">Product</option>
        </select>

        <select
          value={filters.teamMemberId}
          onChange={(e) => onChange('teamMemberId', e.target.value)}
          className={selectClass}
          aria-label="Filter by team member"
        >
          <option value="all">All Members</option>
          {TEAM_MEMBERS.map((m) => (
            <option key={m.id} value={m.id}>
              {m.name}
            </option>
          ))}
        </select>

        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={onReset}>
            <HiOutlineX className="h-4 w-4" />
            Clear
          </Button>
        )}
      </div>
    </motion.div>
  );
}
