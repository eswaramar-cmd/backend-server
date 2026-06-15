import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import Placeholder from './pages/Placeholder';
import Dashboard from './pages/Dashboard';
import ProjectsList from './pages/Projects/ProjectsList';
import TasksWorkspace from './pages/Tasks/TasksWorkspace';
import CalendarPage from './pages/CalendarPage';
import AuthGate from './components/AuthGate';

const router = createBrowserRouter([
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'projects', element: <ProjectsList /> },
      { path: 'tasks', element: <TasksWorkspace /> },
      { path: 'kanban', element: <Placeholder title="Kanban Board" /> },
      { path: 'calendar', element: <CalendarPage /> },
      { path: 'team', element: <Placeholder title="Team" /> },
      { path: 'files', element: <Placeholder title="Files" /> },
      { path: 'time', element: <Placeholder title="Time Tracking" /> },
      { path: 'reports', element: <Placeholder title="Reports" /> },
      { path: 'settings', element: <Placeholder title="Settings" /> },
    ],
  },
]);

export default function App() {
  return (
    <AuthGate>
      <RouterProvider router={router} />
    </AuthGate>
  );
}
