import type { Project, ProjectFilters, ProjectStats, ProjectStatus } from '../types/project';
import { isOverdue } from './formatDate';

export function computeProjectStats(projects: Project[]): ProjectStats {
  return projects.reduce(
    (acc, p) => {
      acc.total += 1;
      if (p.status === 'completed') acc.completed += 1;
      else if (p.status === 'active' || p.status === 'planning') acc.active += 1;
      if (isOverdue(p.dueDate, p.status) || p.status === 'overdue') acc.overdue += 1;
      return acc;
    },
    { total: 0, active: 0, completed: 0, overdue: 0 },
  );
}

export function filterProjects(projects: Project[], filters: ProjectFilters): Project[] {
  return projects.filter((p) => {
    if (filters.search) {
      const q = filters.search.toLowerCase();
      const match =
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q));
      if (!match) return false;
    }
    if (filters.status !== 'all' && p.status !== filters.status) return false;
    if (filters.priority !== 'all' && p.priority !== filters.priority) return false;
    if (filters.category !== 'all' && p.category !== filters.category) return false;
    if (filters.teamMemberId !== 'all' && !p.teamMemberIds.includes(filters.teamMemberId)) {
      return false;
    }
    return true;
  });
}

export function resolveStatus(project: Project): ProjectStatus {
  if (project.status === 'completed') return 'completed';
  if (isOverdue(project.dueDate, project.status)) return 'overdue';
  return project.status;
}

export const COVER_COLORS = [
  '#6366f1',
  '#8b5cf6',
  '#3b82f6',
  '#06b6d4',
  '#10b981',
  '#f59e0b',
  '#ec4899',
  '#ef4444',
];

export const PRIORITY_CONFIG = {
  low: { label: 'Low', className: 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300' },
  medium: { label: 'Medium', className: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300' },
  high: { label: 'High', className: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300' },
  urgent: { label: 'Urgent', className: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300' },
};

export const STATUS_CONFIG: Record<ProjectStatus, { label: string; className: string }> = {
  active: { label: 'Active', className: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300' },
  completed: { label: 'Completed', className: 'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300' },
  'on-hold': { label: 'On Hold', className: 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300' },
  planning: { label: 'Planning', className: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300' },
  overdue: { label: 'Overdue', className: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300' },
};
