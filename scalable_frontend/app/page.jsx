'use client';

import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import MediaGallery from './components/MediaGallery';
import UploadForm from './components/UploadForm';

export default function Home() {
  const { user } = useContext(AuthContext);

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-indigo-600">
          📸 Safeer Media Sharing App
        </h1>

        {user ? (
          <>
            <MediaGallery />
            {user.role === 'admin' && (
              <>
                <hr className="my-8" />
                <UploadForm />
              </>
            )}
            {user.role !== 'admin' && (
              <p className="text-center text-sm text-gray-500 mt-4">
                You are logged in as a <strong>user</strong>. Upload is available for admins only.
              </p>
            )}
          </>
        ) : (
          <p className="text-center text-gray-600">Please log in to access the app.</p>
        )}
      </div>
    </main>
  );
}
