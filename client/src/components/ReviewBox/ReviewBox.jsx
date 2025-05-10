import React from 'react'
import StarRating from "../StarRating/StarRating"
import { useState } from 'react'
import { AddMoviesReviews } from "../../hooks/useMovie";
import toast, { Toaster } from "react-hot-toast"
import { useAuthStore } from "../../store/authStore"

const ReviewBox = ({ movieId }) => {

  const [isReviewLoading, setReviewLoading] = useState(false)
  const [reviewContent, setReviewContent] = useState('');
  const [reviewRating, setReviewRating] = useState(1);

  const { isLoggedIn } = useAuthStore();

  const handleReviewSubmit = () => {

    if (reviewContent.trim() == "") {
      return;
    }

    setReviewLoading(true);
    if (AddMoviesReviews(movieId, reviewContent.trim(), reviewRating)) {
      setReviewLoading(false);
      toast.success("Your Review Added");
      setReviewContent("");
      setReviewRating(1);
    } else {
      setReviewLoading(false);
      toast.error("Something wrong");
    }

  }

  return (
    <>
      <Toaster />


      <section className="bg-zinc-800 p-6 rounded-xl border border-zinc-600 shadow-md w-full mx-auto space-y-4 transition-all">
        
        {
          !isLoggedIn ? (
            <>
            <h3 className="text-xl font-semibold text-white">Sign in Leave a Review</h3>
            </>
          ) : (
            <>
            <h3 className="text-xl font-semibold text-white">Leave a Review</h3>

<textarea
  className="w-full bg-zinc-700 text-white placeholder-gray-400 p-4 rounded-lg focus:ring-2 focus:ring-amber-400 outline-none resize-none min-h-[120px] transition-all duration-200"
  value={reviewContent}
  onChange={(e) => setReviewContent(e.target.value)}
  name="review"
  id="review"
  placeholder="Your experience about this movie..."
></textarea>

<div className="flex justify-between items-center">
  <StarRating
    reviewCount={setReviewRating}
  />

  {
    isReviewLoading ? (

      <button
        className="rounded-full bg-slate-500 hover:bg-slate-600 active:scale-95 px-8 py-2 text-white font-medium border-2 border-slate-400 transition-all duration-200 shadow-sm"
      >
        Posting...
      </button>
    ) : (
      <button
        onClick={handleReviewSubmit}
        className="rounded-full bg-amber-500 hover:bg-amber-600 active:scale-95 px-8 py-2 text-white font-medium border-2 border-amber-400 transition-all duration-200 shadow-sm"
      >
        Post Review
      </button>
    )
  }


</div>
</>
          )
        }

        
      </section>


    </>
  )
}

export default ReviewBox