import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiOutlineCalendar, HiOutlineClipboardList } from 'react-icons/hi';
import { TEAM_MEMBERS } from '../../data/teamMembers';
import type { Project } from '../../types/project';
import { formatDate } from '../../utils/formatDate';
import { PRIORITY_CONFIG, resolveStatus, STATUS_CONFIG } from '../../utils/projectHelpers';
import AvatarGroup from '../avatars/AvatarGroup';
import Badge from '../ui/Badge';

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const status = resolveStatus(project);
  const members = TEAM_MEMBERS.filter((m) => project.teamMemberIds.includes(m.id));
  const priority = PRIORITY_CONFIG[project.priority];
  const statusCfg = STATUS_CONFIG[status];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.35 }}
      whileHover={{ scale: 1.02, y: -4 }}
      className="group"
    >
      <Link
        to={`/projects/${project.id}`}
        className="block overflow-hidden rounded-2xl border border-slate-200/80 bg-white/90 shadow-md shadow-slate-200/40 backdrop-blur-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-violet-300/25 dark:border-slate-700 dark:bg-slate-800/90 dark:shadow-slate-900/50 dark:hover:shadow-violet-500/15"
      >
        <div className="h-3" style={{ backgroundColor: project.coverColor }} />
        <div className="p-5">
          <div className="mb-3 flex items-start justify-between gap-2">
            <h3 className="text-lg font-bold text-slate-900 transition group-hover:text-violet-600 dark:text-white dark:group-hover:text-violet-400">
              {project.name}
            </h3>
            <span className="text-sm font-bold text-violet-600 dark:text-violet-400">
              {project.progress}%
            </span>
          </div>

          <p className="mb-4 line-clamp-2 text-sm text-slate-500 dark:text-slate-400">
            {project.description}
          </p>

          <div className="mb-4 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${project.progress}%` }}
              transition={{ duration: 0.8, delay: index * 0.06 + 0.2 }}
              className="h-full rounded-full"
              style={{ backgroundColor: project.coverColor }}
            />
          </div>

          <div className="mb-4 flex flex-wrap items-center gap-2">
            <Badge className={priority.className}>{priority.label}</Badge>
            <Badge className={statusCfg.className}>{statusCfg.label}</Badge>
          </div>

          <div className="flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-700">
            <AvatarGroup members={members} />
            <div className="flex flex-col items-end gap-1 text-xs text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1">
                <HiOutlineClipboardList className="h-3.5 w-3.5" />
                {project.taskCount} tasks
              </span>
              <span className="flex items-center gap-1">
                <HiOutlineCalendar className="h-3.5 w-3.5" />
                {formatDate(project.dueDate)}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
