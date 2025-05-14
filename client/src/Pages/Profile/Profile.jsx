import React from 'react'
import MovieCard from '../../components/MovieCard/MovieCard'
import { useFetchMoviesList } from '../../hooks/useMovie'
import ProfileHead from './ProfileHead';
import { Link } from 'react-router-dom';

const Profile = () => {

        const Movies = useFetchMoviesList("now_playing");
    

    return (
        <>

            <div className="flex justify-center">
                <div className="w-full lg:max-w-8/10 py-20">

                  <ProfileHead />

                    <div className='mt-10 grid lg:grid-cols-8 grid-cols-3 gap-2'>

                        <Link
                            className='text-amber-500 border-b-1 border-amber-400 text-center'
                            to="/profile">
                            My Watch List
                        </Link>



                        <Link
                            className='text-zinc-500 border-b-1 border-zinc-400 text-center'
                            to="/my-reviews">
                            Recent Reviews
                        </Link>


                        <Link
                            className='text-zinc-500 border-b-1 border-zinc-400 text-center'
                            to="/my-replies">
                            My Replies
                        </Link>

                    </div>

                    <div className="mt-3 grid lg:grid-cols-6 grid-cols-2 gap-4 px-7 py-3">

{
                            Movies.slice(0, 12).map((movie, index) => (


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

export default Profile