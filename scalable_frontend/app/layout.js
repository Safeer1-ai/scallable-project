import './globals.css';
import { AuthProvider } from '../context/AuthContext';
import Header from './components/Header.jsx';
import Sidebar from './components/Sidebar.jsx';

export const metadata = {
  title: 'Safeer Media App',
  description: 'Media upload and sharing',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 flex h-screen">
        <AuthProvider>
          <Sidebar />
          <div className="flex flex-col flex-1">
            <Header />
            <main className="p-4">{children}</main>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
