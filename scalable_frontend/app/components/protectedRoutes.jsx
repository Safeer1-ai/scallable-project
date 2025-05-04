'use client';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProtectedRoute({ children, role }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || (role && user.role !== role))) {
      router.push('/login'); // redirect to login or unauthorized
    }
  }, [user, loading, role]);

  if (loading || !user || (role && user.role !== role)) return null;

  return children;
}
