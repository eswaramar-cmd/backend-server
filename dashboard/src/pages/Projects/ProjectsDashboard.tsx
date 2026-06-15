import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  HiOutlineArrowRight,
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineFolder,
  HiOutlinePlus,
} from 'react-icons/hi';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import CreateProjectModal from '../../components/modals/CreateProjectModal';
import ProjectCard from '../../components/cards/ProjectCard';
import ProjectFiltersBar from '../../components/filters/ProjectFiltersBar';
import ProjectStatCard from '../../components/cards/ProjectStatCard';
import { useProjects } from '../../context/ProjectsContext';
import { useProjectFilters } from '../../hooks/useProjectFilters';
import { computeProjectStats } from '../../utils/projectHelpers';
import Button from '../../components/ui/Button';
import GlassCard from '../../components/ui/GlassCard';

export default function ProjectsDashboard() {
  const { projects, loading, addProject } = useProjects();
  const { filters, filtered, updateFilter, resetFilters, hasActiveFilters } =
    useProjectFilters(projects);
  const [modalOpen, setModalOpen] = useState(false);
  const stats = computeProjectStats(projects);

  const progressOverview = [
    { name: 'Active', count: stats.active, fill: '#6366f1' },
    { name: 'Completed', count: stats.completed, fill: '#10b981' },
    { name: 'Overdue', count: stats.overdue, fill: '#ef4444' },
    { name: 'Planning', count: projects.filter((p) => p.status === 'planning').length, fill: '#8b5cf6' },
  ];

  const featured = filtered.slice(0, 3);

  return (
    <div className="mx-auto max-w-[1600px] space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Projects</h1>
          <p className="text-slate-500 dark:text-slate-400">
            Manage and track all your team projects in one place.
          </p>
        </div>
        <div className="flex gap-2">
          <Link to="/projects/list">
            <Button variant="secondary">View All</Button>
          </Link>
          <Button onClick={() => setModalOpen(true)}>
            <HiOutlinePlus className="h-4 w-4" />
            New Project
          </Button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <ProjectStatCard label="Total Projects" value={stats.total} icon={HiOutlineFolder} gradient="from-indigo-500 to-violet-600" index={0} />
        <ProjectStatCard label="Active Projects" value={stats.active} icon={HiOutlineClock} gradient="from-blue-500 to-cyan-500" index={1} />
        <ProjectStatCard label="Completed" value={stats.completed} icon={HiOutlineCheckCircle} gradient="from-emerald-500 to-teal-500" index={2} />
        <ProjectStatCard label="Overdue" value={stats.overdue} icon={HiOutlineClock} gradient="from-red-500 to-orange-500" index={3} />
      </div>

      <ProjectFiltersBar
        filters={filters}
        onChange={updateFilter}
        onReset={resetFilters}
        hasActiveFilters={hasActiveFilters}
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <GlassCard delay={0.2} className="lg:col-span-2 min-h-[280px]">
          <h3 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">
            Progress Overview
          </h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={progressOverview} layout="vertical" margin={{ left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11 }} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 12 }} width={80} />
              <Tooltip />
              <Bar dataKey="count" radius={[0, 8, 8, 0]}>
                {progressOverview.map((entry) => (
                  <Cell key={entry.name} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard delay={0.25}>
          <h3 className="mb-2 text-lg font-semibold text-slate-900 dark:text-white">Quick Stats</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {filtered.length} project{filtered.length !== 1 ? 's' : ''} match your filters
          </p>
          <div className="mt-6 space-y-3">
            {progressOverview.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: item.fill }} />
                  {item.name}
                </span>
                <span className="font-semibold text-slate-900 dark:text-white">{item.count}</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Featured Projects</h2>
          <Link
            to="/projects/list"
            className="flex items-center gap-1 text-sm font-medium text-violet-600 hover:text-violet-700 dark:text-violet-400"
          >
            See all <HiOutlineArrowRight className="h-4 w-4" />
          </Link>
        </div>
        {loading ? (
          <p className="text-slate-500">Loading...</p>
        ) : featured.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-slate-300 p-8 text-center text-slate-500">
            No projects match your filters.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {featured.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i} />
            ))}
          </div>
        )}
      </div>

      <CreateProjectModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={(data) => addProject(data)}
      />
    </div>
  );
}
