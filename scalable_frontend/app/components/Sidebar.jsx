'use client';

import Link from 'next/link';

export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-white text-black flex flex-col justify-center items-center border-r border-gray-200">

      <nav className="flex flex-col space-y-6 w-full px-6">
        <Link
          href="/"
          className="text-lg hover:bg-gray-100 p-3 rounded-md text-center"
        >
          Home
        </Link>
        <Link
          href="/UploadForm"
          className="text-lg hover:bg-gray-100 p-3 rounded-md text-center"
        >
          Upload Videos
        </Link>
        <Link
          href="/profile"
          className="text-lg hover:bg-gray-100 p-3 rounded-md text-center"
        >
          Profile
        </Link>
        <button className="text-lg hover:bg-gray-100 p-3 rounded-md text-center">
          Logout
        </button>
      </nav>
    </div>
  );
}
