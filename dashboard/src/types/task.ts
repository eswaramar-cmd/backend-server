export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';
export type TaskStatus = 'todo' | 'in-progress' | 'done';

export interface WorkspaceTask {
  id: string;
  title: string;
  description?: string;
  priority: TaskPriority;
  status: TaskStatus;
  progress: number;
  timeRemainingMinutes: number;
  dueDate: string;
  tags: string[];
  assigneeId: string;
  isFocus: boolean;
  lastActiveAt: string;
  scheduledTime?: string;
  projectName?: string;
  createdAt: string;
}

export interface Achievement {
  id: string;
  icon: string;
  title: string;
  description: string;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface HeatmapDay {
  date: string;
  count: number;
}

export interface TimelineBlock {
  id: string;
  time: string;
  title: string;
  type: 'design' | 'dev' | 'test' | 'deploy' | 'meeting';
}

export interface TaskFilters {
  search: string;
  priority: TaskPriority | 'all';
  tag: string;
  assigneeId: string | 'all';
  dueBefore: string;
}

export interface CreateTaskInput {
  title: string;
  priority: TaskPriority;
  dueDate: string;
  tags: string[];
  assigneeId: string;
}
