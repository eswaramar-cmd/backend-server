import { motion } from 'framer-motion';
import { HiTrendingUp, HiTrendingDown } from 'react-icons/hi';
import {
  HiOutlineCheckCircle,
  HiOutlineClipboardList,
  HiOutlineClock,
  HiOutlineFolder,
  HiOutlineUserGroup,
  HiOutlineChartBar,
} from 'react-icons/hi';
import { ElementType } from 'react';

const icons: Record<string, ElementType> = {
  projects: HiOutlineFolder,
  tasks: HiOutlineClipboardList,
  completed: HiOutlineCheckCircle,
  pending: HiOutlineClock,
  team: HiOutlineUserGroup,
  productivity: HiOutlineChartBar,
};

const gradients: Record<string, { from: string; to: string; glow: string }> = {
  projects:    { from: '#3b82f6', to: '#6366f1', glow: 'rgba(59,130,246,0.4)' },
  tasks:       { from: '#06b6d4', to: '#3b82f6', glow: 'rgba(6,182,212,0.4)' },
  completed:   { from: '#10b981', to: '#06b6d4', glow: 'rgba(16,185,129,0.4)' },
  pending:     { from: '#f59e0b', to: '#ef4444', glow: 'rgba(245,158,11,0.4)' },
  team:        { from: '#8b5cf6', to: '#6366f1', glow: 'rgba(139,92,246,0.4)' },
  productivity:{ from: '#ec4899', to: '#8b5cf6', glow: 'rgba(236,72,153,0.4)' },
};

interface Stat {
  id: string;
  label: string;
  value: number | string;
  change: string;
  trend: 'up' | 'down';
  icon: string;
  subtitle?: string;
}

interface StatCardProps {
  stat: Stat;
  index: number;
}

export default function StatCard({ stat, index }: StatCardProps) {
  const Icon = icons[stat.icon] || HiOutlineFolder;
  const grad = gradients[stat.icon] || gradients.projects;
  const isUp = stat.trend === 'up';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="glass-card p-5 relative overflow-hidden cursor-default group"
    >
      {/* Background gradient glow */}
      <div
        className="absolute -top-6 -right-6 h-24 w-24 rounded-full blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"
        style={{ background: `radial-gradient(circle, ${grad.from}, transparent)` }}
      />

      {/* Top row */}
      <div className="flex items-start justify-between mb-4">
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          className="flex h-11 w-11 items-center justify-center rounded-xl text-white shadow-lg relative"
          style={{
            background: `linear-gradient(135deg, ${grad.from}, ${grad.to})`,
            boxShadow: `0 0 20px ${grad.glow}`,
          }}
        >
          <Icon className="h-5 w-5" />
        </motion.div>

        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: index * 0.08 + 0.3, type: 'spring' }}
          className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
            isUp
              ? 'badge-success'
              : 'badge-danger'
          }`}
        >
          {isUp ? <HiTrendingUp className="h-3 w-3" /> : <HiTrendingDown className="h-3 w-3" />}
          {stat.change}
        </motion.span>
      </div>

      {/* Value */}
      <motion.p
        className="text-3xl font-bold text-white tracking-tight mb-1"
        style={{ fontFamily: 'Space Grotesk, sans-serif' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: index * 0.08 + 0.2 }}
      >
        {stat.value}
      </motion.p>

      <p className="text-sm text-slate-400 font-medium">{stat.label}</p>

      {stat.subtitle && (
        <p className="text-xs text-slate-500 mt-1">{stat.subtitle}</p>
      )}

      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500 rounded-full"
        style={{ background: `linear-gradient(90deg, ${grad.from}, ${grad.to})` }}
      />
    </motion.div>
  );
}
