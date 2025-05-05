'use client';
import { useState } from "react";
import { FolderUp } from "lucide-react"; // decent-looking upload icon

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

      alert("✅ Upload successful!");
    } catch (error) {
      console.error("Upload error:", error.message);
      alert("Upload error: " + error.message);
    }
  };

  return (
    <div className="bg-white max-w-2xl mx-auto mt-10 p-8 rounded-2xl shadow-md border border-gray-200 font-mono">
      <h2 className="text-3xl font-bold text-indigo-700 mb-6 text-center">📤 Upload Your Media</h2>

      <div className="space-y-4">
        {/* Custom File Input */}
        <div className="flex items-center space-x-4">
          <label className="cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-xl shadow inline-flex items-center space-x-3 text-lg">
            <FolderUp className="w-7 h-7" />
            <span>Choose File</span>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="hidden"
            />
          </label>
          <span className="text-gray-700 truncate max-w-xs">
            {file ? file.name : "No file chosen"}
          </span>
        </div>

        {/* Metadata Inputs */}
        {["title", "caption", "location", "people"].map(field => (
          <input
            key={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-yellow-50 text-gray-800 shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-400"
            onChange={e => setMeta({ ...meta, [field]: e.target.value })}
          />
        ))}

        <button
          onClick={handleUpload}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition duration-200 shadow-lg text-lg"
        >
          🚀 Upload
        </button>
      </div>
    </div>
  );
}
