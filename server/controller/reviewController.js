import MovieReview from "../models/Review.js"
import ReviewReply from "../models/Reply.js"

export const addReview = async (req, res) => {

    const { movieId, content, rating } = req.body;

    if (!movieId || !content || !rating) {
        return res.status(400).json({
            success: false,
            message: "Missing required fields: 'reviewId' and/or 'content'. Please check your input and try again.",
        });

    }
    try {

        const user = req.user;

        const newReview = new MovieReview({
            movieId: movieId,
            userId: user._id,
            content: content,
            rating: rating
        })

        await newReview.save();

        return res.status(200).json({
            success: true,
            message: "Successfully added the review.",
        });

    } catch (err) {
        console.error("❌ [Add Review Error]:", err.message, "on URL:", req.originalUrl);


        return res.status(500).json({
            success: false,
            message: "Something went wrong on our end. Please try again in a moment.",
        });
    }

}

export const getReview = async (req, res) => {

    const { movieId } = req.params;

    if (!movieId) {
        return res.status(400).json({
            success: false,
            message: "'movieId' is required. Please check your input.",
        });
    }
    try {


        const reviews = await MovieReview.find({ movieId })
            .populate('userId')
            .populate({
                path: 'replies',
                populate: {
                    path: 'userId',
                    model: 'User',
                    select: "username profile_picture"
                }
            })
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            message: "Reviews fetched successfully.",
            data: reviews
        });

    } catch (err) {
        console.error("❌ [Fetching Review Error]:", err.message, "on URL:", req.originalUrl);

        return res.status(500).json({
            success: false,
            message: "Something went wrong on our end. Please try again in a moment.",
        });;
    }

}

export const addReply = async (req, res) => {
    const { reviewId, content } = req.body;

    if (!reviewId || !content) {
        return res.status(400).json({
            success: false,
            message: "Missing required fields: 'reviewId' and/or 'content'. Please check your input and try again.",
        });
    }

    try {
        const searchReview = await MovieReview.findById(reviewId);

        if (!searchReview) {
            return res.status(404).json({
                success: false,
                message: "Review not found. It may have been deleted or does not exist.",
            });
        }

        const user = req.user;

        const newReply = new ReviewReply({
            ReviewId: reviewId,
            userId: user._id,
            content: content,
        });


        await newReply.save();


        await MovieReview.findByIdAndUpdate(reviewId, {
            $push: { replies: newReply._id },
        });

        return res.status(200).json({
            success: true,
            message: "Reply added successfully.",
            replyId: newReply._id,
        });

    } catch (err) {
        console.error("❌ [Add Reply Error]:", err.message, "on URL:", req.originalUrl);


        return res.status(500).json({
            success: false,
            message: "Something went wrong on our end. Please try again in a moment.",
        });
    }
};
