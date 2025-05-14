import MovieReview from "../models/Review.js"
import ReviewReply from "../models/Reply.js"
import mongoose from "mongoose"
import axios from "axios"

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

export const LikeReview = async (req, res) => {
    const { reviewId } = req.body;

    if (!reviewId) {
        return res.status(400).json({
            success: false,
            message: "Missing required fields: 'reviewId'. Please check your input and try again.",
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

        if (searchReview.likes.includes(user._id)) {
            await MovieReview.findByIdAndUpdate(reviewId, {
                $pull: { likes: user._id },
            });
            return res.status(200).json({
                success: true,
                message: "Dislike the review.",
            });

        } else {
            await MovieReview.findByIdAndUpdate(reviewId, {
                $push: { likes: user._id },
            });
            return res.status(200).json({
                success: true,
                message: "Liked the review.",
            });

        }



    } catch (err) {
        console.error("❌ [Like Review Error]:", err.message, "on URL:", req.originalUrl);


        return res.status(500).json({
            success: false,
            message: "Something went wrong on our end. Please try again in a moment.",
        });
    }
};

export const LikeReply = async (req, res) => {
    const { replyId } = req.body;

    if (!replyId) {
        return res.status(400).json({
            success: false,
            message: "Missing required fields: 'replyId'. Please check your input and try again.",
        });
    }

    try {


        const searchReply = await ReviewReply.findById(replyId);

        if (!searchReply) {
            return res.status(404).json({
                success: false,
                message: "Reply not found. It may have been deleted or does not exist.",
            });
        }

        const user = req.user;

        if (searchReply.likes.includes(user._id)) {
            await ReviewReply.findByIdAndUpdate(replyId, {
                $pull: { likes: user._id },
            });
            return res.status(200).json({
                success: true,
                message: "Dislike the review.",
            });

        } else {
            await ReviewReply.findByIdAndUpdate(replyId, {
                $push: { likes: user._id },
            });
            return res.status(200).json({
                success: true,
                message: "Liked the review.",
            });

        }



    } catch (err) {
        console.error("❌ [Like Review Error]:", err.message, "on URL:", req.originalUrl);


        return res.status(500).json({
            success: false,
            message: "Something went wrong on our end. Please try again in a moment.",
        });
    }
};

export const DeleteReview = async (req, res) => {

    const { reviewId } = req.body;



    if (!reviewId) {
        return res.status(400).json({
            success: false,
            message: "Missing required fields: 'reviewId'. Please check your input and try again.",
        });

    }
    try {

        const user = req.user;



        const review = await MovieReview.findById(reviewId).populate('userId');

        if (!review) {
            return res.status(400).json({
                success: false,
                message: "Can't find review.",
            });
        }

        if (review.userId._id.toString() !== user._id.toString()) {


            return res.status(400).json({
                success: false,
                message: "You don't have permission to perform this task.",
            });
        }

        if (mongoose.Types.ObjectId.isValid(reviewId)) {
            await MovieReview.findOneAndDelete({ _id: reviewId });
        } else {
            throw new Error("Invalid review ID");
        }

        return res.status(200).json({
            success: true,
            message: "Successfully delete the review.",
        });

    } catch (err) {
        console.error("❌ [Delete Review Error]:", err.message, "on URL:", req.originalUrl);


        return res.status(500).json({
            success: false,
            message: "Something went wrong on our end. Please try again in a moment.",
        });
    }

}

export const DeleteReply = async (req, res) => {

    const { replyId } = req.body;



    if (!replyId) {
        return res.status(400).json({
            success: false,
            message: "Missing required fields: 'replyId'. Please check your input and try again.",
        });

    }
    try {

        const user = req.user;



        const reply = await ReviewReply.findById(replyId).populate('userId');

        if (!reply) {
            return res.status(400).json({
                success: false,
                message: "Can't find reply.",
            });
        }

        if (reply.userId._id.toString() !== user._id.toString()) {



            return res.status(400).json({
                success: false,
                message: "You don't have permission to perform this task.",
            });
        }

        if (mongoose.Types.ObjectId.isValid(replyId)) {
            await ReviewReply.findOneAndDelete({ _id: replyId });
        } else {
            throw new Error("Invalid reply ID");
        }

        return res.status(200).json({
            success: true,
            message: "Successfully delete the reply.",
        });

    } catch (err) {
        console.error("❌ [Delete Reply Error]:", err.message, "on URL:", req.originalUrl);


        return res.status(500).json({
            success: false,
            message: "Something went wrong on our end. Please try again in a moment.",
        });
    }

}

export const getMyReplies = async (req, res) => {

    try {


        const user = req.user;

        const replies = await ReviewReply.find({ userId: user._id })
            .populate({
                path: 'ReviewId',
                populate: [
                    {
                        path: 'userId',
                        select: 'name username profile_picture'
                    }
                ]
            }).populate('userId')
            .sort({ createdAt: -1 });


        if (!replies) {
            return res.status(400).json({
                success: false,
                message: "Something went wrong . No Replies Found.",
            });;
        }

        return res.status(200).json({
            success: true,
            message: "replies fetched successfully.",
            data: replies
        });

    } catch (err) {
        console.error("❌ [Fetching Review Error]:", err.message, "on URL:", req.originalUrl);

        return res.status(500).json({
            success: false,
            message: "Something went wrong on our end. Please try again in a moment.",
        });
    }

}


export const getMyReviews = async (req, res) => {
  try {
    const user = req.user;

    const reviews = await MovieReview.find({ userId: user._id })
      .populate('replies')
      .sort({ createdAt: -1 });

    if (!reviews || reviews.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No reviews found.",
      });
    }

    // Attach TMDB movie details to each review
    const reviewsWithMovie = await Promise.all(
      reviews.map(async (review) => {
        let movie = null;

        try {
          const tmdbRes = await axios.get(
            `https://api.themoviedb.org/3/movie/${review.movieId}?language=en-US`,
            {
              headers: {
                accept: 'application/json',
                Authorization: `Bearer ${process.env.TMDB_API_KEY}`
              }
            }
          );
          movie = tmdbRes.data;
        } catch (err) {
          console.error(`TMDB fetch failed for movieId ${review.movieId}:`, err.message);
        }

        return {
          ...review.toObject(),
          movie: movie || null,
        };
      })
    );

    return res.status(200).json({
      success: true,
      message: "Reviews fetched successfully.",
      data: reviewsWithMovie,
    });



  } catch (err) {
    console.error("❌ [Fetching Review Error]:", err.message, "on URL:", req.originalUrl);

    return res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

