import React from 'react'

const ReviewCard = ({ image, reviewText, rating = 5, likes = '24k', replies = 129, user = '@DeadPool', timeAgo = '2 days ago', avatar }) => {
  return (
    <div className="w-full mt-3">
      <div className="flex mt-3 gap-2">
        
        {/* If image exists, render the image box */}
        {
          image ? (
            <div className="w-1/5">
              <a href="#">
                <img src={image} alt="Review Media" className="rounded w-full object-cover border-2 border-zinc-600" />
              </a>
            </div>
          ) : null
        }
        {/* Text Section */}
        <div className={`${image ? 'w-4/5' : 'w-full'}`}>
          <p className='text-sm text-zinc-500 mb-3'>
            {reviewText || "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat eum similique itaque exercitationem odio nesciunt delectus, voluptate qui aliquam unde."}
          </p>

          <div className="flex text-amber-400 text-sm my-2">
            {Array.from({ length: rating }, (_, i) => (
              <i key={i} className="fi fi-rr-star"></i>
            ))}
          </div>

          <div className="flex gap-4">
            <button className='flex items-center text-xs border border-zinc-600 px-2 py-1 rounded-xl cursor-pointer'>
              <i className="fi fi-rr-heart mt-1 mr-2"></i>
              {likes}
            </button>

            <button className='flex items-center text-xs border border-zinc-600 px-2 py-1 rounded-xl cursor-pointer'>
              <i className="fi fi-rr-reply-all mt-1 mr-2"></i>
              {replies}
            </button>
          </div>

          <div className="flex items-center gap-2 mt-3">
            <a href="#">
              <img src={avatar || "https://www.esquireme.com/wp-content/uploads/sites/9/cloud/2021/09/09/deadpool-1563973577.jpg"} className="w-6 h-6 rounded-full object-cover" />
            </a>

            <h5 className='font-bebas'>{user}</h5>
            <p className='text-sm text-zinc-600'> - {timeAgo}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReviewCard
