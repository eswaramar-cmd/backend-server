import type { Achievement, HeatmapDay, TimelineBlock, WorkspaceTask } from '../types/task';

export const INITIAL_TASKS: WorkspaceTask[] = [
  {
    id: 'task-1',
    title: 'Design Landing Page',
    description: 'Hero section, feature grid, and CTA for the new marketing site.',
    priority: 'high',
    status: 'in-progress',
    progress: 70,
    timeRemainingMinutes: 135,
    dueDate: '2026-06-05',
    tags: ['design', 'ui'],
    assigneeId: '1',
    isFocus: true,
    lastActiveAt: '2026-06-03T10:30:00Z',
    scheduledTime: '09:00',
    projectName: 'Product Redesign',
    createdAt: '2026-05-28T09:00:00Z',
  },
  {
    id: 'task-2',
    title: 'API Testing',
    description: 'Integration tests for auth and projects endpoints.',
    priority: 'urgent',
    status: 'todo',
    progress: 35,
    timeRemainingMinutes: 240,
    dueDate: '2026-06-02',
    tags: ['api', 'qa'],
    assigneeId: '5',
    isFocus: false,
    lastActiveAt: '2026-05-30T14:00:00Z',
    scheduledTime: '11:00',
    projectName: 'API Platform',
    createdAt: '2026-05-20T11:00:00Z',
  },
  {
    id: 'task-3',
    title: 'Deploy Backend',
    description: 'Production deployment with zero-downtime rollout.',
    priority: 'urgent',
    status: 'in-progress',
    progress: 55,
    timeRemainingMinutes: 180,
    dueDate: '2026-06-06',
    tags: ['devops', 'backend'],
    assigneeId: '6',
    isFocus: false,
    lastActiveAt: '2026-06-03T08:00:00Z',
    scheduledTime: '17:00',
    projectName: 'API Platform',
    createdAt: '2026-05-25T16:00:00Z',
  },
  {
    id: 'task-4',
    title: 'User Onboarding Flow',
    description: 'Interactive tour and checklist for new users.',
    priority: 'medium',
    status: 'todo',
    progress: 10,
    timeRemainingMinutes: 360,
    dueDate: '2026-06-10',
    tags: ['product', 'ux'],
    assigneeId: '3',
    isFocus: false,
    lastActiveAt: '2026-05-15T09:00:00Z',
    scheduledTime: '14:00',
    projectName: 'Mobile App v2',
    createdAt: '2026-05-10T10:00:00Z',
  },
  {
    id: 'task-5',
    title: 'Performance Audit',
    description: 'Lighthouse scores and bundle size optimization.',
    priority: 'high',
    status: 'in-progress',
    progress: 45,
    timeRemainingMinutes: 300,
    dueDate: '2026-06-08',
    tags: ['performance'],
    assigneeId: '4',
    isFocus: false,
    lastActiveAt: '2026-06-01T12:00:00Z',
    scheduledTime: '14:00',
    projectName: 'Product Redesign',
    createdAt: '2026-05-22T08:00:00Z',
  },
];

export const TIMELINE_BLOCKS: TimelineBlock[] = [
  { id: 'tl-1', time: '9:00 AM', title: 'UI Design', type: 'design' },
  { id: 'tl-2', time: '11:00 AM', title: 'API Development', type: 'dev' },
  { id: 'tl-3', time: '2:00 PM', title: 'Testing', type: 'test' },
  { id: 'tl-4', time: '5:00 PM', title: 'Deployment', type: 'deploy' },
];

function generateHeatmap(): HeatmapDay[] {
  const days: HeatmapDay[] = [];
  const today = new Date();
  for (let i = 83; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dayOfWeek = d.getDay();
    const base = dayOfWeek === 0 || dayOfWeek === 6 ? 0 : 1;
    const count = Math.random() > 0.35 ? Math.floor(Math.random() * 5) + base : 0;
    days.push({
      date: d.toISOString().split('T')[0],
      count,
    });
  }
  return days;
}

export const HEATMAP_DATA = generateHeatmap();

export const ACHIEVEMENTS: Achievement[] = [
  { id: 'first-project', icon: '🏆', title: 'First Project', description: 'Created your first project', unlocked: true, unlockedAt: '2026-01-10' },
  { id: 'streak-7', icon: '🔥', title: '7-Day Streak', description: 'Active 7 days in a row', unlocked: true, unlockedAt: '2026-05-20' },
  { id: 'task-master', icon: '⚡', title: 'Task Master', description: 'Completed 50 tasks', unlocked: false },
  { id: 'focus-hero', icon: '🎯', title: 'Focus Hero', description: '5 focus sessions completed', unlocked: true, unlockedAt: '2026-06-01' },
  { id: 'early-bird', icon: '🌅', title: 'Early Bird', description: 'Completed a task before 9 AM', unlocked: false },
  { id: 'team-player', icon: '👥', title: 'Team Player', description: 'Collaborated on 10 tasks', unlocked: false },
];

export const ANALYTICS = {
  completedThisWeek: 24,
  avgCompletionHours: 4.2,
  productivityTrend: '+18%',
  todayProgress: 82,
};
