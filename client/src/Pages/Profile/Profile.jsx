import React from 'react'

const Profile = () => {
    return (
        <>

            <div className="flex justify-center">
                <div className="w-full lg:max-w-8/10 py-20">

                    <div className="flex items-center gap-5">

                        <img
                            className='w-30 h-30 border-2 border-slate-900 rounded-full'
                            src="https://a.ltrbxd.com/resized/avatar/upload/1/6/2/0/3/1/5/9/shard/avtr-0-220-0-220-crop.jpg?v=66208a6847"
                            alt="" />

                        <div>
                            <h3 className='font-bebas text-2xl text-zinc-50'>
                                @bladeRunner0
                            </h3>
                            <p>
                                we get to choose who we let into our weird little worlds
                            </p>
                            <button className='text-sm px-4 py-1 bg-gray-700 text-zinc-400 mt-4 rounded cursor-pointer'>Edit Profile</button>
                        </div>

                    </div>

                    <div className='mt-10 grid grid-cols-8 gap-2'>

                        <a
                            className='text-amber-500 border-b-1 border-amber-400 text-center'
                            href="#">
                            Watched Movies
                        </a>

 <a
                            className='text-zinc-500 border-b-1 border-zinc-400 text-center'
                            href="#">
                            My Lists
                        </a>

                        <a
                            className='text-zinc-500 border-b-1 border-zinc-400 text-center'
                            href="#">
                            Recent Reviews
                        </a>

                        
                        <a
                            className='text-zinc-500 border-b-1 border-zinc-400 text-center'
                            href="#">
                            My Replies
                        </a>

                    </div>


                </div>
            </div>

        </>
    )
}

export default Profile