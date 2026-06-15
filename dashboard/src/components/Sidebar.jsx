import { motion, AnimatePresence } from 'framer-motion';
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
} from 'react-icons/hi';
import { navItems } from '../data/mockData';

const iconMap = {
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

function isNavActive(path, pathname) {
  if (path === '/') return pathname === '/';
  if (path === '/projects') return pathname.startsWith('/projects');
  return pathname === path || pathname.startsWith(`${path}/`);
}

export default function Sidebar({ activeId, isOpen, isMobile, onClose }) {
  const { pathname } = useLocation();

  const sidebarContent = (
    <aside className="flex h-full w-64 shrink-0 flex-col bg-gradient-to-b from-[#0f172a] to-[#1e1b4b] text-white shadow-2xl">
      <div className="flex items-center gap-3 border-b border-white/10 px-5 py-6">
        <NavLink to="/" className="flex items-center gap-3" onClick={isMobile ? onClose : undefined}>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-blue-500 shadow-lg shadow-violet-500/30">
            <span className="text-lg font-bold">F</span>
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight">FlowBoard</h1>
            <p className="text-xs text-slate-400">Project Management</p>
          </div>
        </NavLink>
        {isMobile && (
          <button
            type="button"
            onClick={onClose}
            className="ml-auto rounded-lg p-1.5 text-slate-400 hover:bg-white/10 hover:text-white"
            aria-label="Close sidebar"
          >
            <HiX className="h-5 w-5" />
          </button>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <ul className="space-y-0.5">
          {navItems.map((item) => {
            const Icon = iconMap[item.icon];
            const isActive = isNavActive(item.path, pathname) || activeId === item.id;
            return (
              <li key={item.id}>
                <NavLink
                  to={item.path}
                  onClick={isMobile ? onClose : undefined}
                  className={`group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-violet-600/90 to-blue-600/80 text-white shadow-lg shadow-violet-900/30'
                      : 'text-slate-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon
                    className={`h-5 w-5 shrink-0 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-violet-300'}`}
                  />
                  {item.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-white/10 p-4">
        <div className="rounded-xl bg-white/5 p-3 backdrop-blur-sm">
          <p className="text-xs font-medium text-violet-300">Pro Plan</p>
          <p className="mt-1 text-xs text-slate-400">Upgrade for unlimited projects</p>
          <button
            type="button"
            className="mt-2 w-full rounded-lg bg-gradient-to-r from-violet-600 to-blue-600 py-1.5 text-xs font-semibold transition hover:opacity-90"
          >
            Upgrade
          </button>
        </div>
      </div>
    </aside>
  );

  if (!isMobile) {
    return sidebarContent;
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
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
