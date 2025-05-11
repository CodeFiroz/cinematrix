import React from 'react';
import Review from '../../components/Review/Review';
import { useFetchMovies, useGetMovieReview } from '../../hooks/useMovie';
import { useParams } from 'react-router-dom';
import { ScrollToTop } from '../../lib/Accessibilities';
import { useEffect } from 'react';
import ReviewBox from '../../components/ReviewBox/ReviewBox';

const MovieDetails = () => {

  useEffect(()=>{
    ScrollToTop();
  }, [])

  const { id } = useParams();
  const { data: movie, isLoading: isMovieLoading } = useFetchMovies(id);
  const { data: reviews, isLoading: isReviewLoading } = useGetMovieReview(id);
  

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
        className="w-full relative h-[400px] rounded my-3 p-5 flex justify-start items-end bg-cover bg-center transition-all duration-1500"
        style={{
          backgroundImage: `url("https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces/${movie?.backdrop_path}")`,
        }}
      >
        <div className="absolute inset-0 bg-black/80 rounded"></div>
      </div>

      <div className="flex justify-center gap-5">
        {/* Sidebar Poster */}
        <aside className="w-2/6 hidden lg:flex flex-col px-5">
          <div className="sticky top-40 flex flex-col items-center justify-center">
            <img
              src={`https://media.themoviedb.org/t/p/w600_and_h900_face/${movie?.poster_path}`}
              className="w-60 rounded-xl border-4 border-zinc-500 shadow-lg transition-transform duration-300 hover:scale-105"
              alt="Movie Poster"
            />
          
          </div>
        </aside>

        {/* Main Content */}
        <main className="w-full lg:w-5/6 px-4 pb-20 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-600 scrollbar-track-zinc-800">
          <h1 className="font-bebas text-6xl text-zinc-50 mt-5 mb-2">
            {movie?.title || 'Untitled'}
          </h1>

          <p className="text-zinc-300 text-sm mb-4">
            {movie?.genres?.map((genre, index) => (
              <span key={index} className="mr-2">
                {genre.name}{index < movie.genres.length - 1 ? ',' : ''}
              </span>
            ))}
          </p>

          <section className="text-white space-y-4">
            <div>
              <h4 className="font-bebas text-2xl">Overview:</h4>
              <p className="italic text-zinc-300">{movie?.overview || 'No overview available.'}</p>
            </div>

            <p className="text-zinc-200">
              <strong>Release Year:</strong> {movie?.release_date || 'Unknown'}
            </p>

            <div className="flex items-center mb-10 gap-2">
              <a
                href="#"
                className="inline-flex items-center mt-4 px-5 py-1 border-2 border-amber-700 rounded-full bg-amber-600 text-white hover:bg-amber-700 transition"
              >
                🎬 Add to List
              </a>
            </div>
          </section>

          {/* Review Input Box */}
         <ReviewBox 
          movieId={id}
         />

          {/* User Reviews */}
          <section className="mt-10 space-y-6">
            {reviews?.length ? (
              reviews.map((review, index) => (
                <Review
                  key={index}
                  reviewData={review}
                />
              ))
            ) : (
              <p className="text-zinc-400">No reviews yet. Be the first to drop a hot take!</p>
            )}
          </section>
        </main>
      </div>
    </div>
  );
};

export default MovieDetails;
