import React from 'react'
import { timeAgo } from "../../lib/timeAgo"

const Review = ({ reviewText, rating = 1, likes = '0', replies = 0, user = '@DeadPool', time, avatar }) => {
    return (
        <>

            <div className='w-full p-3 bg-zinc-800 rounded border border-zinc-400 my-2'>

                <div className='flex items-center gap-2'>

                    <img src={avatar}
                        className="w-10 h-10 object-cover rounded-full" />
                    <div>
                        <h4><a href="#" className='text-zinc-400'>@{user} - <span className='text-sm text-zinc-600'>{timeAgo(time)}</span></a></h4>
                        <div className="stars text-xs text-amber-300 mt-[2px] ml-1">

                            {Array.from({ length: rating }, (_, i) => (
                                <i key={i} className="bx bxs-star"></i>
                            ))}



                        </div>
                    </div>

                </div>

                <p className='mt-2 text-sm text-slate-400'>
                    {reviewText}
                </p>

                <div className="flex items-center border-t border-dashed border-zinc-700 pt-3 justify-between mt-4">

                    <div className="flex gap-3">
                        <button className='flex items-center gap-1 px-3 py-1 border border-zinc-300 rounded-2xl hover:bg-red-500 hover:border-red-500 text-white cursor-pointer'>
                            <i className="bx bx-heart"></i>
                            <span className='text-sm'>{likes}</span>
                        </button>

                        <button className='flex items-center gap-1 px-3 py-1 border border-zinc-300 rounded-2xl hover:bg-amber-500 hover:border-amber-500 text-white cursor-pointer'>
                            <i className="bx bx-reply"></i>
                            <span className='text-sm'>Reply</span>
                        </button>

                    </div>

                    <a href="#" className='text-sm text-zinc-400'>
                        {
                            replies >= 0 ? `View all ${replies} replies` : ''
                        }
                    </a>

                </div>

            </div>

            <div className="w-full pl-15">
                <div className='w-full p-3 bg-zinc-800 rounded border border-zinc-400 my-2'>

                    <div className='flex items-center gap-2'>

                        <img src="https://pfpmaker.com/content/img/profile-pictures/aesthetic/2.png"
                            className="w-8 h-8 object-cover rounded-full" />
                        <div>
                            <h4><a href="#" className='text-zinc-400 text-sm'>@wishDragon29 - 15 min ago</a></h4>

                        </div>

                    </div>

                    <p className='mt-2 text-sm text-slate-400'>
                        Molestias dolore nisi esse officia molestiae! Voluptates, molestias! 😾😾
                    </p>

                    <div className="flex items-center border-t border-dashed border-zinc-700 pt-3 justify-between mt-4">

                        <div className="flex gap-3">
                            <button className='flex items-center gap-1 px-3 py-1 border border-zinc-300 rounded-2xl hover:bg-red-500 hover:border-red-500 text-white cursor-pointer'>
                                <i className="bx bx-heart"></i>
                                <span className='text-sm'>23</span>
                            </button>


                        </div>


                    </div>

                </div>
            </div>

        </>
    )
}

export default Review
