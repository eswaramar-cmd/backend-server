import { useState } from 'react';
import { HiOutlineArrowRight, HiOutlineLockClosed, HiOutlineMail } from 'react-icons/hi';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login, setAuthView } = useAuth();
  const [email, setEmail] = useState('amar@gmail.com');
  const [password, setPassword] = useState('password');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(email, password);
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-white/20 bg-white/95 p-8 shadow-2xl backdrop-blur-xl">
      <div className="mb-6 flex justify-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-blue-600 text-2xl font-bold text-white shadow-lg shadow-violet-500/30">
          F
        </div>
      </div>

      <h1 className="text-center text-2xl font-bold text-slate-900">Welcome Back</h1>
      <p className="mt-1 text-center text-sm text-slate-500">
        Sign in to continue to your dashboard
      </p>

      <div className="mt-6 flex gap-2 rounded-xl bg-slate-100 p-1">
        <button type="button" className="flex-1 rounded-lg bg-gradient-to-r from-violet-600 to-blue-600 py-2.5 text-sm font-semibold text-white shadow-md">
          Login
        </button>
        <button
          type="button"
          onClick={() => setAuthView('register')}
          className="flex-1 rounded-lg py-2.5 text-sm font-medium text-slate-600 transition hover:bg-white"
        >
          Register
        </button>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label htmlFor="email" className="mb-1.5 flex items-center gap-2 text-sm font-medium text-slate-700">
            <HiOutlineMail className="h-4 w-4 text-violet-600" />
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
          />
        </div>

        <div>
          <label htmlFor="password" className="mb-1.5 flex items-center gap-2 text-sm font-medium text-slate-700">
            <HiOutlineLockClosed className="h-4 w-4 text-violet-600" />
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
          />
        </div>

        {error && (
          <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/30 transition hover:opacity-95 disabled:opacity-60"
        >
          {loading ? 'Signing in...' : 'Sign In'}
          {!loading && <HiOutlineArrowRight className="h-4 w-4" />}
        </button>
      </form>

      <div className="mt-6 rounded-xl bg-slate-50 p-4 text-center text-xs text-slate-600">
        <p className="font-semibold text-slate-700">Demo Credentials</p>
        <p className="mt-1">
          Email: <code className="rounded bg-white px-1">amar@gmail.com</code>
        </p>
        <p>
          Password: <code className="rounded bg-white px-1">password</code>
        </p>
      </div>

      <p className="mt-4 text-center text-xs text-slate-400">Protected by JWT Authentication</p>
    </div>
  );
}
