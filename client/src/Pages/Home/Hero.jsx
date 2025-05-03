import React from 'react'

const Hero = () => {
    return (
        <>

            <div className="h-100 px-5 lg:h-150 flex flex-col justify-center items-center">

                <h2
                    className='text-center font-bebas text-4xl lg:text-7xl text-zinc-200'
                >
                    Track films you’ve watched. <br />
                    Save those you want to see. <br />
                    Tell your friends what’s good.


                </h2>

                <div className="flex justify-center-items-center gap-4 mt-5 ">

                    <a 
                    href="#"
                    className='px-4 py-2 text-center rounded-full bg-amber-400 text-zinc-800 font-bold border-4 border-amber-500 uppercase duration-300 ease-in-out hover:scale-95'
                    >
                        Popular                     </a>

                    <a 
                    href="#"
                    className='px-4 py-2 rounded-full bg-slate-700 text-zinc-200 font-bold border-4 border-slate-800 uppercase duration-300 ease-in-out hover:scale-95'
                    >
                        Sign In Now !
                    </a>

                </div>

            </div>

        </>
    )
}

export default Hero
