import MovieCard from "../../components/MovieCard/MovieCard"
import ReviewCard from "../../components/ReviewCard/ReviewCard"
import Hero from "./Hero"
import { useFetchMoviesList } from "../../hooks/useMovie"

const Home = () => {
    const popularMovies = useFetchMoviesList("upcoming");
    const topRatedMovies = useFetchMoviesList("top_rated");
    const NowPlayingMovies = useFetchMoviesList("now_playing");
    const UpcomingMovies = useFetchMoviesList("upcoming");



    return (
        <>


            <div className="flex justify-center">
                <div className="w-full px-15">
                    <Hero />


    <h3
                        className="text-3xl font-bebas text-zinc-300 my-5"
                    >
                        Now Playing
                    </h3>
                    <div className="grid grid-cols-3 lg:grid-cols-6 gap-5">


                        {
                            NowPlayingMovies.slice(0, 12).map((movie, index) => (


                                <MovieCard
                                    image={`https://media.themoviedb.org/t/p/w220_and_h330_face/${movie.poster_path}`}
                                    title={movie.title}
                                    id={movie.id}
                                    key={index}
                                />
                            ))
                        }

                    </div>


                   

    <h3
                        className="text-3xl font-bebas text-zinc-300 my-5"
                    >
                        Upcoming Movies
                    </h3>
                    <div className="grid grid-cols-3 lg:grid-cols-6 gap-5">


                        {
                            UpcomingMovies.slice(0, 12).map((movie, index) => (


                                <MovieCard
                                    image={`https://media.themoviedb.org/t/p/w220_and_h330_face/${movie.poster_path}`}
                                    title={movie.title}
                                    id={movie.id}
                                    key={index}
                                />
                            ))
                        }

                    </div>


                    <h3
                        className="text-3xl font-bebas text-zinc-300 my-5"
                    >
                        Popular Movies
                    </h3>
                    <div className="grid grid-cols-3 lg:grid-cols-6 gap-5">


                        {
                            popularMovies.slice(0, 12).map((movie, index) => (


                                <MovieCard
                                    image={`https://media.themoviedb.org/t/p/w220_and_h330_face/${movie.poster_path}`}
                                    title={movie.title}
                                    id={movie.id}
                                    key={index}
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
                            topRatedMovies.slice(0, 12).map((movie, index) => (


                                <MovieCard
                                image={`https://media.themoviedb.org/t/p/w220_and_h330_face/${movie.poster_path}`}
                                title={movie.title}
                                id={movie.id}
                                key={index}
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
