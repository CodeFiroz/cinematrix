import React from 'react';
import Review from '../../components/Review/Review';
import { useFetchMovies, useGetMovieReview } from '../../hooks/useMovie';
import { useParams } from "react-router-dom";

const MovieDetails = () => {
  const { id } = useParams();
  const { data: Fetchmovie, isLoading: isMovieLoading } = useFetchMovies(id);
  const { data: MovieReviews, isLoading: isReviewLoading } = useGetMovieReview(id);

  
  
  if (isMovieLoading || isReviewLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-black text-white">
        <div className="text-2xl animate-pulse">Loading the cinematic greatness...</div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div
        className="w-full relative h-[400px] rounded my-3 p-5 flex justify-start items-end bg-cover bg-center"
        style={{
          backgroundImage: `url("https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces/${Fetchmovie?.backdrop_path}")`,
        }}
      >
        <div className="absolute inset-0 bg-black opacity-80 rounded"></div>
      </div>

      <div className="flex justify-center gap-5">
        <div className="w-2/6 hidden lg:flex flex-col px-5">
          <div className="sticky top-40 flex flex-col items-center justify-center -translate-y-30">
            <img
              src={`https://media.themoviedb.org/t/p/w600_and_h900_face/${Fetchmovie?.poster_path}`}
              className="w-70 rounded border-4 border-zinc-500"
              alt="Movie Poster"
            />
            <a href={Fetchmovie?.homepage} target='_blank' className="py-1 px-10 mt-3 bg-amber-600 text-white">
              Know More
            </a>
          </div>
        </div>

        <div className="w-full lg:w-5/6 px-4 pb-20 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-600 scrollbar-track-zinc-800">
          <h1 className="font-bebas text-6xl text-zinc-50 mt-5">
            {Fetchmovie?.title || 'blank'}
          </h1>

          <p className="text-zinc-300">
            {Fetchmovie?.genres.map((genre, index) => (
              <span key={index} className="mr-2">
                {genre.name}  {Fetchmovie?.genres.length - 1 > Fetchmovie?.genres.length ? '': ', '}
              </span>
            ))}
          </p>

          <h4 className="font-bebas text-2xl mt-5 text-white">Overview :</h4>
          <i>{Fetchmovie?.overview || '...'}</i>

          <p className="mt-4 text-zinc-200">
            <b>Release Year:</b> {Fetchmovie?.release_date}
          </p>

          <div className="flex items-center mb-10 gap-2">
            <a
              href="#"
              className="inline-flex items-center mt-4 px-5 text-sm py-1 border-2 border-amber-700 rounded bg-amber-600 text-white"
            >
              <i className="fi fi-rr-film mt-1 mr-4"></i>
              Add to List
            </a>
          </div>

          <h2 className="text-2xl font-bold text-zinc-50 mb-10">Add Your Review</h2>


          {
                MovieReviews?.map((review, index) => (
                  <Review
                    key={index}
                    reviewText={review.content}
                    rating={5}
                    likes="1.2k"
                    replies={12}
                    user={review.userId.username}
                    time={review.createdAt}
                    avatar="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjspNyVZ_RBiG68niLT-38T93kitl5Qk5nNw&s"
                  />
                ))
              }



          



        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
