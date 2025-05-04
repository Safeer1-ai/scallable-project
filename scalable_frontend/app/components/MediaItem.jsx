import CommentSection from "./CommentSection";

export default function MediaItem({ media }) {
  const isVideo = media?.path?.endsWith(".mp4") || media?.path?.endsWith(".webm");

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-6 max-w-2xl mx-auto mb-6">
      <h3 className="text-2xl font-semibold text-indigo-700 mb-3">{media.title}</h3>

      <div className="rounded-xl overflow-hidden border mb-4">
        {isVideo ? (
          <video controls className="w-full h-auto">
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

      <div className="text-gray-700 space-y-1 mb-4">
        <p className="text-base">{media.caption}</p>
        <p className="text-sm text-gray-500">📍 <span className="italic">{media.location}</span></p>
        <p className="text-sm text-gray-500">👥 <span className="italic">{media.people}</span></p>
      </div>

      <div className="pt-4 border-t">
        <CommentSection mediaId={media.id} />
      </div>
    </div>
  );
}
