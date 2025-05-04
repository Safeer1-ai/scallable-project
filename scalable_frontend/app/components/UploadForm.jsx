'use client';
import { useState } from "react";

export default function UploadForm() {
  const [file, setFile] = useState(null);
  const [meta, setMeta] = useState({
    title: "", caption: "", location: "", people: "",
  });

  const handleUpload = async () => {
    if (!file) return alert('Please select a file.');

    const formData = new FormData();
    formData.append("mediaFile", file);
    Object.entries(meta).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      const response = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Upload failed');
      }

      alert("Upload successful!");
    } catch (error) {
      console.error("Upload error:", error.message);
      alert("Upload error: " + error.message);
    }
  };

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Creator Upload</h2>
      <div className="space-y-3">
        <input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="block w-full p-2 border rounded"
        />
        {["title", "caption", "location", "people"].map(field => (
          <input
            key={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            className="w-full border p-2 rounded"
            onChange={e => setMeta({ ...meta, [field]: e.target.value })}
          />
        ))}
        <button
          onClick={handleUpload}
          className="w-full bg-green-600 text-white p-3 rounded mt-2 hover:bg-green-700 transition"
        >
          Upload
        </button>
      </div>
    </div>
  );
}
