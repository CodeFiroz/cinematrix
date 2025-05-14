import MovieListCache from "../models/MovieListCache.js";
import MoviesCache from "../models/MoviesCache.js";
import axios from "axios";
import User from "../models/User.js";

export const getMoviesList = async (req, res) => {

    const validkeys = ["popular", "now_playing", "top_rated", "upcoming"];

    const { key } = req.params;

    try {

        if (!key) {
            return res.status(400).json({
                success: false,
                message: "Please give a search key"
            })
        }

        if (!validkeys.includes(key)) {
            return res.status(400).json({
                success: false,
                message: "invalid key"
            })
        }

        const cache = await MovieListCache.findOne({ type: key });

        const SIX_HOURS = 1000 * 60 * 60 * 6;
        const now = new Date();

        if (cache && now - cache.lastFetched < SIX_HOURS) {
            console.log("Serving from database cache 👴");
            return res.status(200).json({
                success: true,
                data: cache.data
            });
        }

        console.log("Fetching from TMDB 🌐");

        const url = `https://api.themoviedb.org/3/movie/${key}?language=en-US&page=1`;

        const options = {
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${process.env.TMDB_API_KEY}`
            }
        };

        const tmdbResponse = await axios.get(url, options);
        const movies = tmdbResponse.data.results;



        if (cache) {
            cache.data = movies;
            cache.lastFetched = now;
            await cache.save();
        } else {

            const saveCache = new MovieListCache({
                type: key,
                data: movies,
                lastFetched: now
            })

            await saveCache.save();

        }

        return res.status(200).json({
            success: true,
            data: movies
        });

    } catch (err) {
        console.log(`movie list fetching error :: ${err}`);
        return res.status(500).json({ success: false, message: "Oops! We're having server issues. Try again later." });
    }

}

export const getMovie = async (req, res) => {


    const { id } = req.params;

    try {

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Please give a search key"
            })
        }



        const cache = await MoviesCache.findOne({ movie_id: id });

        if (cache) {
            return res.status(200).json({
                success: true,
                data: cache.data
            });
        }


        const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;

        const options = {
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${process.env.TMDB_API_KEY}`
            }
        };

        const tmdbResponse = await axios.get(url, options);

        const movieDetail = tmdbResponse.data;



        const saveCache = new MoviesCache({
            movie_id: id,
            data: movieDetail,
        })

        await saveCache.save();


        return res.status(200).json({
            success: true,
            data: movieDetail
        });

    } catch (err) {
        console.log(`movie fetching error :: ${err}`);
        return res.status(500).json({ success: false, message: "Oops! We're having server issues. Try again later." });
    }

}


export const toggleWatchlist = async (req, res) => {

const { movieId } = req.body;

    if (!movieId) {
        return res.status(400).json({
            success: false,
            message: "Missing required fields: 'movieId'. Please check your input and try again.",
        });
    }

    try {


        const searchMovie = await MoviesCache.findById(movieId);

        if (!searchMovie) {
            return res.status(404).json({
                success: false,
                message: "Movie not found. It may have been deleted or does not exist.",
            });
        }

        const user = req.user;

        if (User.watchlist.includes(movieId)) {
            await User.findByIdAndUpdate(user._id, {
                $pull: { watchlist: movieId },
            });
            return res.status(200).json({
                success: true,
                message: "Remove the movie.",
            });

        } else {
            await User.findByIdAndUpdate(user._id, {
                $push: { watchlist: movieId },
            });
            return res.status(200).json({
                success: true,
                message: "Added to list.",
            });

        }



    } catch (err) {
        console.error("❌ [Toggle Watchlist Review Error]:", err.message, "on URL:", req.originalUrl);


        return res.status(500).json({
            success: false,
            message: "Something went wrong on our end. Please try again in a moment.",
        });
    }

}