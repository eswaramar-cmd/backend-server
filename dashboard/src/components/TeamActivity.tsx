import { motion } from 'framer-motion';
import GlassCard from './GlassCard';

const activities = [
  {
    id: 1,
    user: 'Sarah Chen',
    action: 'completed task',
    target: 'User Auth Flow',
    time: '2 min ago',
    avatar: 'SC',
    color: 'from-blue-500 to-cyan-500',
    glow: 'rgba(59,130,246,0.5)',
    dot: '#3b82f6',
    type: 'complete',
  },
  {
    id: 2,
    user: 'Marcus Lee',
    action: 'commented on',
    target: 'Dashboard Wireframes',
    time: '15 min ago',
    avatar: 'ML',
    color: 'from-purple-500 to-indigo-500',
    glow: 'rgba(139,92,246,0.5)',
    dot: '#8b5cf6',
    type: 'comment',
  },
  {
    id: 3,
    user: 'Elena Rodriguez',
    action: 'created project',
    target: 'Marketing Campaign',
    time: '1 hr ago',
    avatar: 'ER',
    color: 'from-emerald-500 to-teal-500',
    glow: 'rgba(16,185,129,0.5)',
    dot: '#10b981',
    type: 'create',
  },
  {
    id: 4,
    user: 'James Park',
    action: 'uploaded file to',
    target: 'Brand Guidelines',
    time: '2 hrs ago',
    avatar: 'JP',
    color: 'from-amber-500 to-orange-500',
    glow: 'rgba(245,158,11,0.5)',
    dot: '#f59e0b',
    type: 'upload',
  },
  {
    id: 5,
    user: 'Aisha Patel',
    action: 'assigned task',
    target: 'Performance Audit',
    time: '3 hrs ago',
    avatar: 'AP',
    color: 'from-pink-500 to-rose-500',
    glow: 'rgba(236,72,153,0.5)',
    dot: '#ec4899',
    type: 'assign',
  },
];

const typeEmoji: Record<string, string> = {
  complete: '✅',
  comment:  '💬',
  create:   '🚀',
  upload:   '📎',
  assign:   '👤',
};

export default function TeamActivity() {
  return (
    <GlassCard delay={0.4} hover={false} className="!p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-base font-bold text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Team Activity
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">Recent updates from your team</p>
        </div>
        <div className="flex -space-x-2">
          {activities.slice(0, 4).map(a => (
            <div
              key={a.id}
              className={`h-7 w-7 rounded-full bg-gradient-to-br ${a.color} flex items-center justify-center text-[9px] font-bold text-white ring-2 ring-slate-900`}
              style={{ boxShadow: `0 0 8px ${a.glow}` }}
              title={a.user}
            >
              {a.avatar}
            </div>
          ))}
          <div className="h-7 w-7 rounded-full bg-slate-800 flex items-center justify-center text-[9px] font-bold text-slate-400 ring-2 ring-slate-900">
            +3
          </div>
        </div>
      </div>

      <div className="relative">
        {/* Vertical timeline line */}
        <div className="absolute left-[15px] top-2 bottom-2 w-px bg-gradient-to-b from-blue-500/40 via-purple-500/20 to-transparent" />

        <div className="space-y-4">
          {activities.map((a, i) => (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.08 }}
              className="flex items-start gap-3 group cursor-default"
            >
              {/* Avatar with dot */}
              <div className="relative flex-shrink-0">
                <div
                  className={`h-8 w-8 rounded-xl bg-gradient-to-br ${a.color} flex items-center justify-center text-[10px] font-bold text-white shadow-sm`}
                  style={{ boxShadow: `0 0 10px ${a.glow}` }}
                >
                  {a.avatar}
                </div>
                <div
                  className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full flex items-center justify-center text-[6px]"
                  style={{ background: '#0a0f1e', border: `1.5px solid ${a.dot}` }}
                >
                  <span style={{ fontSize: '7px' }}>{typeEmoji[a.type]}</span>
                </div>
              </div>

              <div className="flex-1 min-w-0 pt-0.5">
                <p className="text-sm text-slate-300 leading-relaxed">
                  <span className="font-semibold text-white">{a.user}</span>{' '}
                  <span className="text-slate-400">{a.action}</span>{' '}
                  <span
                    className="font-medium transition-colors"
                    style={{ color: a.dot }}
                  >
                    {a.target}
                  </span>
                </p>
                <p className="text-[11px] text-slate-600 mt-0.5">{a.time}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </GlassCard>
  );
}
