import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { INITIAL_PROJECTS, PROJECT_ACTIVITIES } from '../data/projectsSeed';
import type { ActivityItem, CreateProjectInput, Project } from '../types/project';

const STORAGE_KEY = 'flowboard-projects';

function loadProjects(): Project[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as Project[];
  } catch {
    /* use seed */
  }
  return INITIAL_PROJECTS;
}

interface ProjectsContextValue {
  projects: Project[];
  loading: boolean;
  error: string | null;
  addProject: (input: CreateProjectInput) => Project;
  getProject: (id: string) => Project | undefined;
  getActivities: (projectId: string) => ActivityItem[];
  clearError: () => void;
}

const ProjectsContext = createContext<ProjectsContextValue | null>(null);

export function ProjectsProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>(loadProjects);
  const [loading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const persist = useCallback((next: Project[]) => {
    setProjects(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }, []);

  const addProject = useCallback(
    (input: CreateProjectInput): Project => {
      const project: Project = {
        id: `proj-${Date.now()}`,
        name: input.name,
        description: input.description,
        coverColor: input.coverColor,
        status: 'planning',
        priority: input.priority,
        category: input.category,
        progress: 0,
        taskCount: 0,
        completedTasks: 0,
        startDate: input.startDate,
        dueDate: input.dueDate,
        tags: input.tags,
        teamMemberIds: input.teamMemberIds,
        createdAt: new Date().toISOString(),
      };
      persist([project, ...projects]);
      return project;
    },
    [projects, persist],
  );

  const getProject = useCallback(
    (id: string) => projects.find((p) => p.id === id),
    [projects],
  );

  const getActivities = useCallback((projectId: string): ActivityItem[] => {
    return (
      PROJECT_ACTIVITIES[projectId] ?? [
        {
          id: 'default',
          type: 'created',
          title: 'Project Created',
          description: 'Project was initialized',
          user: 'System',
          timestamp: new Date().toISOString(),
        },
      ]
    );
  }, []);

  const value = useMemo(
    () => ({
      projects,
      loading,
      error,
      addProject,
      getProject,
      getActivities,
      clearError: () => setError(null),
    }),
    [projects, loading, error, addProject, getProject, getActivities],
  );

  return <ProjectsContext.Provider value={value}>{children}</ProjectsContext.Provider>;
}

export function useProjects() {
  const ctx = useContext(ProjectsContext);
  if (!ctx) throw new Error('useProjects must be used within ProjectsProvider');
  return ctx;
}
