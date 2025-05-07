import mongoose from "mongoose"

const MoviesCacheSchema = mongoose.Schema({
    movie_id: {
        type: Number,
        required: true,
    },
    data: {
        type: Object,
        required: true,
    },
}, {timestamps: true});

const MoviesCache = mongoose.model("MoviesCache", MoviesCacheSchema);

export default MoviesCache;