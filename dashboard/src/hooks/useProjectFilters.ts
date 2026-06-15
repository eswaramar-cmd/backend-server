import { useMemo, useState } from 'react';
import { filterProjects } from '../utils/projectHelpers';
import type { Project, ProjectFilters } from '../types/project';

const DEFAULT_FILTERS: ProjectFilters = {
  search: '',
  status: 'all',
  priority: 'all',
  category: 'all',
  teamMemberId: 'all',
};

export function useProjectFilters(projects: Project[]) {
  const [filters, setFilters] = useState<ProjectFilters>(DEFAULT_FILTERS);

  const filtered = useMemo(() => filterProjects(projects, filters), [projects, filters]);

  const updateFilter = <K extends keyof ProjectFilters>(key: K, value: ProjectFilters[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => setFilters(DEFAULT_FILTERS);

  const hasActiveFilters =
    filters.search !== '' ||
    filters.status !== 'all' ||
    filters.priority !== 'all' ||
    filters.category !== 'all' ||
    filters.teamMemberId !== 'all';

  return { filters, filtered, updateFilter, resetFilters, hasActiveFilters, setFilters };
}
