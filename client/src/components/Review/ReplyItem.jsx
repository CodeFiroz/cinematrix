import React from 'react'
import { timeAgo } from '../../lib/Accessibilities'

const ReplyItem = ({reply }) => {
  return (
    <>
    <div className="w-full p-3 bg-zinc-800 rounded border border-zinc-400 my-2">
    <div className="flex items-start gap-2">
      <img
        src="https://pfpmaker.com/content/img/profile-pictures/aesthetic/2.png"
        className="w-8 h-8 mt-1 object-cover rounded-full"
        alt="avatar"
      />
      <div>
        <h4 className="text-zinc-400 text-xs">@{reply.userId?.username} - {timeAgo(reply.createdAt)}</h4>
        <p className="text-sm text-slate-200">{reply.content}</p>
      </div>
      <button className="ml-auto flex items-center gap-1 px-3 py-1 border border-zinc-300 rounded-2xl hover:bg-red-500 text-white">
        <i className="bx bx-heart text-xs"></i>
        <span className="text-xs">{reply.likes?.length}</span>
      </button>
    </div>
  </div>
    </>
  )
}

export default ReplyItem