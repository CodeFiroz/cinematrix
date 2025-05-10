import mongoose from "mongoose";

const ReviewReplySchema = new mongoose.Schema({
  ReviewId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MovieReview',
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
  ]
}, { timestamps: true });

export default mongoose.model('ReviewReply', ReviewReplySchema);
