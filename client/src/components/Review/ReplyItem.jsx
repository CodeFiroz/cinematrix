import React from 'react'
import { timeAgo } from '../../lib/Accessibilities'
import { DeleteReply } from '../../hooks/useMovie'
import toast, { Toaster } from 'react-hot-toast'
import { useAuthStore } from '../../store/authStore'
import { useState } from 'react'
import { LikeReply } from '../../hooks/useMovie'

const ReplyItem = ({ reply }) => {

  const [isLiked, setLiked] = useState(false);
  const [LikeCount, setLikeCount] = useState(reply.likes.length);


  const { user, isLoggedIn } = useAuthStore();

  const handleDelete = () => {
    if (DeleteReply(reply._id)) {
      toast.success("Deleted");
    } else {
      toast.error("Something went wrong. Try again")
    }
  }
  const handleLike = (reviewID) => {

    if (isLoggedIn) {
      if (LikeReply(reviewID)) {
        if (reply.likes?.includes(user.id) || isLiked) {
          setLikeCount((LikeCount) => LikeCount - 1)
          setLiked(!isLiked);
        } else {
          setLiked(!isLiked);

          setLikeCount((LikeCount) => LikeCount + 1)
        }
      } else {
        console.log("errror");

      }
    } else {
      toast.error("You Need To login first.")
    }
  }


  return (
    <>
      <Toaster />
      <div className="w-full p-3 bg-zinc-800 rounded border border-zinc-400 my-2">
        <div className="flex justify-between items-start gap-2">

          <div className="flex gap-2">
            <img
              src="https://pfpmaker.com/content/img/profile-pictures/aesthetic/2.png"
              className="w-8 h-8 mt-1 object-cover rounded-full"
              alt="avatar"
            />
            {reply?.userId ? (
              <div>
                <h4 className="text-zinc-400 text-xs">
                  @{reply.userId.username} - {timeAgo(reply.createdAt)}
                </h4>
                <p className="text-sm text-slate-200">{reply.content}</p>
              </div>
            ) : null}


          </div>

          <div className="flex items-center gap-2">


            <button onClick={() => handleLike(reply._id)} className={`flex items-center gap-1 px-3 py-1 border  ${isLiked ? 'border-red-600 bg-red-500' : 'border-zinc-300'}   rounded-2xl hover:bg-red-500 hover:border-red-500 text-white cursor-pointer`}>
              <i className={`bx ${isLiked ? 'bxs-heart' : 'bx-heart'}`}></i>
              <span className='text-sm'>{LikeCount}</span>
            </button>

           


            {
              isLoggedIn && reply.userId._id == user.id ? (
                <button onClick={handleDelete} className="ml-auto flex items-center gap-1 px-3 py-2 cursor-pointer border border-zinc-300 rounded-2xl hover:bg-red-500 text-white">
                  <i className="bx bx-trash text-xs"></i>
                </button>
              ) : ''
            }



          </div>
        </div>
      </div>
    </>
  )
}

export default ReplyItem