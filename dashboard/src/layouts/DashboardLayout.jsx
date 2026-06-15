import { motion } from 'framer-motion';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';
import { useSidebar } from '../hooks/useSidebar';
import { useTheme } from '../hooks/useTheme';

function resolveActiveNav(pathname) {
  if (pathname === '/') return 'dashboard';
  if (pathname.startsWith('/projects')) return 'projects';
  const segment = pathname.split('/')[1];
  return segment || 'dashboard';
}

export default function DashboardLayout() {
  const { user, logout } = useAuth();
  const { darkMode, toggleTheme } = useTheme();
  const { isOpen, isMobile, toggle, close } = useSidebar();
  const { pathname } = useLocation();
  const activeNav = resolveActiveNav(pathname);

  return (
    <div className="flex min-h-screen bg-[#f8fafc] dark:bg-slate-950">
      {!isMobile && (
        <Sidebar activeId={activeNav} isOpen isMobile={false} onClose={close} />
      )}

      {isMobile && (
        <Sidebar activeId={activeNav} isOpen={isOpen} isMobile onClose={close} />
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <Navbar
          onMenuClick={toggle}
          darkMode={darkMode}
          onToggleTheme={toggleTheme}
          showMenuButton={isMobile}
          userEmail={user?.email}
          onLogout={logout}
        />

        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8"
        >
          <Outlet />
        </motion.main>
      </div>
    </div>
  );
}
