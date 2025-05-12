import React, { useEffect, useState } from 'react'
import { timeAgo } from '../../lib/Accessibilities'
import { AddReply, LikeReview } from "../../hooks/useMovie";
import ReplyModel from './ReplyModel';
import ReplyItem from './ReplyItem';
import toast, { Toaster } from 'react-hot-toast';
import { useAuthStore } from '../../store/authStore';

const Review = ({
    reviewData,
    avatar = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjspNyVZ_RBiG68niLT-38T93kitl5Qk5nNw&s",
}) => {

    const { user, isLoggedIn } = useAuthStore();
    const [replyToggle, setReplyToggle] = useState(false)
    const [isOpen, setIsOpen] = useState(false);

    const [isLiked, setLiked] = useState(false);
    const [LikeCount, setLikeCount] = useState(reviewData.likes.length);

    useEffect(() => {
        if (user && isLoggedIn !== false) {
            if (reviewData.likes?.includes(user.id)) {
                setLiked(true)
            }
        }
    }, [user, reviewData.likes, isLoggedIn])


    const [replydata, setReplyData] = useState({
        reviewId: reviewData._id,
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

    const handleLike = (reviewID) => {
        
        if (LikeReview(reviewID)) {
              if (reviewData.likes?.includes(user.id) || isLiked) {
                setLikeCount((LikeCount)=>LikeCount - 1)
                setLiked(!isLiked);
            }   else{
                setLiked(!isLiked);
                
                setLikeCount((LikeCount)=>LikeCount + 1)
            }
        } else {
            console.log("errror");

        }
    }

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
                        <h4><a href="#" className='text-zinc-400'>@{reviewData.userId.username} - <span className='text-sm text-zinc-600'>{timeAgo(reviewData.createdAt)}</span></a></h4>
                        <div className="stars text-xs text-amber-300 mt-[2px] ml-1">

                            {Array.from({ length: reviewData.rating }, (_, i) => (
                                <i key={i} className="bx bxs-star"></i>
                            ))}

                            {Array.from({ length: 5 - reviewData.rating }, (_, i) => (
                                <i key={i} className="bx bx-star"></i>
                            ))}



                        </div>
                    </div>

                </div>

                <p className='mt-2 text-sm text-slate-400'>
                    {reviewData.content}
                </p>

                <div className="flex items-center border-t border-dashed border-zinc-700 pt-3 justify-between mt-4">

                    <div className="flex gap-3">
                        <button onClick={() => handleLike(reviewData._id)} className={`flex items-center gap-1 px-3 py-1 border  ${isLiked ? 'border-red-600 bg-red-500' : 'border-zinc-300'}   rounded-2xl hover:bg-red-500 hover:border-red-500 text-white cursor-pointer`}>
                            <i className={`bx ${isLiked ? 'bxs-heart' : 'bx-heart'}`}></i>
                            <span className='text-sm'>{LikeCount}</span>
                        </button>

                        <button onClick={() => replyTo(reviewData.userId._id, reviewData.userId.username)} className='flex items-center gap-1 px-3 py-1 border border-zinc-300 rounded-2xl hover:bg-amber-500 hover:border-amber-500 text-white cursor-pointer'>
                            <i className="bx bx-reply"></i>
                            <span className='text-sm'>Reply</span>
                        </button>

                    </div>

                    <button className='text-sm text-zinc-400 cursor-pointer' onClick={() => setReplyToggle(!replyToggle)}>
                        {
                            reviewData.replies.length >= 0 ? `${replyToggle ? 'Hide' : 'Show'} all ${reviewData.replies.length} replies` : ''
                        }
                    </button>

                </div>

            </div>

            {replyToggle && (
                <div className="pl-15">
                    {reviewData.replies.map((reply, index) => (
                        <ReplyItem key={index} reply={reply} />
                    ))}
                </div>
            )}






        </>
    )
}

export default Review
