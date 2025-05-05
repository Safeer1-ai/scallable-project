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
    <div className="mt-6 font-mono">
      <h4 className="text-lg font-bold text-indigo-700 mb-4">💬 Comments</h4>

      <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
        {comments.length === 0 ? (
          <p className="text-gray-500 italic">No comments yet. Be the first to say something!</p>
        ) : (
          comments.map((c, i) => (
            <div
              key={i}
              className="bg-yellow-100 border border-yellow-300 rounded-xl p-3 text-sm text-gray-900 shadow-sm"
            >
              {c.text}
            </div>
          ))
        )}
      </div>

      <div className="mt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Type your comment here..."
          className="flex-1 border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white shadow-inner"
        />
        <button
          onClick={postComment}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2 rounded-xl transition duration-200 shadow-md"
        >
          Post
        </button>
      </div>
    </div>
  );
}
