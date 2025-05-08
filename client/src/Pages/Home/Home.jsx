import MovieCard from "../../components/MovieCard/MovieCard"
import ReviewCard from "../../components/ReviewCard/ReviewCard"
import Hero from "./Hero"
import { useFetchMoviesList } from "../../hooks/useMovie"

const Home = () => {
    const popularMovies = useFetchMoviesList("upcoming");
    const topRatedMovies = useFetchMoviesList("top_rated");



    return (
        <>


            <div className="flex justify-center">
                <div className="w-full px-15">
                    <Hero />


                    <h3
                        className="text-3xl font-bebas text-zinc-300 my-5"
                    >
                        Popular reviews this week
                    </h3>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

                    <ReviewCard
  image="https://media.themoviedb.org/t/p/w220_and_h330_face//tB66c6dnu9dG60mta8TF8zmeGJn.jpg"
  reviewText="One of the best self-drive experiences I've had! Super smooth pickup process."
  rating={4}
  likes="1.2k"
  replies={12}
  user="@IronMan"
  timeAgo="5 hours ago"
  avatar="https://preview.redd.it/bcyq3rjk2w071.png?auto=webp&s=97c9b873f1b41a7b9ff31331fd92f2e3fafed92f"
/>
<ReviewCard
  image="https://media.themoviedb.org/t/p/w220_and_h330_face//tB66c6dnu9dG60mta8TF8zmeGJn.jpg"
  reviewText="One of the best self-drive experiences I've had! Super smooth pickup process."
  rating={4}
  likes="1.2k"
  replies={12}
  user="@IronMan"
  timeAgo="5 hours ago"
  avatar="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyIGN4Z5LDVT7hl8sk76cZ4FU1mdkB5LIm7g&s"
/>
<ReviewCard
  image="https://media.themoviedb.org/t/p/w220_and_h330_face//kMDUS7VmFhb2coRfVBoGLR8ADBt.jpg"
  reviewText="One of the best self-drive experiences I've had! Super smooth pickup process."
  rating={4}
  likes="1.2k"
  replies={12}
  user="@IronMan"
  timeAgo="5 hours ago"
  avatar="https://cdn.prod.website-files.com/62bdc93e9cccfb43e155104c/66d474340f28fd3b2645b0a9_gojo%20pfp%20400x400%20(12).png"
/>
<ReviewCard
  image="https://media.themoviedb.org/t/p/w220_and_h330_face//cAoktVUBhGyULRoxV6mZ2LB3x7I.jpg"
  reviewText="One of the best self-drive experiences I've had! Super smooth pickup process."
  rating={4}
  likes="1.2k"
  replies={12}
  user="@IronMan"
  timeAgo="5 hours ago"
  avatar="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjspNyVZ_RBiG68niLT-38T93kitl5Qk5nNw&s"
/>


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
