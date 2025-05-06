import MovieCard from "../../components/MovieCard/MovieCard"
import ReviewCard from "../../components/ReviewCard/ReviewCard"
import Hero from "./Hero"

import { movieslist } from "../../apis/movies"
import { useState, useEffect } from "react"

const Home = () => {

    const [popularMovies, setPopularMovies] = useState([]);
    const [topRatedMovie, setTopRatedMovies] = useState([]);

    useEffect(() => {
        const fetchPopularMovies = async () => {
            const PopularMovieresult = await movieslist("popular");

            if (PopularMovieresult.success) {

                setPopularMovies(PopularMovieresult.movies);



            } else {
                console.error("Failed to fetch movies:", PopularMovieresult.message);
            }

            const TopRatedMovieresult = await movieslist("top_rated");

            if (TopRatedMovieresult.success) {

                setTopRatedMovies(TopRatedMovieresult.movies);



            } else {
                console.error("Failed to fetch movies:", TopRatedMovieresult.message);
            }
        };

        fetchPopularMovies();
    }, []);






    return (
        <>


            <div className="flex justify-center">
                <div className="w-full lg:max-w-8/10 px-8">
                    <Hero />


                    <h3
                        className="text-3xl font-bebas text-zinc-300 my-5"
                    >
                        Popular reviews this week
                    </h3>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

                        <ReviewCard />
                        <ReviewCard />
                        <ReviewCard />
                        <ReviewCard />

                    </div>

                    <div className="flex my-10 justify-center">
                        <a
                            href="#"
                            className="px-4 py-2 text-center rounded-full bg-amber-400 text-zinc-800 font-bold border-4 border-amber-500 uppercase duration-300 ease-in-out hover:scale-95"
                        >
                            Explore More
                        </a>
                    </div>

                    <h3
                        className="text-3xl font-bebas text-zinc-300 my-5"
                    >
                        Popular Movies
                    </h3>
                    <div className="grid grid-cols-3 lg:grid-cols-6 gap-5">


                        {
                            popularMovies.slice(0, 12).map((movie) => (


                                <MovieCard
                                    image={`https://media.themoviedb.org/t/p/w220_and_h330_face/${movie.backdrop_path}`}
                                    title={movie.title}
                                />
                            ))
                        }

                    </div>

                    <h3
                        className="text-3xl font-bebas text-zinc-300 mt-15 mb-5"
                    >
                       Top Rated Movies 
                    </h3>
                    <div className="grid grid-cols-3 lg:grid-cols-6 gap-5 mb-20">


                    {
                            topRatedMovie.slice(0, 12).map((movie) => (


                                <MovieCard
                                    image={`https://media.themoviedb.org/t/p/w220_and_h330_face/${movie.backdrop_path}`}
                                    title={movie.title}
                                />
                            ))
                        }


                    </div>



                </div>
            </div>



        </>
    )
}

export default Home
