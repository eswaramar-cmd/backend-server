import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import GlassCard from '../components/GlassCard';
import { projectOverviewData } from '../data/mockData';

export default function ProjectOverviewChart({ delay = 0.2 }) {
  return (
    <GlassCard delay={delay} className="min-h-[320px] lg:col-span-2">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Project Overview</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">Monthly task distribution</p>
        </div>
      </div>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={projectOverviewData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} className="text-slate-500" />
            <YAxis tick={{ fontSize: 12 }} className="text-slate-500" />
            <Tooltip
              contentStyle={{
                borderRadius: '12px',
                border: '1px solid rgba(148,163,184,0.2)',
                background: 'rgba(255,255,255,0.95)',
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="completed"
              stroke="#7c3aed"
              strokeWidth={2.5}
              dot={{ fill: '#7c3aed', r: 4 }}
              activeDot={{ r: 6 }}
              name="Completed"
            />
            <Line
              type="monotone"
              dataKey="inProgress"
              stroke="#3b82f6"
              strokeWidth={2.5}
              dot={{ fill: '#3b82f6', r: 4 }}
              name="In Progress"
            />
            <Line
              type="monotone"
              dataKey="planned"
              stroke="#94a3b8"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ fill: '#94a3b8', r: 3 }}
              name="Planned"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>
  );
}
