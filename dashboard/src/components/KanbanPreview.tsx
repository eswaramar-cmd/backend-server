import { motion } from 'framer-motion';
import GlassCard from './GlassCard';
import { HiOutlinePlus } from 'react-icons/hi';

const columns = [
  {
    id: 'todo',
    label: 'To Do',
    color: '#64748b',
    glow: 'rgba(100,116,139,0.3)',
    count: 4,
    tasks: [
      { id: 1, title: 'Design system audit',        priority: 'high',   assignee: 'SC' },
      { id: 2, title: 'Write API documentation',   priority: 'medium', assignee: 'JP' },
    ],
  },
  {
    id: 'inprogress',
    label: 'In Progress',
    color: '#3b82f6',
    glow: 'rgba(59,130,246,0.3)',
    count: 6,
    tasks: [
      { id: 3, title: 'Dashboard analytics rebuild', priority: 'high',   assignee: 'ML' },
      { id: 4, title: 'Auth flow implementation',    priority: 'high',   assignee: 'ER' },
    ],
  },
  {
    id: 'review',
    label: 'Review',
    color: '#f59e0b',
    glow: 'rgba(245,158,11,0.3)',
    count: 3,
    tasks: [
      { id: 5, title: 'Mobile responsiveness',      priority: 'medium', assignee: 'AP' },
    ],
  },
  {
    id: 'done',
    label: 'Done',
    color: '#10b981',
    glow: 'rgba(16,185,129,0.3)',
    count: 14,
    tasks: [
      { id: 6, title: 'User research analysis',     priority: 'low',    assignee: 'SC' },
      { id: 7, title: 'Component library setup',    priority: 'high',   assignee: 'ML' },
    ],
  },
];

const priorityStyles: Record<string, { bg: string; color: string }> = {
  high:   { bg: 'rgba(239,68,68,0.15)',   color: '#f87171' },
  medium: { bg: 'rgba(245,158,11,0.15)',  color: '#fbbf24' },
  low:    { bg: 'rgba(16,185,129,0.15)',  color: '#34d399' },
};

const avatarColors = ['from-blue-500 to-cyan-500', 'from-purple-500 to-indigo-500', 'from-emerald-500 to-teal-500', 'from-pink-500 to-rose-500', 'from-amber-500 to-orange-500'];
let colorIdx = 0;
const colorMap: Record<string, string> = {};
function getAvatarColor(key: string) {
  if (!colorMap[key]) colorMap[key] = avatarColors[colorIdx++ % avatarColors.length];
  return colorMap[key];
}

export default function KanbanPreview() {
  return (
    <GlassCard delay={0.35} hover={false} className="!p-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-base font-bold text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Kanban Board
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">Sprint overview — 27 total tasks</p>
        </div>
        <button
          className="flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 transition-all"
        >
          <HiOutlinePlus className="h-3.5 w-3.5" /> Add Task
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        {columns.map((col, ci) => (
          <motion.div
            key={col.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + ci * 0.08 }}
            className="flex flex-col gap-2 rounded-2xl p-3"
            style={{
              background: 'rgba(255,255,255,0.02)',
              border: `1px solid ${col.color}20`,
            }}
          >
            {/* Column header */}
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <div
                  className="h-2 w-2 rounded-full"
                  style={{ background: col.color, boxShadow: `0 0 6px ${col.glow}` }}
                />
                <span className="text-xs font-bold text-slate-300">{col.label}</span>
              </div>
              <span
                className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                style={{ background: `${col.color}20`, color: col.color }}
              >
                {col.count}
              </span>
            </div>

            {/* Task cards */}
            {col.tasks.map((task, ti) => {
              const p = priorityStyles[task.priority];
              return (
                <motion.div
                  key={task.id}
                  whileHover={{ scale: 1.02, y: -1 }}
                  className="rounded-xl p-3 cursor-pointer group"
                  style={{
                    background: 'rgba(10,15,30,0.6)',
                    border: '1px solid rgba(255,255,255,0.05)',
                  }}
                >
                  <p className="text-[11px] font-medium text-slate-300 leading-relaxed mb-2 group-hover:text-white transition-colors">
                    {task.title}
                  </p>
                  <div className="flex items-center justify-between">
                    <span
                      className="text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wide"
                      style={{ background: p.bg, color: p.color }}
                    >
                      {task.priority}
                    </span>
                    <div
                      className={`h-5 w-5 rounded-full bg-gradient-to-br ${getAvatarColor(task.assignee)} flex items-center justify-center text-[8px] font-bold text-white`}
                    >
                      {task.assignee}
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {/* Add card placeholder */}
            <button
              className="mt-1 flex items-center gap-1.5 rounded-xl px-2 py-1.5 text-[10px] text-slate-600 hover:text-slate-400 hover:bg-white/3 transition-all"
            >
              <HiOutlinePlus className="h-3 w-3" /> Add a card
            </button>
          </motion.div>
        ))}
      </div>
    </GlassCard>
  );
}
