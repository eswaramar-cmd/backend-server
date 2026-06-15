import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  HiOutlineBell,
  HiOutlineLogout,
  HiOutlineMenu,
  HiOutlineMoon,
  HiOutlinePlus,
  HiOutlineSearch,
  HiOutlineSun,
} from 'react-icons/hi';

function getInitials(email) {
  if (!email) return '?';
  const name = email.split('@')[0];
  return name.slice(0, 2).toUpperCase();
}

export default function Navbar({
  onMenuClick,
  darkMode,
  onToggleTheme,
  showMenuButton,
  userEmail,
  onLogout,
}) {
  const initials = getInitials(userEmail);
  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-30 flex flex-wrap items-center gap-3 border-b border-slate-200/80 bg-[#f8fafc]/80 px-4 py-3 backdrop-blur-xl dark:border-slate-700/50 dark:bg-slate-900/80 sm:px-6 lg:px-8"
    >
      {showMenuButton && (
        <button
          type="button"
          onClick={onMenuClick}
          className="rounded-xl p-2 text-slate-600 hover:bg-slate-200/80 dark:text-slate-300 dark:hover:bg-slate-700 lg:hidden"
          aria-label="Open menu"
        >
          <HiOutlineMenu className="h-6 w-6" />
        </button>
      )}

      <div className="relative min-w-0 flex-1 sm:max-w-md">
        <HiOutlineSearch className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
        <input
          type="search"
          placeholder="Search projects, tasks..."
          className="w-full rounded-xl border border-slate-200/80 bg-white/80 py-2.5 pl-10 pr-4 text-sm text-slate-800 shadow-sm transition focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-400/20 dark:border-slate-600 dark:bg-slate-800/80 dark:text-white dark:placeholder:text-slate-500"
        />
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <button
          type="button"
          onClick={onToggleTheme}
          className="rounded-xl p-2.5 text-slate-600 transition hover:bg-slate-200/80 dark:text-slate-300 dark:hover:bg-slate-700"
          aria-label={darkMode ? 'Light mode' : 'Dark mode'}
        >
          {darkMode ? <HiOutlineSun className="h-5 w-5" /> : <HiOutlineMoon className="h-5 w-5" />}
        </button>

        <button
          type="button"
          className="relative rounded-xl p-2.5 text-slate-600 transition hover:bg-slate-200/80 dark:text-slate-300 dark:hover:bg-slate-700"
          aria-label="Notifications"
        >
          <HiOutlineBell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-violet-500 ring-2 ring-[#f8fafc] dark:ring-slate-900" />
        </button>

        <Link
          to="/projects"
          className="hidden items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition hover:shadow-violet-500/40 sm:inline-flex"
        >
          <HiOutlinePlus className="h-4 w-4" />
          New Project
        </Link>

        <button
          type="button"
          onClick={onLogout}
          className="rounded-xl p-2.5 text-slate-600 transition hover:bg-red-50 hover:text-red-600 dark:text-slate-300 dark:hover:bg-red-900/30 dark:hover:text-red-400"
          title="Sign out"
          aria-label="Sign out"
        >
          <HiOutlineLogout className="h-5 w-5" />
        </button>

        <div
          className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-blue-500 text-sm font-bold text-white ring-2 ring-white dark:ring-slate-800"
          title={userEmail}
        >
          {initials}
        </div>
      </div>
    </motion.header>
  );
}
