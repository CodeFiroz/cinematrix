import React from 'react'
import ReviewCard from '../../components/ReviewCard/ReviewCard'
import { useParams } from "react-router-dom"
import {useState } from 'react'
import axios from "axios"
import { useFetchMovies, useGetMovieReview } from '../../hooks/useMovie'

const Movie = () => {

  const { id } = useParams();
  const Fetchmovie = useFetchMovies(id)
  const MovieReviews = useGetMovieReview(id);
  
  
    const [review, setReview] = useState("");
    

   
    const handleSubmit = async()=>{
      try{

        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/movies/review`, {movieId: id, content: review}, { withCredentials: true, });
        
        console.log(response);
        

      }catch(error){
        console.log("Error", error);
        
      }

    }

    return (
        <>

          

                    <div className="flex justify-center">
                        <div className="w-full lg:max-w-8/10">

                            <div
                                className="w-full relative h-[300px] rounded my-3 p-5 flex justify-start items-end bg-cover bg-center"
                                style={{
                                    backgroundImage:
                                        `url("https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces/${Fetchmovie?.backdrop_path}")`,
                                }}
                            >
                                {/* Dark Overlay */}
                                <div className="absolute inset-0 bg-black opacity-80 rounded"></div>


                                <div className=' pl-5 lg:pl-80 z-50'>
                                    <h2 className='text-3xl lg:text-6xl font-bold uppercase text-white font-bebas tracking-wider'>
                                        {Fetchmovie?.title}
                                    </h2>
                                    <p className='text-sm text-zinc-200'>
                                        {Fetchmovie?.genres?.map((gen) => (
                                            <span key={gen.id || gen.name}>{gen.name} | </span>
                                        ))}

                                    </p>

                                </div>


                            </div>
                            <div className="flex items-start gap-5 ">
  {/* Left: Sticky Poster */}
  <div className="w-2/6 hidden lg:flex flex-col px-5">
    <div className="sticky top-0 -translate-y-30">
      <img
        src={`https://media.themoviedb.org/t/p/w600_and_h900_face/${Fetchmovie?.poster_path}`}
        className="w-70 rounded border-4 border-zinc-500"
        alt="Movie Poster"
      />
    </div>
  </div>

  {/* Right: Scrollable Content */}
  <div className="w-full lg:w-5/6 px-4 pb-20 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-600 scrollbar-track-zinc-800
">
    <h4 className="font-bebas text-2xl text-white">Overview :</h4>
    <i>{Fetchmovie?.overview || 'none'}</i>

    <p className="mt-4">
      <b>Release Date:</b> {Fetchmovie?.release_date}
    </p>

    <div className="flex items-center mb-10 gap-2">
      <a
        href="#"
        className="inline-flex items-center mt-4 p-2 text-sm py-1 border-2 border-amber-700 rounded bg-amber-600 text-white"
      >
        <i className="fi fi-rr-film mt-1 mr-4"></i>
        Add to List
      </a>
      <a
        href="#"
        className="inline-flex items-center mt-4 p-4 text-sm py-1 border-2 border-slate-700 rounded bg-slate-600 text-white"
      >
        <i className="fi fi-rr-star mt-1 mr-4"></i>
        Add Your Review
      </a>
    </div>


{
MovieReviews?.map((review, index)=>(
  <ReviewCard
  key={index}
  reviewText={review.content}
  rating={5}
  likes="1.2k"
  replies={12}
  user={review.userId.username}
  timeAgo="5 hours ago"
  avatar="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjspNyVZ_RBiG68niLT-38T93kitl5Qk5nNw&s"
/>
))
}
   


<a href="#" className='mt-5 block text-sm text-zinc-600'>
  Read All Review
</a>

<textarea 
name="review" 
id="review" 
value={review}
onChange={(e)=> setReview(e.target.value)}
placeholder='Your review'
className='w-full p-2 bg-zinc-800 text-white rounded my-3 h-30 resize-none border border-zinc-500 outline-0'
></textarea>
<button onClick={handleSubmit} className='bg-amber-500 px-2 py-1 text-white rounded cursor-pointer'>
  Submit Review
</button>

  </div>
</div>



                        </div>
                    </div>
              

        </>
    )
}

export default Movie