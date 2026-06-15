import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import GlassCard from '../components/GlassCard';
import { taskStatusData } from '../data/mockData';

export default function TaskStatusChart({ delay = 0.25 }) {
  const total = taskStatusData.reduce((sum, d) => sum + d.value, 0);

  return (
    <GlassCard delay={delay} className="min-h-[320px]">
      <div className="mb-2">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Task Status</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">{total} total tasks</p>
      </div>
      <div className="h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={taskStatusData}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={80}
              paddingAngle={3}
              dataKey="value"
            >
              {taskStatusData.map((entry) => (
                <Cell key={entry.name} fill={entry.color} stroke="transparent" />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => [`${value} tasks`, '']}
              contentStyle={{ borderRadius: '12px' }}
            />
            <Legend
              verticalAlign="bottom"
              formatter={(value) => (
                <span className="text-sm text-slate-600 dark:text-slate-300">{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>
  );
}
