'use client';

import Link from 'next/link';

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-pink-100 border-r-2 border-pink-300 font-mono text-sm flex items-center justify-center">
      <nav className="flex flex-col space-y-5 w-full px-6">
        <Link
          href="/"
          className="px-4 py-2 rounded-md bg-yellow-200 hover:bg-yellow-300 border border-yellow-400 shadow text-center transition duration-200"
        >
          🏠 Home
        </Link>
        <Link
          href="/MediaGallery"
          className="px-4 py-2 rounded-md bg-green-200 hover:bg-green-300 border border-green-400 shadow text-center transition duration-200"
        >
          🎞️ Upload Videos
        </Link>
        <Link
          href="/profile"
          className="px-4 py-2 rounded-md bg-blue-200 hover:bg-blue-300 border border-blue-400 shadow text-center transition duration-200"
        >
          👤 Profile
        </Link>
        <button
          className="px-4 py-2 rounded-md bg-red-200 hover:bg-red-300 border border-red-400 shadow text-center transition duration-200"
        >
          🔓 Logout
        </button>
      </nav>
    </aside>
  );
}
