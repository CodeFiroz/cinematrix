import { useEffect, useState } from "react";
import axios from "axios";

export const useFetchMoviesList = (type) => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMoviesList = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/movies/list/${type}`);

                if (response.data.success) {
                    setMovies(response.data.data.slice(0, 12));
                } else {
                    console.error(`Failed to fetch ${type} movies:`, response.data.message);
                }
            } catch (error) {
                console.error(`Error fetching ${type} movies:`, error.message);
            }
        };

        fetchMoviesList();
    }, [type]);

    return movies;
};

export const useFetchMovies = (id) => {
    const [movies, setMovies] = useState(null);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchMovies = async () => {
            setLoading(true);
            try {
                const MovieResponse = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/movies/${id}`);
                if (MovieResponse.data.success) {
                    setMovies(MovieResponse.data.data);
                } else {
                    console.error(`Failed to fetch ${id} movies:`, MovieResponse.data.message);
                }
            } catch (error) {
                console.error(`Error fetching ${id} movies:`, error.message);
            } finally {
                setLoading(false)
            }
        };

        fetchMovies();
    }, [id]);

    return { data: movies, isLoading: loading };
};

export const useGetMovieReview = (id) => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        setLoading(true)
        const fetchMoviesReviews = async () => {
            try {
                const MovieResponse = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/movies/review/${id}`);

                if (MovieResponse.data.success) {
                    setReviews(MovieResponse.data.data);
                } else {
                    console.error(`Failed to fetch ${id} movies review:`, MovieResponse.data.message);
                }
            } catch (error) {
                console.error(`Error fetching ${id} movies review:`, error.message);
            } finally {
                setLoading(false)
            }
        };

        fetchMoviesReviews();
    }, [id]);

    return { data: reviews, isLoading: loading };
};

export const AddMoviesReviews = async (movieid, content, rating) => {
    try {
        const MovieResponse = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/movies/review`, {
            movieId: movieid,
            content: content,
            rating: rating
        }, { withCredentials: true });

        if (MovieResponse.data.success) {
            return true;
        } else {
            console.error(`Failed to fetch ${movieid} movies review:`, MovieResponse.data.message);
            return false;
        }
    } catch (error) {
        console.error(`Error fetching ${movieid} movies review:`, error.message);
        return false;
    }
};

export const AddReply = async (formdata) => {
    try {
        const Reply = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/movies/reply`, formdata, { withCredentials: true });

        if (Reply.data.success) {
            return true;
        } else {
            console.error(`Failed to fetch  movies review:`, Reply.data.message);
            return false;
        }
    } catch (error) {
        console.error(`Error fetching  movies review:`, error.message);
        return false;
    }
};

export const DeleteReply = async (replyId) => {
    try {
        const Delete = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/movies/reply`, {
            data: { replyId },
            withCredentials: true
        });
        if (Delete.data.success) {
            return true;
        } else {
            console.error(`Failed to fetch  movies review:`, Delete.data.message);
            return false;
        }
    } catch (error) {
        console.error(`Error fetching  movies review:`, error.message);
        return false;
    }
};


export const LikeReview = async (reviewId) => {
    try {
        const Like = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/movies/review/like`, { reviewId }, { withCredentials: true });

        if (Like.data.success) {
            return true;
        } else {
            console.error(`Failed to fetch  movies review:`, Like.data.message);
            return false;
        }
    } catch (error) {
        console.error(`Error fetching  movies review:`, error.message);
        return false;
    }
};

export const DeleteReview = async (reviewId) => {
    try {
        const Delete = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/movies/review`, {
            data: { reviewId },
            withCredentials: true
        });
        if (Delete.data.success) {
            return true;
        } else {
            console.error(`Failed to fetch  movies review:`, Delete.data.message);
            return false;
        }
    } catch (error) {
        console.error(`Error fetching  movies review:`, error.message);
        return false;
    }
};
