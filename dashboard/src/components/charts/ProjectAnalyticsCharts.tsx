import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { CHART_DATA } from '../../data/projectsSeed';
import GlassCard from '../ui/GlassCard';

interface ProjectAnalyticsChartsProps {
  progress?: number;
}

export default function ProjectAnalyticsCharts({ progress }: ProjectAnalyticsChartsProps) {
  const progressData = CHART_DATA.progress.map((d, i, arr) =>
    i === arr.length - 1 && progress !== undefined ? { ...d, progress } : d,
  );

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      <GlassCard delay={0.1} className="min-h-[280px]">
        <h4 className="mb-4 font-semibold text-slate-900 dark:text-white">Progress Over Time</h4>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={progressData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700" />
            <XAxis dataKey="week" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="progress"
              stroke="#6366f1"
              strokeWidth={2.5}
              dot={{ fill: '#8b5cf6', r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </GlassCard>

      <GlassCard delay={0.15} className="min-h-[280px]">
        <h4 className="mb-4 font-semibold text-slate-900 dark:text-white">Task Completion</h4>
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie
              data={CHART_DATA.tasks}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={75}
              dataKey="value"
              paddingAngle={3}
            >
              {CHART_DATA.tasks.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </GlassCard>

      <GlassCard delay={0.2} className="min-h-[280px]">
        <h4 className="mb-4 font-semibold text-slate-900 dark:text-white">Weekly Activity</h4>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={CHART_DATA.weekly}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700" />
            <XAxis dataKey="day" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip />
            <Bar dataKey="tasks" fill="#8b5cf6" radius={[6, 6, 0, 0]} />
            <Bar dataKey="commits" fill="#3b82f6" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </GlassCard>
    </div>
  );
}
