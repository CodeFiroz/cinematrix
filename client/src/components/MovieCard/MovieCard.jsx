import React from 'react'

const MovieCard = (props) => {
  return (
    <>
        <div>
           <a href="#">
           <img 
              src={props.image} 
              className='w-full border-4 border-zinc-400 rounded-2xl hover:border-amber-500 duration-200 hover:scale-95'
            />
            <h4>
              {props.title}
            </h4>
           </a>
        </div>

    </>
  )
}

export default MovieCard