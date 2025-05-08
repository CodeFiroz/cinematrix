import MovieReview from "../models/Review.js"

export const addReview = async (req, res)=>{

    const {movieId, content} = req.body;

    if(!movieId || !content){
        return res.status(400).json({
            success: false,
            message: "Invalid Data.",
        })
    }
    try{

        const user = req.user;

        

        const newReview = new MovieReview({
            movieId: movieId,
            userId: user._id,
            content: content
        })

        await newReview.save();

        return res.status(200).json({
            success: true,
            message: "Review Added"
        })
    }catch (err) {
        console.log(`add Review error :: ${err}`);
        return res.status(500).json({ success: false, message: "Oops! We're having server issues. Try again later." });
    }

}

export const getReview = async (req, res)=>{

    const {movieId} = req.params;

    if(!movieId){
        return res.status(400).json({
            success: false,
            message: "Invalid movie id",
        })
    }
    try{


        const reviews = await MovieReview.find({movieId}).populate('userId').populate("movieId");

        return res.status(200).json({
            success: true,
            reviews: reviews
        })
    }catch (err) {
        console.log(`get Review error :: ${err}`);
        return res.status(500).json({ success: false, message: "Oops! We're having server issues. Try again later." });
    }

}