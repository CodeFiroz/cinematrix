import React from 'react'
import MovieCard from '../../components/MovieCard/MovieCard'
import { useGetMyReviews } from '../../hooks/useMovie';
import ProfileHead from './ProfileHead';
import Review from '../../components/Review/Review';
import { Link } from 'react-router-dom';

const Myreviews = () => {

      const { data: reviews, isLoading: isReviewLoading } = useGetMyReviews();
      
      

    return (
        <>

            <div className="flex justify-center">
                <div className="w-full lg:max-w-8/10 py-20">

<ProfileHead />
                    
                    <div className='mt-10 grid lg:grid-cols-8 grid-cols-3 gap-2'>

                      
                      
                                              <Link
                                                  className='text-amber-500 border-b-1 border-amber-400 text-center'
                                                  to="/my-reviews">
                                                  Recent Reviews
                                              </Link>
                      
                      
                                              <Link
                                                  className='text-zinc-500 border-b-1 border-zinc-400 text-center'
                                                  to="/my-replies">
                                                  My Replies
                                              </Link>
                      

                    </div>

                    <div className="mt-3     gap-4">

                    {
                        isReviewLoading && (<h2 className="text-2xl mt-5 animate-pulse text-center text-zinc-400"> Loading review</h2>)
                    }

                    {
                        !isReviewLoading && reviews.length > 0 && reviews.map((review, index)=>(
                            
                            <div key={index}>
                            <Link to={`/movie/${review.movie.id}`} className='text-zinc-500 mt-5 text-sm'>Review On Movie <span className='text-amber-300 hover:underline'>{review.movie.title}</span> </Link>
                            <Review 
                                reviewData={review}  
                                key={index}
                            />
                            </div>
                        ))
                    }

                    </div>


                </div>
            </div>

        </>
    )
}

export default Myreviews