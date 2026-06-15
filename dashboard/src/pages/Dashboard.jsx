import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import ProjectOverviewChart from '../charts/ProjectOverviewChart';
import TaskStatusChart from '../charts/TaskStatusChart';
import RecentActivity from '../components/RecentActivity';
import StatCard from '../components/StatCard';
import TeamWorkload from '../components/TeamWorkload';
import TopProjects from '../components/TopProjects';
import UpcomingDeadlines from '../components/UpcomingDeadlines';
import { stats } from '../data/mockData';
import { BackgroundBeamsWithCollision } from '../components/ui/background-beams-with-collision';

export default function Dashboard() {
  const { user } = useAuth();
  const firstName = user?.email?.split('@')[0] ?? 'there';

  return (
    <div className="mx-auto max-w-[1600px] space-y-6">
      <BackgroundBeamsWithCollision className="h-44 md:h-52 rounded-3xl mb-6 flex flex-col justify-center px-8 text-left items-start bg-gradient-to-r from-indigo-900/10 via-violet-900/5 to-blue-900/10 border border-slate-200/50 dark:border-slate-800/50 shadow-xl overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-20"
        >
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white font-sans">
            Welcome back, <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">{firstName}</span>!
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mt-2 text-xs md:text-base max-w-2xl font-medium">
            Here&apos;s what&apos;s happening with your projects, workload, and deadlines today.
          </p>
        </motion.div>
      </BackgroundBeamsWithCollision>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {stats.map((stat, index) => (
          <StatCard key={stat.id} stat={stat} index={index} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <ProjectOverviewChart />
        <TaskStatusChart />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <UpcomingDeadlines />
        <RecentActivity />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <TeamWorkload />
        <TopProjects />
      </div>
    </div>
  );
}
