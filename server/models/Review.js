import mongoose from "mongoose";

const MovieReviewSchema = new mongoose.Schema({
  movieId: {
    type: Number,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  content: {
    type: String,
    required: true,
    trim: true,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }
  ],
  replies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ReviewReply', 
    }
  ]
}, { timestamps: true });

export default mongoose.model('MovieReview', MovieReviewSchema);
