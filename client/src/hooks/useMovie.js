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
    
    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const MovieResponse = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/movies/${id}`);
                if (MovieResponse.data.success) {
                    setMovies(MovieResponse.data.data);
                } else {
                    console.error(`Failed to fetch ${id} movies:`, MovieResponse.data.message);
                }
            } catch (error) {
                console.error(`Error fetching ${id} movies:`, error.message);
            }
        };

        fetchMovies();
    }, [id]);

    return movies;
};

export const useGetMovieReview = (id) => {
    const [reviews, setReviews] = useState([]);
    
    useEffect(() => {
        const fetchMoviesReviews = async () => {
            try {
                const MovieResponse = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/movies/review/${id}`);
                
                if (MovieResponse.data.success) {
                    setReviews(MovieResponse.data.reviews);
                } else {
                    console.error(`Failed to fetch ${id} movies review:`, MovieResponse.data.message);
                }
            } catch (error) {
                console.error(`Error fetching ${id} movies review:`, error.message);
            }
        };

        fetchMoviesReviews();
    }, [id]);

    return reviews;
};


