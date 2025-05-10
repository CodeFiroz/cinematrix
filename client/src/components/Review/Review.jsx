import React, { useState } from 'react'
import { timeAgo } from '../../lib/Accessibilities'
import { AddReply } from "../../hooks/useMovie";
import ReplyModel from './ReplyModel';
import ReplyItem from './ReplyItem';
import toast,{Toaster} from 'react-hot-toast';

const Review = ({
    reviewText,
    reviewId,
    rating = 1,
    likes = '0',
    replies,
    user,
    time,
    avatar = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjspNyVZ_RBiG68niLT-38T93kitl5Qk5nNw&s",
}) => {

    const [replyToggle, setReplyToggle] = useState(false)
    const [isOpen, setIsOpen] = useState(false);

    const [replydata, setReplyData] = useState({
        reviewId: reviewId,
        userid: '',
        username: '',
        content: ''
    })

    const replyTo = (id, username) => {
        setReplyData({ ...replydata, userid: id, username });
        setIsOpen(true);
    };


    const handleReplySubmit = () => {
        AddReply(replydata);
        toast.success("replied")
        setIsOpen(false);
        setReplyData({ ...replydata, content: '' }); // clear content
    };

    return (
        <>
    <Toaster />
            <ReplyModel
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                replyData={replydata}
                onChange={(val) => setReplyData({ ...replydata, content: val })}
                onSubmit={handleReplySubmit}
            />

            <div className='w-full p-3 bg-zinc-800 rounded border border-zinc-400 my-2'>

                <div className='flex items-center gap-2'>

                    <img src={avatar}
                        className="w-10 h-10 object-cover rounded-full" />
                    <div>
                        <h4><a href="#" className='text-zinc-400'>@{user.username} - <span className='text-sm text-zinc-600'>{timeAgo(time)}</span></a></h4>
                        <div className="stars text-xs text-amber-300 mt-[2px] ml-1">

                            {Array.from({ length: rating }, (_, i) => (
                                <i key={i} className="bx bxs-star"></i>
                            ))}

                            {Array.from({ length: 5 - rating }, (_, i) => (
                                <i key={i} className="bx bx-star"></i>
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

                        <button onClick={() => replyTo(user._id, user.username)} className='flex items-center gap-1 px-3 py-1 border border-zinc-300 rounded-2xl hover:bg-amber-500 hover:border-amber-500 text-white cursor-pointer'>
                            <i className="bx bx-reply"></i>
                            <span className='text-sm'>Reply</span>
                        </button>

                    </div>

                    <button className='text-sm text-zinc-400 cursor-pointer' onClick={() => setReplyToggle(!replyToggle)}>
                        {
                            replies.length >= 0 ? `${replyToggle ? 'Hide' : 'Show'} all ${replies.length} replies` : ''
                        }
                    </button>

                </div>

            </div>

            {replyToggle && (
                <div className="pl-15">
                    {replies.map((reply, index) => (
                        <ReplyItem key={index} reply={reply} />
                    ))}
                </div>
            )}






        </>
    )
}

export default Review
