import { Link } from "react-router-dom"

const MovieCard = (props) => {
  return (
    <>
      <div>
        <Link to={`/movie/${props.id}`}>

          <img
            src={props.image}
            className='w-full rounded-2xl border-2 border-zinc-500 duration-200 ease-in-out hover:scale-95 hover:border-8 hover:border-amber-400'
          />
        </Link>
      </div>

    </>
  )
}

export default MovieCard