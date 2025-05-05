'use client';
import ProtectedRoute from '../components/protectedRoutes';

export default function AdminPage() {
  return (
    <ProtectedRoute role="admin">
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="bg-white p-10 rounded-2xl shadow-md border border-gray-200 max-w-xl w-full text-center font-mono">
          <h1 className="text-4xl font-bold text-indigo-700 mb-4">🔐 Admin Dashboard</h1>
          <p className="text-gray-700 text-lg">Welcome, Admin! You have full access to the system.</p>
        </div>
      </div>
    </ProtectedRoute>
  );
}
