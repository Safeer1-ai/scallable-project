'use client';
import { useEffect, useState } from "react";
import MediaItem from "./MediaItem";

export default function MediaGallery() {
  const [mediadata, setMedia] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/media")
      .then(res => res.json())
      .then(data => {
        setMedia(data);
      });
  }, []);

  return (
    <div className="bg-yellow-100 p-6 rounded-xl shadow-lg border border-yellow-200">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6 font-mono">
        📷 Retro Media Gallery
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mediadata?.data?.map((m, index) => (
          <MediaItem key={index} media={m} />
        ))}
      </div>
    </div>
  );
}
