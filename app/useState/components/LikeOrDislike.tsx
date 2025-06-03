"use client";
import React, {useState} from "react";
import {ThumbsUp, ThumbsDown} from "lucide-react";

export default function LikeOrDislike() {
  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);

  const handleLike = () => {
    setLike(!like);
    if (dislike) {
      setDislike(false);
    }
  }
  const handleDislike = () => {
    setDislike(!dislike);
    if (like) {
      setLike(false);
    }
  }
  return (
    <div>
      <h1 className="text-center text-2xl text-neutral-900 mb-4">Like or Dislike</h1>
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={handleLike}
          className={`p-3 rounded-full ${like ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          <ThumbsUp size={24}/>
        </button>
        <button
          onClick={handleDislike}
          className={`p-3 rounded-full ${dislike ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          <ThumbsDown size={24}/>
        </button>
      </div>
      <div className="text-center mt-4">
        {like && <p>You liked this!</p>}
        {dislike && <p>You disliked this!</p>}
      </div>
    </div>
  )

}