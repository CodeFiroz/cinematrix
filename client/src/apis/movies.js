import axios from "axios"


export const movieslist = async (key) => {
    
    try{
        const listResponse = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/movies/list/${key}`);
        
        

        return {
            success: true,
            movies: listResponse.data,
        }

    }catch(error){
        return {
            success: false,
            message: error
        }
    }
    



}

export const movie = async (id) => {
    
    try{
        const MovieResponse = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/movies/${id}`);
        
        

        return {
            success: true,
            movies: MovieResponse.data,
        }

    }catch(error){
        return {
            success: false,
            message: error
        }
    }
    



}