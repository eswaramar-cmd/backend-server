import { useMemo, useState } from 'react';
import { filterTasks } from '../utils/taskHelpers';
import type { TaskFilters, WorkspaceTask } from '../types/task';

const DEFAULT: TaskFilters = {
  search: '',
  priority: 'all',
  tag: 'all',
  assigneeId: 'all',
  dueBefore: '',
};

export function useTaskFilters(tasks: WorkspaceTask[]) {
  const [filters, setFilters] = useState<TaskFilters>(DEFAULT);

  const filtered = useMemo(() => filterTasks(tasks, filters), [tasks, filters]);

  const allTags = useMemo(() => {
    const set = new Set<string>();
    tasks.forEach((t) => t.tags.forEach((tag) => set.add(tag)));
    return Array.from(set).sort();
  }, [tasks]);

  const updateFilter = <K extends keyof TaskFilters>(key: K, value: TaskFilters[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => setFilters(DEFAULT);

  const hasActive =
    filters.search !== '' ||
    filters.priority !== 'all' ||
    filters.tag !== 'all' ||
    filters.assigneeId !== 'all' ||
    filters.dueBefore !== '';

  return { filters, filtered, allTags, updateFilter, resetFilters, hasActive };
}
