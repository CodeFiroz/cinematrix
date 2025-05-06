import React from 'react'
import ReviewCard from '../../components/ReviewCard/ReviewCard'
import { useParams } from "react-router-dom"
import { useEffect, useState } from 'react'
import { movie } from '../../apis/movies'
import toast, {Toaster} from "react-hot-toast"

const Movie = () => {

    const [loading, setLoading] = useState(true);
    const [Mymovie, setMovie] = useState(null)
    const { id } = useParams();

    useEffect(() => {
        const fetchMovies = async () => {
            const result = await movie(id);
            if (result.success) {
                setMovie(result.movies[0]);
                setLoading(false);
              } else {
                setLoading(false);
                toast.error("Error")
              }
        };

        fetchMovies();
    }, [id]);

    return (
        <>

            {
                loading ? (
                    <h1>
                        Loading...
                    </h1>
                ) : (

                    <div className="flex justify-center">
                        <Toaster />
                        <div className="w-full lg:max-w-8/10">

                            <div
                                className="w-full relative h-[300px] rounded my-3 p-5 flex justify-start items-end bg-cover bg-center"
                                style={{
                                    backgroundImage:
                                        `url("https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces/${Mymovie?.backdrop_path}")`,
                                }}
                            >
                                {/* Dark Overlay */}
                                <div className="absolute inset-0 bg-black opacity-80 rounded"></div>


                                <div className=' pl-5 lg:pl-80 z-50'>
                                    <h2 className='text-6xl font-bold uppercase text-white font-bebas tracking-wider'>
                                        {Mymovie?.title}
                                    </h2>
                                    <p className='text-sm text-zinc-200'>
                                        {Mymovie.genres?.map((gen) => (
                                            <span key={gen.id || gen.name}>{gen.name} | </span>
                                        ))}

                                    </p>

                                </div>


                            </div>

                            <div className="flex gap-5">

                                <div className="w-2/6 hidden lg:flex justify-center">

                                    <div>
                                        <img src={`https://media.themoviedb.org/t/p/w220_and_h330_face/${Mymovie?.backdrop_path}`} className="w-full rounded border-3 border-zinc-500 -translate-y-30" />
                                    </div>

                                </div>
                                <div className="w-5/6 px-4">
                                    <h4 className='font-bebas text-2xl text-white'>
                                        Overview :
                                    </h4>
                                    <i>
                                        {Mymovie.overview}
                                    </i>

                                    <p className='mt-4'>
                                        <b>Release Date : </b>
                                        {Mymovie.release_date}
                                    </p>

                                    <div className="flex items-center mb-10 gap-2">
                                        <a
                                            href="#"
                                            className='inline-flex items-center mt-4 p-2 text-sm py-1 border-2 border-amber-700 rounded bg-amber-600 text-white '
                                        >

                                            <i className="fi fi-rr-film mt-1 mr-4"></i>
                                            Add to List

                                        </a>
                                        <a
                                            href="#"
                                            className='inline-flex items-center mt-4 p-4 text-sm py-1 border-2 border-slate-700 rounded bg-slate-600 text-white '
                                        >

                                            <i className="fi fi-rr-star mt-1 mr-4"></i>
                                            Add Your Review

                                        </a>
                                    </div>

                                    <ReviewCard />

                                </div>


                            </div>


                        </div>
                    </div>
                )
            }


        </>
    )
}

export default Movie