import { useAuth } from '../context/AuthContext';
import AuthLayout from '../layouts/AuthLayout';
import Login from '../pages/Login';
import Register from '../pages/Register';

function LoadingScreen() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f8fafc] dark:bg-slate-950">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-violet-200 border-t-violet-600" />
        <p className="text-sm text-slate-500">Loading FlowBoard...</p>
      </div>
    </div>
  );
}

export default function AuthGate({ children }) {
  const { isAuthenticated, loading, authView } = useAuth();

  if (loading) return <LoadingScreen />;

  if (!isAuthenticated) {
    return (
      <AuthLayout>{authView === 'register' ? <Register /> : <Login />}</AuthLayout>
    );
  }

  return children;
}
