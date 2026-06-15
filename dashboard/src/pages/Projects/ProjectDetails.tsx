import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  HiOutlineArrowLeft,
  HiOutlineChartBar,
  HiOutlineClipboardList,
  HiOutlineDocument,
  HiOutlineUserGroup,
} from 'react-icons/hi';
import ProjectAnalyticsCharts from '../../components/charts/ProjectAnalyticsCharts';
import TeamMemberCard from '../../components/cards/TeamMemberCard';
import ActivityTimeline from '../../components/timeline/ActivityTimeline';
import Badge from '../../components/ui/Badge';
import ErrorState from '../../components/ui/ErrorState';
import GlassCard from '../../components/ui/GlassCard';
import { PROJECT_FILES, PROJECT_TASKS } from '../../data/projectsSeed';
import { TEAM_MEMBERS } from '../../data/teamMembers';
import { useProjects } from '../../context/ProjectsContext';
import { formatDate } from '../../utils/formatDate';
import { PRIORITY_CONFIG, resolveStatus, STATUS_CONFIG } from '../../utils/projectHelpers';
import { cn } from '../../utils/cn';

type Tab = 'overview' | 'tasks' | 'files' | 'activity' | 'team' | 'analytics';

const TABS: { id: Tab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'overview', label: 'Overview', icon: HiOutlineChartBar },
  { id: 'tasks', label: 'Tasks', icon: HiOutlineClipboardList },
  { id: 'files', label: 'Files', icon: HiOutlineDocument },
  { id: 'activity', label: 'Activity', icon: HiOutlineChartBar },
  { id: 'team', label: 'Team', icon: HiOutlineUserGroup },
  { id: 'analytics', label: 'Analytics', icon: HiOutlineChartBar },
];

export default function ProjectDetails() {
  const { projectId } = useParams<{ projectId: string }>();
  const { getProject, getActivities } = useProjects();
  const [tab, setTab] = useState<Tab>('overview');

  const project = projectId ? getProject(projectId) : undefined;

  if (!project) {
    return (
      <ErrorState
        message="This project could not be found. It may have been removed."
        onRetry={() => window.history.back()}
      />
    );
  }

  const status = resolveStatus(project);
  const members = TEAM_MEMBERS.filter((m) => project.teamMemberIds.includes(m.id));
  const activities = getActivities(project.id);
  const tasks = PROJECT_TASKS[project.id] ?? [];
  const files = PROJECT_FILES[project.id] ?? [];

  return (
    <div className="mx-auto max-w-[1600px] space-y-6">
      <Link
        to="/projects"
        className="inline-flex items-center gap-2 text-sm font-medium text-violet-600 hover:text-violet-700 dark:text-violet-400"
      >
        <HiOutlineArrowLeft className="h-4 w-4" />
        Back to Projects
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-800/90"
      >
        <div className="h-2" style={{ backgroundColor: project.coverColor }} />
        <div className="p-6 sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{project.name}</h1>
              <div className="mt-3 flex flex-wrap gap-2">
                <Badge className={PRIORITY_CONFIG[project.priority].className}>
                  {PRIORITY_CONFIG[project.priority].label}
                </Badge>
                <Badge className={STATUS_CONFIG[status].className}>
                  {STATUS_CONFIG[status].label}
                </Badge>
                <Badge className="bg-slate-100 text-slate-600 capitalize dark:bg-slate-700 dark:text-slate-300">
                  {project.category}
                </Badge>
              </div>
            </div>
            <div className="text-right">
              <p className="text-4xl font-bold text-violet-600 dark:text-violet-400">
                {project.progress}%
              </p>
              <p className="text-sm text-slate-500">Complete</p>
            </div>
          </div>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{ width: `${project.progress}%`, backgroundColor: project.coverColor }}
            />
          </div>
        </div>
      </motion.div>

      <div className="flex gap-1 overflow-x-auto rounded-xl border border-slate-200 bg-white/80 p-1 dark:border-slate-700 dark:bg-slate-800/80">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => setTab(id)}
            className={cn(
              'flex shrink-0 items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition',
              tab === id
                ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700',
            )}
          >
            <Icon className="h-4 w-4" />
            {label}
          </button>
        ))}
      </div>

      {tab === 'overview' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid gap-4 lg:grid-cols-2">
          <GlassCard>
            <h3 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">Overview</h3>
            <p className="text-slate-600 dark:text-slate-300">{project.description}</p>
            <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
              <div>
                <dt className="text-slate-500">Deadline</dt>
                <dd className="font-semibold text-slate-900 dark:text-white">
                  {formatDate(project.dueDate)}
                </dd>
              </div>
              <div>
                <dt className="text-slate-500">Status</dt>
                <dd className="font-semibold capitalize">{STATUS_CONFIG[status].label}</dd>
              </div>
              <div>
                <dt className="text-slate-500">Tasks</dt>
                <dd className="font-semibold">{project.completedTasks}/{project.taskCount}</dd>
              </div>
              <div>
                <dt className="text-slate-500">Completion</dt>
                <dd className="font-semibold text-violet-600">{project.progress}%</dd>
              </div>
            </dl>
            {project.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-violet-100 px-2.5 py-0.5 text-xs font-medium text-violet-700 dark:bg-violet-900/40 dark:text-violet-300"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </GlassCard>
          <GlassCard>
            <h3 className="mb-4 text-lg font-semibold">Recent Activity</h3>
            <ActivityTimeline activities={activities.slice(0, 3)} />
          </GlassCard>
        </motion.div>
      )}

      {tab === 'tasks' && (
        <GlassCard>
          <h3 className="mb-4 text-lg font-semibold">Tasks</h3>
          {tasks.length === 0 ? (
            <p className="text-slate-500">No tasks yet.</p>
          ) : (
            <ul className="space-y-2">
              {tasks.map((t) => (
                <li
                  key={t.id}
                  className="flex items-center justify-between rounded-xl border border-slate-100 px-4 py-3 dark:border-slate-700"
                >
                  <span className="font-medium text-slate-900 dark:text-white">{t.title}</span>
                  <Badge
                    className={
                      t.status === 'done'
                        ? 'bg-emerald-100 text-emerald-700'
                        : t.status === 'in-progress'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-slate-100 text-slate-600'
                    }
                  >
                    {t.status.replace('-', ' ')}
                  </Badge>
                </li>
              ))}
            </ul>
          )}
        </GlassCard>
      )}

      {tab === 'files' && (
        <GlassCard>
          <h3 className="mb-4 text-lg font-semibold">Files</h3>
          {files.length === 0 ? (
            <p className="text-slate-500">No files uploaded.</p>
          ) : (
            <ul className="space-y-2">
              {files.map((f) => (
                <li
                  key={f.id}
                  className="flex items-center justify-between rounded-xl border border-slate-100 px-4 py-3 dark:border-slate-700"
                >
                  <span className="font-medium">{f.name}</span>
                  <span className="text-sm text-slate-500">{f.size}</span>
                </li>
              ))}
            </ul>
          )}
        </GlassCard>
      )}

      {tab === 'activity' && (
        <GlassCard>
          <h3 className="mb-6 text-lg font-semibold">Activity Timeline</h3>
          <ActivityTimeline activities={activities} />
        </GlassCard>
      )}

      {tab === 'team' && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {members.map((m, i) => (
            <TeamMemberCard key={m.id} member={m} index={i} />
          ))}
        </div>
      )}

      {tab === 'analytics' && <ProjectAnalyticsCharts progress={project.progress} />}
    </div>
  );
}
