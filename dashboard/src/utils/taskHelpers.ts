import type { TaskFilters, WorkspaceTask } from '../types/task';

export function formatTimeRemaining(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m}m`;
  return `${h}h ${m}m`;
}

export function isOverdue(task: WorkspaceTask): boolean {
  if (task.status === 'done') return false;
  return new Date(task.dueDate) < new Date(new Date().toDateString());
}

export function isInactive(task: WorkspaceTask, days = 7): boolean {
  const last = new Date(task.lastActiveAt);
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - days);
  return last < cutoff && task.status !== 'done';
}

export function getFocusTask(tasks: WorkspaceTask[]): WorkspaceTask | undefined {
  return tasks.find((t) => t.isFocus && t.status !== 'done') ?? tasks.find((t) => t.status === 'in-progress');
}

export interface AISuggestion {
  id: string;
  type: 'overdue' | 'priority' | 'inactive';
  icon: string;
  label: string;
  message: string;
  taskId?: string;
}

export function buildAISuggestions(tasks: WorkspaceTask[]): AISuggestion[] {
  const suggestions: AISuggestion[] = [];

  const overdue = tasks.filter(isOverdue);
  overdue.forEach((t) => {
    suggestions.push({
      id: `overdue-${t.id}`,
      type: 'overdue',
      icon: '⚡',
      label: 'Attention Needed',
      message: `${t.title} is overdue.`,
      taskId: t.id,
    });
  });

  const highPri = tasks.filter(
    (t) => (t.priority === 'urgent' || t.priority === 'high') && t.status !== 'done' && !isOverdue(t),
  );
  highPri.slice(0, 2).forEach((t) => {
    suggestions.push({
      id: `priority-${t.id}`,
      type: 'priority',
      icon: '🔥',
      label: 'High Priority',
      message: `${t.title} before ${new Date(t.dueDate).toLocaleDateString('en-US', { weekday: 'long' })}.`,
      taskId: t.id,
    });
  });

  const inactive = tasks.filter((t) => isInactive(t));
  inactive.slice(0, 1).forEach((t) => {
    suggestions.push({
      id: `inactive-${t.id}`,
      type: 'inactive',
      icon: '💤',
      label: 'Recently Inactive',
      message: `${t.title} hasn't been touched in 7+ days.`,
      taskId: t.id,
    });
  });

  return suggestions.slice(0, 4);
}

export function filterTasks(tasks: WorkspaceTask[], filters: TaskFilters): WorkspaceTask[] {
  return tasks.filter((t) => {
    if (filters.search) {
      const q = filters.search.toLowerCase();
      if (
        !t.title.toLowerCase().includes(q) &&
        !t.tags.some((tag) => tag.toLowerCase().includes(q))
      ) {
        return false;
      }
    }
    if (filters.priority !== 'all' && t.priority !== filters.priority) return false;
    if (filters.tag !== 'all' && !t.tags.includes(filters.tag)) return false;
    if (filters.assigneeId !== 'all' && t.assigneeId !== filters.assigneeId) return false;
    if (filters.dueBefore && new Date(t.dueDate) > new Date(filters.dueBefore)) return false;
    return true;
  });
}

export const PRIORITY_STYLES = {
  low: 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300',
  medium: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  high: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  urgent: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
};

export const TIMELINE_COLORS = {
  design: 'from-violet-500 to-purple-600',
  dev: 'from-blue-500 to-cyan-500',
  test: 'from-emerald-500 to-teal-500',
  deploy: 'from-indigo-500 to-violet-600',
  meeting: 'from-amber-500 to-orange-500',
};
