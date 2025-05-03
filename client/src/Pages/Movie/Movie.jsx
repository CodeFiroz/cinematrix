import React from 'react'
import ReviewCard from '../../components/ReviewCard/ReviewCard'

const Movie = () => {
    return (
        <>

            <div className="flex justify-center">
                <div className="w-full lg:max-w-8/10">

                    <div
                        className="w-full relative h-[300px] rounded my-3 p-5 flex justify-start items-end bg-cover bg-center"
                        style={{
                            backgroundImage:
                                "url('https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces/rthMuZfFv4fqEU4JVbgSW9wQ8rs.jpg')",
                        }}
                    >
                        {/* Dark Overlay */}
                        <div className="absolute inset-0 bg-black opacity-80 rounded"></div>


                        <div className=' pl-5 lg:pl-80 z-50'>
                            <h2 className='text-6xl font-bold uppercase text-white font-bebas tracking-wider'>
                                Thunderbolts*
                            </h2>
                            <p className='text-sm text-zinc-200'>
                                Action, Adventure, Science Fiction
                            </p>

                        </div>


                    </div>

                    <div className="flex gap-5">

                        <div className="w-2/6 hidden lg:flex justify-center">

                            <div>
                                <img src="https://media.themoviedb.org/t/p/w220_and_h330_face/hqcexYHbiTBfDIdDWxrxPtVndBX.jpg" className="w-full rounded border-3 border-zinc-500 -translate-y-30" />
                            </div>

                        </div>
                        <div className="w-5/6 px-4">
                            <h4 className='font-bebas text-2xl text-white'>
                                Overview :
                            </h4>
                            <i>
                                After finding themselves ensnared in a death trap, seven disillusioned castoffs must embark on a dangerous mission that will force them to confront the darkest corners of their pasts.
                            </i>

                            <p className='mt-4'>
                                <b>Release Date : </b>
                                2025-04-30
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

        </>
    )
}

export default Movie