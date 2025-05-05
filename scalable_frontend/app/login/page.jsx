'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failed');

      login(data.user);
      alert(`Welcome ${data.user.role}`);
      router.push('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 to-pink-100 px-4 font-mono">
      <div className="w-full max-w-md bg-white border-2 border-gray-300 rounded-xl shadow-lg p-8 space-y-6">
        <h1 className="text-4xl text-center text-pink-600 font-bold tracking-wide mb-2 retro-shadow">
          🚀 Login Portal
        </h1>

        {error && (
          <p className="text-red-600 bg-red-100 border border-red-300 rounded p-2 text-sm text-center">
            {error}
          </p>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">📧 Email</label>
            <input
              type="email"
              placeholder="you@retro.com"
              required
              className="w-full p-3 rounded-lg bg-yellow-50 border border-gray-400 shadow-inner focus:outline-none focus:ring-2 focus:ring-pink-400"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">🔑 Password</label>
            <input
              type="password"
              placeholder="••••••••"
              required
              className="w-full p-3 rounded-lg bg-yellow-50 border border-gray-400 shadow-inner focus:outline-none focus:ring-2 focus:ring-pink-400"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-pink-600 text-white font-bold py-3 rounded-lg hover:bg-pink-700 transition"
          >
            🚪 Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account?{' '}
          <button
            type="button"
            onClick={() => router.push('/register')}
            className="text-pink-600 font-semibold underline hover:text-pink-800"
          >
            Register here
          </button>
        </p>
      </div>
    </div>
  );
}
