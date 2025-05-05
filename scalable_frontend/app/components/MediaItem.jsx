import CommentSection from "./CommentSection";

export default function MediaItem({ media }) {
  const isVideo =
    media?.path?.endsWith(".mp4") || media?.path?.endsWith(".webm");

  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-2xl shadow-md p-6 max-w-2xl mx-auto mb-6 font-mono">
      <h3 className="text-2xl font-bold text-center text-indigo-700 mb-4">
        🎞️ {media.title}
      </h3>

      <div className="rounded-xl overflow-hidden border border-gray-300 mb-4">
        {isVideo ? (
          <video controls className="w-full h-auto rounded">
            <source src={media.path} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <img
            src={media.path}
            alt={media.caption}
            className="w-full h-auto object-cover"
          />
        )}
      </div>

      <div className="bg-white p-4 rounded-xl shadow-inner border border-gray-100 space-y-2 mb-4">
        <p className="text-gray-800 text-base">📄 {media.caption}</p>
        <p className="text-sm text-gray-600">
          📍 <span className="italic">{media.location}</span>
        </p>
        <p className="text-sm text-gray-600">
          👥 <span className="italic">{media.people}</span>
        </p>
      </div>

      <div className="pt-4 border-t border-gray-300">
        <CommentSection mediaId={media.id} />
      </div>
    </div>
  );
}
