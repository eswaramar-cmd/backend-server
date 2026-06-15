import { motion } from 'framer-motion';
import type { TeamMember } from '../../types/project';
import GlassCard from '../ui/GlassCard';

interface TeamMemberCardProps {
  member: TeamMember;
  index?: number;
}

export default function TeamMemberCard({ member, index = 0 }: TeamMemberCardProps) {
  return (
    <GlassCard delay={index * 0.06} className="text-center">
      <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 text-xl font-bold text-white shadow-lg">
        {member.avatar}
      </div>
      <h4 className="font-bold text-slate-900 dark:text-white">{member.name}</h4>
      <p className="text-sm text-slate-500 dark:text-slate-400">{member.role}</p>
      <div className="mt-4 grid grid-cols-2 gap-3 border-t border-slate-100 pt-4 dark:border-slate-700">
        <div>
          <p className="text-2xl font-bold text-violet-600 dark:text-violet-400">
            {member.tasksAssigned}
          </p>
          <p className="text-xs text-slate-500">Tasks</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
            {member.completionRate}%
          </p>
          <p className="text-xs text-slate-500">Completion</p>
        </div>
      </div>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${member.completionRate}%` }}
          transition={{ duration: 0.8, delay: index * 0.1 }}
          className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-600"
        />
      </div>
    </GlassCard>
  );
}
