'use client';

import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import MediaGallery from './components/MediaGallery';
import UploadForm from './components/UploadForm';

export default function Home() {
  const { user } = useContext(AuthContext);

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-700 to-blue-900 p-6 font-mono text-white">
      <div className="max-w-4xl mx-auto bg-gradient-to-r from-purple-800 to-pink-600 border-4 border-pink-400 rounded-2xl shadow-2xl p-8 backdrop-blur-lg">
        <h1 className="text-5xl font-extrabold text-center mb-8 text-cyan-200 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
          🌆 Safeer Media Sharing App
        </h1>

        {user ? (
          <>
            <MediaGallery />
            {user.role === 'admin' && (
              <>
                <hr className="my-8 border-cyan-400" />
                <UploadForm />
              </>
            )}
            {user.role !== 'admin' && (
              <p className="text-center text-sm text-cyan-100 mt-4">
                You are logged in as a <strong>user</strong>. Upload is available for admins only.
              </p>
            )}
          </>
        ) : (
          <p className="text-center text-cyan-100 mt-4">🚪 Please log in to access the app.</p>
        )}
      </div>
    </main>
  );
}
