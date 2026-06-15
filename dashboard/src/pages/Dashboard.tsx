import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import StatCard from '../components/StatCard';
import ProjectProgress from '../components/ProjectProgress';
import TeamActivity from '../components/TeamActivity';
import CalendarWidget from '../components/CalendarWidget';
import KanbanPreview from '../components/KanbanPreview';
import TimeTracking from '../components/TimeTracking';
import ReportsWidget from '../components/ReportsWidget';
import {
  HiOutlineSparkles,
  HiOutlineLightningBolt,
  HiOutlineChartBar,
  HiOutlineClock,
  HiArrowSmRight,
} from 'react-icons/hi';

const stats = [
  {
    id: 'projects',
    label: 'Total Projects',
    value: 24,
    change: '+12%',
    trend: 'up' as const,
    icon: 'projects',
    subtitle: '3 launching this month',
  },
  {
    id: 'tasks',
    label: 'Active Tasks',
    value: 186,
    change: '+8%',
    trend: 'up' as const,
    icon: 'tasks',
    subtitle: '44 due this week',
  },
  {
    id: 'completed',
    label: 'Completed',
    value: 142,
    change: '+18%',
    trend: 'up' as const,
    icon: 'completed',
    subtitle: '76% completion rate',
  },
  {
    id: 'team',
    label: 'Team Members',
    value: 12,
    change: '+2',
    trend: 'up' as const,
    icon: 'team',
    subtitle: '3 new this quarter',
  },
  {
    id: 'productivity',
    label: 'Productivity',
    value: '94%',
    change: '+6%',
    trend: 'up' as const,
    icon: 'productivity',
    subtitle: 'Above industry avg',
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function Dashboard() {
  const { user } = useAuth();
  const firstName = user?.email?.split('@')[0] ?? 'there';
  const capitalized = firstName.charAt(0).toUpperCase() + firstName.slice(1);

  const now = new Date();
  const hour = now.getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <motion.div
      className="mx-auto max-w-[1600px] space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* ── Welcome Hero Banner ── */}
      <motion.div variants={itemVariants}>
        <div
          className="relative overflow-hidden rounded-3xl p-6 md:p-8"
          style={{
            background: 'linear-gradient(135deg, rgba(59,130,246,0.12) 0%, rgba(99,102,241,0.08) 50%, rgba(6,182,212,0.06) 100%)',
            border: '1px solid rgba(59,130,246,0.2)',
            boxShadow: '0 0 60px rgba(59,130,246,0.06)',
          }}
        >
          {/* Decorative blobs */}
          <div className="absolute -top-10 -right-10 h-48 w-48 rounded-full blur-3xl"
            style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.2), transparent)' }} />
          <div className="absolute -bottom-8 left-20 h-40 w-40 rounded-full blur-3xl"
            style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.15), transparent)' }} />

          {/* Top row */}
          <div className="relative z-10 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <div
                  className="flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-widest"
                  style={{ background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.25)', color: '#60a5fa' }}
                >
                  <HiOutlineSparkles className="h-3 w-3" />
                  AI-Powered Dashboard
                </div>
                <div
                  className="flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold"
                  style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.25)', color: '#34d399' }}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live
                </div>
              </div>

              <motion.h2
                className="text-3xl md:text-4xl font-extrabold text-white leading-tight"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                {greeting},{' '}
                <span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: 'linear-gradient(90deg, #3b82f6, #06b6d4, #8b5cf6)' }}
                >
                  {capitalized}!
                </span>
              </motion.h2>

              <motion.p
                className="mt-2 text-sm md:text-base text-slate-400 max-w-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Here's what's happening across your projects today. You have{' '}
                <span className="text-blue-400 font-semibold">5 tasks due</span> and{' '}
                <span className="text-cyan-400 font-semibold">2 team reviews</span> pending.
              </motion.p>

              {/* Quick actions */}
              <div className="flex flex-wrap gap-2 mt-5">
                {[
                  { label: 'View Sprint', icon: HiOutlineLightningBolt, color: '#3b82f6' },
                  { label: 'Team Report', icon: HiOutlineChartBar,     color: '#8b5cf6' },
                  { label: 'Log Time',    icon: HiOutlineClock,         color: '#06b6d4' },
                ].map(action => (
                  <motion.button
                    key={action.label}
                    whileHover={{ scale: 1.03, y: -1 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-all"
                    style={{
                      background: `${action.color}18`,
                      border: `1px solid ${action.color}30`,
                      color: action.color,
                    }}
                  >
                    <action.icon className="h-4 w-4" />
                    {action.label}
                    <HiArrowSmRight className="h-3.5 w-3.5 opacity-60" />
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Right side: mini stats */}
            <div className="flex gap-3 md:flex-col md:items-end">
              {[
                { label: 'Sprint Progress', value: '68%', color: '#3b82f6' },
                { label: 'Team Velocity',   value: '94/wk', color: '#10b981' },
              ].map(s => (
                <div
                  key={s.label}
                  className="rounded-2xl px-4 py-3 min-w-[120px] text-right"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <p className="text-xl font-bold" style={{ fontFamily: 'Space Grotesk, sans-serif', color: s.color }}>
                    {s.value}
                  </p>
                  <p className="text-[10px] text-slate-500 mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── Analytics Stat Cards ── */}
      <motion.div variants={itemVariants}>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-5">
          {stats.map((stat, index) => (
            <StatCard key={stat.id} stat={stat} index={index} />
          ))}
        </div>
      </motion.div>

      {/* ── Kanban Preview (full width) ── */}
      <motion.div variants={itemVariants}>
        <KanbanPreview />
      </motion.div>

      {/* ── Project Progress + Team Activity ── */}
      <motion.div variants={itemVariants}>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <ProjectProgress />
          <TeamActivity />
        </div>
      </motion.div>

      {/* ── Calendar + Time Tracking + Reports ── */}
      <motion.div variants={itemVariants}>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <CalendarWidget />
          <TimeTracking />
          <ReportsWidget />
        </div>
      </motion.div>
    </motion.div>
  );
}
