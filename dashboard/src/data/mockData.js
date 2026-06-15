export const stats = [
  {
    id: 'projects',
    label: 'Total Projects',
    value: 24,
    change: '+12%',
    trend: 'up',
    icon: 'projects',
    color: 'from-violet-500 to-purple-600',
  },
  {
    id: 'tasks',
    label: 'Total Tasks',
    value: 186,
    change: '+8%',
    trend: 'up',
    icon: 'tasks',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'completed',
    label: 'Completed Tasks',
    value: 142,
    change: '+18%',
    trend: 'up',
    icon: 'completed',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    id: 'pending',
    label: 'Pending Tasks',
    value: 44,
    change: '-5%',
    trend: 'down',
    icon: 'pending',
    color: 'from-amber-500 to-orange-500',
  },
  {
    id: 'team',
    label: 'Team Members',
    value: 12,
    change: '+2',
    trend: 'up',
    icon: 'team',
    color: 'from-indigo-500 to-violet-600',
  },
];

export const projectOverviewData = [
  { month: 'Jan', completed: 12, inProgress: 8, planned: 5 },
  { month: 'Feb', completed: 18, inProgress: 10, planned: 6 },
  { month: 'Mar', completed: 15, inProgress: 14, planned: 8 },
  { month: 'Apr', completed: 22, inProgress: 12, planned: 7 },
  { month: 'May', completed: 28, inProgress: 16, planned: 9 },
  { month: 'Jun', completed: 32, inProgress: 18, planned: 10 },
];

export const taskStatusData = [
  { name: 'Completed', value: 142, color: '#10b981' },
  { name: 'In Progress', value: 28, color: '#3b82f6' },
  { name: 'Pending', value: 16, color: '#f59e0b' },
];

export const upcomingDeadlines = [
  { id: 1, title: 'Launch MVP', project: 'Product Redesign', date: 'Jun 5, 2026', priority: 'high' },
  { id: 2, title: 'API Integration', project: 'Backend Sync', date: 'Jun 8, 2026', priority: 'medium' },
  { id: 3, title: 'Design Review', project: 'Mobile App', date: 'Jun 12, 2026', priority: 'low' },
  { id: 4, title: 'Sprint Planning', project: 'Q2 Roadmap', date: 'Jun 15, 2026', priority: 'medium' },
];

export const recentActivity = [
  { id: 1, user: 'Sarah Chen', action: 'completed task', target: 'User Auth Flow', time: '2 min ago', avatar: 'SC' },
  { id: 2, user: 'Marcus Lee', action: 'commented on', target: 'Dashboard Wireframes', time: '15 min ago', avatar: 'ML' },
  { id: 3, user: 'Elena Rodriguez', action: 'created project', target: 'Marketing Campaign', time: '1 hr ago', avatar: 'ER' },
  { id: 4, user: 'James Park', action: 'uploaded file to', target: 'Brand Guidelines', time: '2 hrs ago', avatar: 'JP' },
  { id: 5, user: 'Aisha Patel', action: 'assigned task', target: 'Performance Audit', time: '3 hrs ago', avatar: 'AP' },
];

export const teamWorkload = [
  { id: 1, name: 'Sarah Chen', role: 'Lead Designer', tasks: 8, capacity: 85, avatar: 'SC' },
  { id: 2, name: 'Marcus Lee', role: 'Senior Dev', tasks: 12, capacity: 95, avatar: 'ML' },
  { id: 3, name: 'Elena Rodriguez', role: 'PM', tasks: 6, capacity: 60, avatar: 'ER' },
  { id: 4, name: 'James Park', role: 'Frontend Dev', tasks: 10, capacity: 78, avatar: 'JP' },
];

export const topProjects = [
  { id: 1, name: 'Product Redesign', progress: 78, team: 5, status: 'On Track', color: 'bg-violet-500' },
  { id: 2, name: 'Mobile App v2', progress: 62, team: 4, status: 'On Track', color: 'bg-blue-500' },
  { id: 3, name: 'API Platform', progress: 45, team: 3, status: 'At Risk', color: 'bg-amber-500' },
  { id: 4, name: 'Marketing Hub', progress: 91, team: 2, status: 'Ahead', color: 'bg-emerald-500' },
];

export const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: 'dashboard', path: '/' },
  { id: 'projects', label: 'Projects', icon: 'projects', path: '/projects' },
  { id: 'tasks', label: 'Tasks', icon: 'tasks', path: '/tasks' },
  { id: 'kanban', label: 'Kanban Board', icon: 'kanban', path: '/kanban' },
  { id: 'calendar', label: 'Calendar', icon: 'calendar', path: '/calendar' },
  { id: 'team', label: 'Team', icon: 'team', path: '/team' },
  { id: 'files', label: 'Files', icon: 'files', path: '/files' },
  { id: 'time', label: 'Time Tracking', icon: 'time', path: '/time' },
  { id: 'reports', label: 'Reports', icon: 'reports', path: '/reports' },
  { id: 'settings', label: 'Settings', icon: 'settings', path: '/settings' },
];
