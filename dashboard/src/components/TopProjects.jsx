import { HiOutlineTrendingUp } from 'react-icons/hi';
import GlassCard from './GlassCard';
import { topProjects } from '../data/mockData';

const statusStyles = {
  'On Track': 'text-emerald-600 dark:text-emerald-400',
  'At Risk': 'text-amber-600 dark:text-amber-400',
  Ahead: 'text-blue-600 dark:text-blue-400',
};

export default function TopProjects({ delay = 0.45 }) {
  return (
    <GlassCard delay={delay} className="lg:col-span-2">
      <div className="mb-4 flex items-center gap-2">
        <HiOutlineTrendingUp className="h-5 w-5 text-violet-600 dark:text-violet-400" />
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Top Projects</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[400px] text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500 dark:border-slate-700">
              <th className="pb-3 font-medium">Project</th>
              <th className="pb-3 font-medium">Progress</th>
              <th className="pb-3 font-medium">Team</th>
              <th className="pb-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
            {topProjects.map((project) => (
              <tr key={project.id} className="group transition hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                <td className="py-3.5">
                  <div className="flex items-center gap-2">
                    <span className={`h-2.5 w-2.5 rounded-full ${project.color}`} />
                    <span className="font-medium text-slate-900 dark:text-white">{project.name}</span>
                  </div>
                </td>
                <td className="py-3.5">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-24 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                      <div
                        className={`h-full rounded-full ${project.color} transition-all`}
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
                      {project.progress}%
                    </span>
                  </div>
                </td>
                <td className="py-3.5 text-slate-600 dark:text-slate-400">{project.team} members</td>
                <td className={`py-3.5 font-medium ${statusStyles[project.status]}`}>
                  {project.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </GlassCard>
  );
}
