import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { loginAdmin } from '../services/authApi';

function AdminLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await loginAdmin(email, password);
      navigate('/admin', { replace: true });
    } catch (err) {
      setError(err.message || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Admin Login | Dua Property</title>
      </Helmet>

      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4 pt-24 pb-10">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-200 p-6 sm:p-8">
          <h1 className="text-2xl font-bold text-dua-text mb-2">Admin Login</h1>
          <p className="text-sm text-dua-body mb-6">Sign in to manage properties.</p>

          {error && (
            <div className="mb-4 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-dua-text mb-1">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-dua-primary/30"
                placeholder="admin@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-dua-text mb-1">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-dua-primary/30"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-dua-primary hover:bg-cyan-700 disabled:opacity-60 text-white font-semibold py-2.5 rounded-lg transition-colors"
            >
              {loading ? 'Signing in...' : 'Login'}
            </button>
          </form>
        </div>
      </main>
    </>
  );
}

export default AdminLoginPage;
