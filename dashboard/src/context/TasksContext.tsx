import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { ACHIEVEMENTS, ANALYTICS, INITIAL_TASKS } from '../data/tasksSeed';
import type { Achievement, CreateTaskInput, WorkspaceTask } from '../types/task';

const STORAGE_KEY = 'flowboard-tasks';

function loadTasks(): WorkspaceTask[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as WorkspaceTask[];
  } catch {
    /* seed */
  }
  return INITIAL_TASKS;
}

interface TasksContextValue {
  tasks: WorkspaceTask[];
  achievements: Achievement[];
  analytics: typeof ANALYTICS;
  addTask: (input: CreateTaskInput) => void;
  setFocusTask: (taskId: string) => void;
  updateProgress: (taskId: string, progress: number) => void;
}

const TasksContext = createContext<TasksContextValue | null>(null);

export function TasksProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<WorkspaceTask[]>(loadTasks);

  const persist = useCallback((next: WorkspaceTask[]) => {
    setTasks(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }, []);

  const addTask = useCallback(
    (input: CreateTaskInput) => {
      const task: WorkspaceTask = {
        id: `task-${Date.now()}`,
        title: input.title,
        priority: input.priority,
        status: 'todo',
        progress: 0,
        timeRemainingMinutes: 120,
        dueDate: input.dueDate,
        tags: input.tags,
        assigneeId: input.assigneeId,
        isFocus: false,
        lastActiveAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      };
      persist([task, ...tasks]);
    },
    [tasks, persist],
  );

  const setFocusTask = useCallback(
    (taskId: string) => {
      persist(
        tasks.map((t) => ({
          ...t,
          isFocus: t.id === taskId,
          lastActiveAt: t.id === taskId ? new Date().toISOString() : t.lastActiveAt,
        })),
      );
    },
    [tasks, persist],
  );

  const updateProgress = useCallback(
    (taskId: string, progress: number) => {
      persist(
        tasks.map((t) =>
          t.id === taskId
            ? {
                ...t,
                progress: Math.min(100, progress),
                status: progress >= 100 ? 'done' : progress > 0 ? 'in-progress' : 'todo',
                lastActiveAt: new Date().toISOString(),
              }
            : t,
        ),
      );
    },
    [tasks, persist],
  );

  const value = useMemo(
    () => ({
      tasks,
      achievements: ACHIEVEMENTS,
      analytics: ANALYTICS,
      addTask,
      setFocusTask,
      updateProgress,
    }),
    [tasks, addTask, setFocusTask, updateProgress],
  );

  return <TasksContext.Provider value={value}>{children}</TasksContext.Provider>;
}

export function useTasks() {
  const ctx = useContext(TasksContext);
  if (!ctx) throw new Error('useTasks must be used within TasksProvider');
  return ctx;
}
