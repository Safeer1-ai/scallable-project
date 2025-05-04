'use client';
import { useEffect, useState } from "react";

export default function CommentSection({ mediaId }) {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/api/comments/${mediaId}`)
      .then(res => res.json())
      .then(data => setComments(data));
  }, [mediaId]);

  const postComment = async () => {
    if (!text.trim()) return;

    await fetch(`http://localhost:5000/api/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: mediaId, text }),
    });

    setComments(prev => [...prev, { text }]);
    setText("");
  };

  return (
    <div className="mt-6">
      <h4 className="text-lg font-semibold text-gray-800 mb-3">Comments</h4>

      <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
        {comments.length === 0 ? (
          <p className="text-gray-500 italic">No comments yet. Be the first!</p>
        ) : (
          comments.map((c, i) => (
            <div
              key={i}
              className="bg-gray-100 border border-gray-200 rounded-xl p-3 text-sm text-gray-800"
            >
              {c.text}
            </div>
          ))
        )}
      </div>

      <div className="mt-4 flex items-center gap-3">
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Write a comment..."
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={postComment}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition duration-200"
        >
          Post
        </button>
      </div>
    </div>
  );
}
