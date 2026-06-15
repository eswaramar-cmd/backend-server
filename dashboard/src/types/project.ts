export type ProjectStatus = 'active' | 'completed' | 'on-hold' | 'planning' | 'overdue';
export type ProjectPriority = 'low' | 'medium' | 'high' | 'urgent';
export type ProjectCategory =
  | 'engineering'
  | 'design'
  | 'marketing'
  | 'operations'
  | 'product';

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  tasksAssigned: number;
  completionRate: number;
}

export interface ActivityItem {
  id: string;
  type: 'created' | 'task_added' | 'member_joined' | 'task_completed' | 'file_uploaded';
  title: string;
  description: string;
  user: string;
  timestamp: string;
}

export interface ProjectTask {
  id: string;
  title: string;
  status: 'todo' | 'in-progress' | 'done';
  assigneeId?: string;
}

export interface ProjectFile {
  id: string;
  name: string;
  size: string;
  uploadedAt: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  coverColor: string;
  status: ProjectStatus;
  priority: ProjectPriority;
  category: ProjectCategory;
  progress: number;
  taskCount: number;
  completedTasks: number;
  startDate: string;
  dueDate: string;
  tags: string[];
  teamMemberIds: string[];
  createdAt: string;
}

export interface ProjectFilters {
  search: string;
  status: ProjectStatus | 'all';
  priority: ProjectPriority | 'all';
  category: ProjectCategory | 'all';
  teamMemberId: string | 'all';
}

export interface CreateProjectInput {
  name: string;
  description: string;
  startDate: string;
  dueDate: string;
  priority: ProjectPriority;
  category: ProjectCategory;
  teamMemberIds: string[];
  tags: string[];
  coverColor: string;
}

export interface ProjectStats {
  total: number;
  active: number;
  completed: number;
  overdue: number;
}
