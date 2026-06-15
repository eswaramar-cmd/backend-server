import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import {
  HiOutlineBell,
  HiOutlineLogout,
  HiOutlineMenu,
  HiOutlinePlus,
  HiOutlineSearch,
  HiOutlineChatAlt2,
  HiOutlineLightningBolt,
} from 'react-icons/hi';

function getInitials(email?: string) {
  if (!email) return 'AM';
  const name = email.split('@')[0];
  return name.slice(0, 2).toUpperCase();
}

interface NavbarProps {
  onMenuClick: () => void;
  darkMode: boolean;
  onToggleTheme: () => void;
  showMenuButton: boolean;
  userEmail?: string;
  onLogout: () => void;
}

export default function Navbar({
  onMenuClick,
  showMenuButton,
  userEmail,
  onLogout,
}: NavbarProps) {
  const initials = getInitials(userEmail);
  const [showNotifs, setShowNotifs] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  const notifications = [
    { id: 1, text: 'Sarah completed "User Auth Flow"', time: '2m ago', dot: 'bg-emerald-400' },
    { id: 2, text: 'New comment on Dashboard Wireframes', time: '15m ago', dot: 'bg-blue-400' },
    { id: 3, text: 'Sprint planning starts in 1 hour', time: '1h ago', dot: 'bg-amber-400' },
  ];

  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="navbar-glass sticky top-0 z-30 flex items-center gap-4 px-4 py-3 sm:px-6"
    >
      {showMenuButton && (
        <button
          type="button"
          onClick={onMenuClick}
          className="rounded-xl p-2 text-slate-400 hover:bg-blue-500/10 hover:text-blue-400 transition-all lg:hidden"
          aria-label="Open menu"
        >
          <HiOutlineMenu className="h-5 w-5" />
        </button>
      )}

      {/* Search */}
      <motion.div
        animate={{ width: searchFocused ? '360px' : '280px' }}
        transition={{ duration: 0.2 }}
        className="relative hidden sm:block"
      >
        <HiOutlineSearch className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
        <input
          type="search"
          placeholder="Search projects, tasks, team..."
          className="input-dark w-full rounded-xl py-2.5 pl-10 pr-4 text-sm"
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
          id="global-search"
        />
        {searchFocused && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <kbd className="text-[10px] text-slate-500 bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700">⌘K</kbd>
          </div>
        )}
      </motion.div>

      <div className="flex-1" />

      <div className="flex items-center gap-2">
        {/* AI Badge */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="hidden md:flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold cursor-pointer"
          style={{
            background: 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(59,130,246,0.15))',
            border: '1px solid rgba(99,102,241,0.3)',
            color: '#a78bfa',
          }}
        >
          <HiOutlineLightningBolt className="h-3.5 w-3.5" />
          AI Insights
        </motion.div>

        {/* Messages */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          className="relative rounded-xl p-2.5 text-slate-400 hover:bg-blue-500/10 hover:text-blue-400 transition-all"
          aria-label="Messages"
        >
          <HiOutlineChatAlt2 className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-blue-400" style={{ boxShadow: '0 0 6px rgba(59,130,246,0.8)' }} />
        </motion.button>

        {/* Notifications */}
        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={() => setShowNotifs(!showNotifs)}
            className="relative rounded-xl p-2.5 text-slate-400 hover:bg-blue-500/10 hover:text-blue-400 transition-all"
            aria-label="Notifications"
          >
            <HiOutlineBell className="h-5 w-5" />
            <span
              className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-400"
              style={{ boxShadow: '0 0 6px rgba(239,68,68,0.8)' }}
            />
          </motion.button>

          <AnimatePresence>
            {showNotifs && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="glass-card absolute right-0 mt-2 w-80 overflow-hidden z-50"
                style={{ borderRadius: '16px' }}
              >
                <div className="flex items-center justify-between px-4 py-3 border-b border-blue-500/10">
                  <span className="text-sm font-semibold text-white">Notifications</span>
                  <span className="badge-info text-[10px] px-2 py-0.5 rounded-full font-medium">3 new</span>
                </div>
                <div className="divide-y divide-blue-500/5">
                  {notifications.map(n => (
                    <div key={n.id} className="flex items-start gap-3 px-4 py-3 hover:bg-blue-500/5 cursor-pointer transition-colors">
                      <div className={`mt-1 h-2 w-2 rounded-full flex-shrink-0 ${n.dot}`} />
                      <div className="flex-1">
                        <p className="text-xs text-slate-300">{n.text}</p>
                        <p className="text-[10px] text-slate-500 mt-1">{n.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-2 text-center">
                  <button className="text-xs text-blue-400 hover:text-blue-300 transition-colors">View all notifications</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* New Project Button */}
        <Link
          to="/projects"
          id="new-project-btn"
          className="btn-neon hidden sm:flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white"
        >
          <HiOutlinePlus className="h-4 w-4" />
          New Project
        </Link>

        {/* Logout */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          onClick={onLogout}
          className="rounded-xl p-2.5 text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all"
          title="Sign out"
          aria-label="Sign out"
        >
          <HiOutlineLogout className="h-5 w-5" />
        </motion.button>

        {/* Avatar */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl text-sm font-bold text-white ring-2 ring-blue-500/30"
          style={{
            background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
            boxShadow: '0 0 16px rgba(59,130,246,0.4)',
          }}
          title={userEmail}
        >
          {initials}
        </motion.div>
      </div>
    </motion.header>
  );
}
