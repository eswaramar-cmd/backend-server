import { motion } from 'framer-motion';
import GlassCard from './GlassCard';
import { HiOutlineChartBar, HiTrendingUp, HiOutlineArrowRight } from 'react-icons/hi';

const metrics = [
  { label: 'On-time Delivery', value: 87, prev: 79, color: '#10b981' },
  { label: 'Bug Rate',          value: 12, prev: 18, color: '#ef4444', isLower: true },
  { label: 'Velocity',          value: 94, prev: 88, color: '#3b82f6' },
  { label: 'Team Satisfaction', value: 91, prev: 85, color: '#8b5cf6' },
];

const weeklyBars = [42, 68, 55, 78, 91, 84, 70];
const weekDays = ['M','T','W','T','F','S','S'];

export default function ReportsWidget() {
  return (
    <GlassCard delay={0.5} hover={false} className="!p-6">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <HiOutlineChartBar className="h-5 w-5 text-purple-400" />
          <div>
            <h3 className="text-base font-bold text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Reports
            </h3>
            <p className="text-xs text-slate-500">This week's performance</p>
          </div>
        </div>
        <button className="flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 font-medium transition-colors">
          Full report <HiOutlineArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Weekly bar chart */}
      <div className="mb-5">
        <div className="flex items-end gap-1.5 h-20">
          {weeklyBars.map((h, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full rounded-t-md overflow-hidden relative" style={{ height: '64px', background: 'rgba(255,255,255,0.04)' }}>
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ duration: 0.6, delay: 0.6 + i * 0.06, ease: 'easeOut' }}
                  className="absolute bottom-0 left-0 right-0 rounded-t-md"
                  style={{
                    background: i === 4
                      ? 'linear-gradient(180deg, #3b82f6, #6366f1)'
                      : 'linear-gradient(180deg, rgba(59,130,246,0.5), rgba(99,102,241,0.3))',
                    boxShadow: i === 4 ? '0 0 8px rgba(59,130,246,0.4)' : 'none',
                  }}
                />
              </div>
              <span className="text-[9px] text-slate-500 font-medium">{weekDays[i]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* KPI Metrics */}
      <div className="space-y-3">
        {metrics.map((m, i) => {
          const delta = m.value - m.prev;
          const improved = m.isLower ? delta < 0 : delta > 0;
          return (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.65 + i * 0.07 }}
              className="flex items-center gap-3"
            >
              <div className="w-28 flex-shrink-0">
                <p className="text-[11px] font-medium text-slate-400">{m.label}</p>
              </div>
              <div className="flex-1">
                <div className="h-1.5 w-full rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${m.value}%` }}
                    transition={{ duration: 0.7, delay: 0.7 + i * 0.07 }}
                    className="h-full rounded-full"
                    style={{ background: m.color, boxShadow: `0 0 6px ${m.color}80` }}
                  />
                </div>
              </div>
              <div className="flex items-center gap-2 w-20 justify-end flex-shrink-0">
                <span className="text-sm font-bold" style={{ fontFamily: 'Space Grotesk, sans-serif', color: m.color }}>
                  {m.value}{m.label === 'Bug Rate' ? '' : '%'}
                </span>
                <span className={`text-[10px] font-semibold flex items-center gap-0.5 ${improved ? 'text-emerald-400' : 'text-red-400'}`}>
                  <HiTrendingUp className={`h-3 w-3 ${!improved ? 'rotate-180' : ''}`} />
                  {Math.abs(delta)}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Summary stats row */}
      <div className="mt-5 pt-4 border-t border-blue-500/10 grid grid-cols-3 gap-3">
        {[
          { label: 'Sprints Done',   value: '8',    color: '#10b981' },
          { label: 'Velocity ↑',    value: '+12%',  color: '#3b82f6' },
          { label: 'Bugs Fixed',     value: '34',   color: '#8b5cf6' },
        ].map(s => (
          <div key={s.label} className="text-center">
            <p className="text-lg font-bold" style={{ fontFamily: 'Space Grotesk, sans-serif', color: s.color }}>{s.value}</p>
            <p className="text-[10px] text-slate-500">{s.label}</p>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
