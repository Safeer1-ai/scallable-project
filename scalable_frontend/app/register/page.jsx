'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '', role: 'user' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Registration failed');

      alert('Registered successfully. Please login.');
      router.push('/login');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-100 to-yellow-100 px-4 font-mono">
      <div className="w-full max-w-md bg-white border-2 border-gray-300 p-8 rounded-2xl shadow-lg space-y-6">
        <h1 className="text-3xl font-bold text-center text-pink-600 retro-shadow mb-2">
          🎮 Register Account
        </h1>

        {error && (
          <p className="text-red-600 bg-red-100 border border-red-300 rounded p-2 text-sm text-center">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
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

          <div>
            <label className="block text-sm text-gray-700 mb-1">🧑 Role</label>
            <select
              className="w-full p-3 rounded-lg bg-yellow-50 border border-gray-400 shadow-inner focus:outline-none focus:ring-2 focus:ring-pink-400"
              onChange={(e) => setForm({ ...form, role: e.target.value })}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-pink-600 text-white font-bold py-3 rounded-lg hover:bg-pink-700 transition"
          >
            📝 Register
          </button>
        </form>

        <p className="text-sm text-gray-600 text-center mt-4">
          Already have an account?{' '}
          <button
            onClick={() => router.push('/login')}
            className="text-pink-600 font-semibold underline hover:text-pink-800"
          >
            Login here
          </button>
        </p>
      </div>
    </div>
  );
}
