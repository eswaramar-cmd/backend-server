import { motion } from 'framer-motion';
import GlassCard from './GlassCard';
import { HiOutlineArrowRight, HiOutlineUsers } from 'react-icons/hi';

const projects = [
  { id: 1, name: 'Product Redesign', progress: 78, team: 5, status: 'On Track', color: '#3b82f6', colorGlow: 'rgba(59,130,246,0.5)', tag: 'Design' },
  { id: 2, name: 'Mobile App v2',    progress: 62, team: 4, status: 'On Track', color: '#06b6d4', colorGlow: 'rgba(6,182,212,0.5)',   tag: 'Dev' },
  { id: 3, name: 'API Platform',     progress: 45, team: 3, status: 'At Risk',  color: '#f59e0b', colorGlow: 'rgba(245,158,11,0.5)',  tag: 'Backend' },
  { id: 4, name: 'Marketing Hub',    progress: 91, team: 2, status: 'Ahead',    color: '#10b981', colorGlow: 'rgba(16,185,129,0.5)',  tag: 'Marketing' },
  { id: 5, name: 'Data Pipeline',    progress: 33, team: 3, status: 'Delayed',  color: '#ef4444', colorGlow: 'rgba(239,68,68,0.5)',   tag: 'Data' },
];

const statusStyles: Record<string, string> = {
  'On Track': 'badge-success',
  'Ahead':    'badge-info',
  'At Risk':  'badge-warning',
  'Delayed':  'badge-danger',
};

export default function ProjectProgress() {
  return (
    <GlassCard delay={0.3} hover={false} className="!p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-base font-bold text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Project Progress
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">Live status of active projects</p>
        </div>
        <button className="flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 transition-colors font-medium">
          View all <HiOutlineArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="space-y-5">
        {projects.map((proj, i) => (
          <motion.div
            key={proj.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + i * 0.07 }}
            className="group"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 min-w-0">
                <div
                  className="h-2.5 w-2.5 rounded-full flex-shrink-0"
                  style={{ background: proj.color, boxShadow: `0 0 6px ${proj.colorGlow}` }}
                />
                <span className="text-sm font-medium text-slate-200 truncate">{proj.name}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-md font-medium flex-shrink-0"
                  style={{ background: `${proj.color}22`, color: proj.color, border: `1px solid ${proj.color}33` }}>
                  {proj.tag}
                </span>
              </div>
              <div className="flex items-center gap-3 ml-3 flex-shrink-0">
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${statusStyles[proj.status]}`}>
                  {proj.status}
                </span>
                <div className="flex items-center gap-1 text-slate-500">
                  <HiOutlineUsers className="h-3 w-3" />
                  <span className="text-[11px]">{proj.team}</span>
                </div>
                <span className="text-sm font-bold text-white w-10 text-right" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  {proj.progress}%
                </span>
              </div>
            </div>

            {/* Progress bar */}
            <div className="h-1.5 w-full rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${proj.progress}%` }}
                transition={{ duration: 0.8, delay: 0.5 + i * 0.07, ease: 'easeOut' }}
                className="h-full rounded-full relative overflow-hidden"
                style={{ background: `linear-gradient(90deg, ${proj.color}aa, ${proj.color})` }}
              >
                {/* Shimmer */}
                <div
                  className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"
                  style={{ animationDuration: '2s' }}
                />
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </GlassCard>
  );
}
