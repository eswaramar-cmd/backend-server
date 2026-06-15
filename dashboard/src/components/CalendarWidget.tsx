import { motion } from 'framer-motion';
import { useState } from 'react';
import GlassCard from './GlassCard';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December'
];

const events: Record<number, { label: string; color: string }> = {
  5:  { label: 'Launch MVP',      color: '#ef4444' },
  8:  { label: 'API Integration', color: '#3b82f6' },
  12: { label: 'Design Review',   color: '#8b5cf6' },
  15: { label: 'Sprint Planning', color: '#10b981' },
  20: { label: 'Team Sync',       color: '#f59e0b' },
  25: { label: 'Q2 Demo',         color: '#06b6d4' },
};

export default function CalendarWidget() {
  const now = new Date();
  const [current, setCurrent] = useState({ year: now.getFullYear(), month: now.getMonth() });
  const today = now.getDate();

  const firstDay = new Date(current.year, current.month, 1).getDay();
  const daysInMonth = new Date(current.year, current.month + 1, 0).getDate();

  const prev = () => {
    setCurrent(c => c.month === 0 ? { year: c.year - 1, month: 11 } : { ...c, month: c.month - 1 });
  };
  const next = () => {
    setCurrent(c => c.month === 11 ? { year: c.year + 1, month: 0 } : { ...c, month: c.month + 1 });
  };

  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const isCurrentMonth = current.month === now.getMonth() && current.year === now.getFullYear();

  return (
    <GlassCard delay={0.5} hover={false} className="!p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-base font-bold text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Calendar
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">Upcoming events & deadlines</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={prev} className="p-1.5 rounded-lg text-slate-400 hover:bg-blue-500/10 hover:text-blue-400 transition-all">
            <HiChevronLeft className="h-4 w-4" />
          </button>
          <span className="text-sm font-semibold text-white min-w-[120px] text-center">
            {MONTHS[current.month]} {current.year}
          </span>
          <button onClick={next} className="p-1.5 rounded-lg text-slate-400 hover:bg-blue-500/10 hover:text-blue-400 transition-all">
            <HiChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 mb-2">
        {DAYS.map(d => (
          <div key={d} className="text-center text-[10px] font-semibold text-slate-500 uppercase py-1">
            {d}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-y-1">
        {cells.map((day, i) => {
          if (!day) return <div key={`empty-${i}`} />;
          const event = isCurrentMonth ? events[day] : undefined;
          const isToday = isCurrentMonth && day === today;

          return (
            <motion.div
              key={day}
              whileHover={{ scale: 1.15 }}
              className="relative flex flex-col items-center py-1 cursor-pointer group"
            >
              <div
                className={`relative h-7 w-7 flex items-center justify-center rounded-lg text-xs font-medium transition-all duration-200 ${
                  isToday
                    ? 'text-white font-bold'
                    : event
                    ? 'text-white'
                    : 'text-slate-400 hover:text-white hover:bg-blue-500/10'
                }`}
                style={
                  isToday
                    ? { background: 'linear-gradient(135deg, #3b82f6, #06b6d4)', boxShadow: '0 0 12px rgba(59,130,246,0.5)' }
                    : event
                    ? { background: `${event.color}22`, color: event.color }
                    : {}
                }
              >
                {day}
                {event && !isToday && (
                  <span
                    className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full"
                    style={{ background: event.color }}
                  />
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Upcoming events */}
      <div className="mt-4 pt-4 border-t border-blue-500/10">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-500 mb-3">Upcoming</p>
        <div className="space-y-2">
          {Object.entries(events).slice(0, 3).map(([day, ev]) => (
            <div key={day} className="flex items-center gap-2.5">
              <div className="h-2 w-2 rounded-full flex-shrink-0" style={{ background: ev.color, boxShadow: `0 0 6px ${ev.color}` }} />
              <div
                className="text-xs font-semibold w-5 text-center flex-shrink-0"
                style={{ color: ev.color }}
              >
                {day}
              </div>
              <span className="text-xs text-slate-400 truncate">{ev.label}</span>
            </div>
          ))}
        </div>
      </div>
    </GlassCard>
  );
}
