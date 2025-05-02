import ReviewCard from "../../components/ReviewCard/ReviewCard"
import Hero from "./Hero"

const Home = () => {
    return (
        <>


          <div className="flex justify-center">
          <div className="w-full lg:max-w-8/10 px-8">
            <Hero />


                <h3
                    className="text-3xl font-bebas text-zinc-300 my-5"
                >
                    Popular reviews this week
                </h3>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

                    <ReviewCard />
                    <ReviewCard />
                    <ReviewCard />
                    <ReviewCard />

                </div>


            </div>
          </div>



        </>
    )
}

export default Home
