import mongoose from "mongoose"

const MovieListCacheSchema = mongoose.Schema({
    type: {
        type: String,
        required: true,
    },
    data: {
        type: Array,
        required: true,
    },
    lastFetched: {
        type: Date, 
        required: true,
    }
}, {timestamps: true});

const MovieListCache = mongoose.model("MovieListCache", MovieListCacheSchema);

export default MovieListCache;