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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full space-y-6 border border-gray-200">
        <h2 className="text-3xl font-bold text-gray-800 text-center">Upload Media</h2>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Select File</label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="w-full border border-gray-300 rounded-lg p-2 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>

        {["title", "caption", "location", "people"].map(field => (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input
              type="text"
              placeholder={`Enter ${field}`}
              value={meta[field]}
              onChange={e => setMeta({ ...meta, [field]: e.target.value })}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}

        <button
          onClick={handleUpload}
          className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Upload
        </button>
      </div>
    </div>
  );
}
