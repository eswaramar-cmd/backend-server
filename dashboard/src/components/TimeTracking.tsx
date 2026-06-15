import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import GlassCard from './GlassCard';
import { HiOutlinePlay, HiOutlinePause, HiOutlineStop, HiOutlineClock } from 'react-icons/hi';

const sessions = [
  { project: 'Product Redesign', task: 'Wireframe v3',       time: '2h 45m', color: '#3b82f6', pct: 68 },
  { project: 'Mobile App v2',    task: 'Component library',  time: '1h 20m', color: '#06b6d4', pct: 45 },
  { project: 'API Platform',     task: 'Auth endpoints',     time: '3h 10m', color: '#8b5cf6', pct: 80 },
];

export default function TimeTracking() {
  const [running, setRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(id);
  }, [running]);

  const fmt = (s: number) => {
    const h = Math.floor(s / 3600).toString().padStart(2, '0');
    const m = Math.floor((s % 3600) / 60).toString().padStart(2, '0');
    const sec = (s % 60).toString().padStart(2, '0');
    return `${h}:${m}:${sec}`;
  };

  return (
    <GlassCard delay={0.45} hover={false} className="!p-6">
      <div className="flex items-center gap-2 mb-5">
        <HiOutlineClock className="h-5 w-5 text-blue-400" />
        <div>
          <h3 className="text-base font-bold text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Time Tracking
          </h3>
          <p className="text-xs text-slate-500">Today: 7h 15m logged</p>
        </div>
      </div>

      {/* Active timer */}
      <div
        className="rounded-2xl p-4 mb-5 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.12), rgba(6,182,212,0.08))', border: '1px solid rgba(59,130,246,0.2)' }}
      >
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl opacity-20"
          style={{ background: 'radial-gradient(circle, #3b82f6, transparent)' }} />
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400 mb-1">Currently tracking</p>
            <p className="text-sm font-semibold text-white">Dashboard Redesign</p>
          </div>
          <motion.div
            className="text-2xl font-bold tabular-nums"
            style={{ fontFamily: 'Space Grotesk, sans-serif', color: running ? '#3b82f6' : '#64748b' }}
            animate={running ? { scale: [1, 1.02, 1] } : {}}
            transition={{ repeat: Infinity, duration: 1 }}
          >
            {fmt(seconds)}
          </motion.div>
        </div>
        <div className="flex items-center gap-2 mt-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setRunning(r => !r)}
            className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-white transition-all"
            style={{
              background: running
                ? 'linear-gradient(135deg, #f59e0b, #ef4444)'
                : 'linear-gradient(135deg, #3b82f6, #06b6d4)',
              boxShadow: running
                ? '0 0 16px rgba(245,158,11,0.4)'
                : '0 0 16px rgba(59,130,246,0.4)',
            }}
          >
            {running ? <HiOutlinePause className="h-4 w-4" /> : <HiOutlinePlay className="h-4 w-4" />}
            {running ? 'Pause' : 'Start'}
          </motion.button>
          {running && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => { setRunning(false); setSeconds(0); }}
              className="rounded-xl p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all"
            >
              <HiOutlineStop className="h-4 w-4" />
            </motion.button>
          )}
        </div>
      </div>

      {/* Recent sessions */}
      <div className="space-y-3">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">Recent Sessions</p>
        {sessions.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 + i * 0.06 }}
            className="flex items-center gap-3"
          >
            <div className="h-2 w-2 rounded-full flex-shrink-0" style={{ background: s.color, boxShadow: `0 0 6px ${s.color}` }} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <p className="text-xs font-medium text-slate-300 truncate">{s.task}</p>
                <span className="text-xs font-bold ml-2 flex-shrink-0" style={{ color: s.color, fontFamily: 'Space Grotesk, sans-serif' }}>{s.time}</span>
              </div>
              <div className="h-1 w-full rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${s.pct}%` }}
                  transition={{ duration: 0.8, delay: 0.7 + i * 0.06 }}
                  className="h-full rounded-full"
                  style={{ background: s.color, boxShadow: `0 0 6px ${s.color}` }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </GlassCard>
  );
}
