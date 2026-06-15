import { AnimatePresence, motion } from 'framer-motion';
import { NavLink, useLocation } from 'react-router-dom';
import {
  HiOutlineCalendar,
  HiOutlineChartBar,
  HiOutlineClock,
  HiOutlineCog,
  HiOutlineDocument,
  HiOutlineFolder,
  HiOutlineHome,
  HiOutlineUserGroup,
  HiOutlineViewBoards,
  HiOutlineClipboardList,
  HiX,
  HiSparkles,
  HiOutlineLightningBolt,
} from 'react-icons/hi';
import { navItems } from '../data/mockData';

const iconMap: Record<string, React.ElementType> = {
  dashboard: HiOutlineHome,
  projects: HiOutlineFolder,
  tasks: HiOutlineClipboardList,
  kanban: HiOutlineViewBoards,
  calendar: HiOutlineCalendar,
  team: HiOutlineUserGroup,
  files: HiOutlineDocument,
  time: HiOutlineClock,
  reports: HiOutlineChartBar,
  settings: HiOutlineCog,
};

function isNavActive(path: string, pathname: string) {
  if (path === '/') return pathname === '/';
  if (path === '/projects') return pathname.startsWith('/projects');
  return pathname === path || pathname.startsWith(`${path}/`);
}

interface SidebarProps {
  activeId: string;
  isOpen: boolean;
  isMobile: boolean;
  onClose: () => void;
}

export default function Sidebar({ activeId, isOpen, isMobile, onClose }: SidebarProps) {
  const { pathname } = useLocation();

  const sidebarContent = (
    <aside className="sidebar-glass flex h-full w-64 shrink-0 flex-col text-white relative overflow-hidden">
      {/* Top glow accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-24 bg-blue-500/5 blur-2xl rounded-full" />

      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-6 border-b border-blue-500/10">
        <NavLink to="/" className="flex items-center gap-3" onClick={isMobile ? onClose : undefined}>
          <motion.div
            whileHover={{ scale: 1.05, rotate: 5 }}
            className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg"
            style={{ boxShadow: '0 0 20px rgba(59,130,246,0.5)' }}
          >
            <HiSparkles className="text-white text-lg" />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 to-transparent" />
          </motion.div>
          <div>
            <h1 className="text-base font-bold tracking-tight text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              FlowBoard
            </h1>
            <p className="text-[10px] text-blue-400/70 font-medium uppercase tracking-widest">AI Project Suite</p>
          </div>
        </NavLink>

        {isMobile && (
          <button
            type="button"
            onClick={onClose}
            className="ml-auto rounded-lg p-1.5 text-slate-400 hover:bg-blue-500/10 hover:text-white transition-all"
            aria-label="Close sidebar"
          >
            <HiX className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 scrollbar-thin">
        <div className="mb-2 px-3">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">Main Menu</span>
        </div>
        <ul className="space-y-1">
          {navItems.map((item, i) => {
            const Icon = iconMap[item.icon];
            const isActive = isNavActive(item.path, pathname) || activeId === item.id;

            return (
              <motion.li
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04, duration: 0.3 }}
              >
                <NavLink
                  to={item.path}
                  onClick={isMobile ? onClose : undefined}
                  className={`group relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'nav-active text-blue-300'
                      : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-gradient-to-b from-blue-400 to-cyan-400 rounded-full"
                      style={{ boxShadow: '0 0 6px rgba(59,130,246,0.8)' }}
                    />
                  )}
                  <Icon
                    className={`h-4.5 w-4.5 shrink-0 transition-all duration-200 ${
                      isActive
                        ? 'text-blue-400'
                        : 'text-slate-500 group-hover:text-blue-400'
                    }`}
                  />
                  <span className="flex-1">{item.label}</span>
                  {isActive && (
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
                  )}
                </NavLink>
              </motion.li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom upgrade card */}
      <div className="p-4 border-t border-blue-500/10">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="relative rounded-2xl p-4 overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(59,130,246,0.15), rgba(6,182,212,0.1))',
            border: '1px solid rgba(59,130,246,0.25)',
          }}
        >
          <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/10 blur-xl rounded-full" />
          <div className="flex items-center gap-2 mb-1">
            <HiOutlineLightningBolt className="text-yellow-400 h-4 w-4" />
            <p className="text-xs font-semibold text-blue-300">Pro Plan</p>
          </div>
          <p className="text-[11px] text-slate-400 mb-3">Unlock AI insights & unlimited projects</p>
          <button
            type="button"
            className="btn-neon w-full rounded-lg py-2 text-xs font-bold text-white transition-all"
          >
            Upgrade to Pro
          </button>
        </motion.div>

        {/* User mini profile */}
        <div className="mt-3 flex items-center gap-3 px-1">
          <div
            className="h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
            style={{ background: 'linear-gradient(135deg, #3b82f6, #06b6d4)', boxShadow: '0 0 10px rgba(59,130,246,0.4)' }}
          >
            AM
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-slate-200 truncate">Amareswar</p>
            <p className="text-[10px] text-slate-500 truncate">admin@flowboard.ai</p>
          </div>
          <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" title="Online" />
        </div>
      </div>
    </aside>
  );

  if (!isMobile) return sidebarContent;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 left-0 z-50 lg:hidden"
          >
            {sidebarContent}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
