import ProtectedRoute from '../components/protectedRoutes';

export default function AdminPage() {
  return (
    <ProtectedRoute role="admin">
      <div>Welcome Admin</div>
    </ProtectedRoute>
  );
}
