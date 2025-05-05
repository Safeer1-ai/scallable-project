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