import React from 'react'


const ProfileHead = () => {

    

  return (
    <>
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
    </>
  )
}

export default ProfileHead