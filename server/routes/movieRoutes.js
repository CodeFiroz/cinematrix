import express from "express";
import { getMovie, getMoviesList } from "../controller/movieListController.js";
import { addReply, addReview, DeleteReply, DeleteReview, getReview, LikeReview } from "../controller/reviewController.js";
import protectRoute from "../Middleware/authMiddleware.js";

const router = express.Router();

router.get("/list/:key", getMoviesList)
router.get("/:id", getMovie)
router.delete("/review", protectRoute, DeleteReview)
router.post("/review", protectRoute, addReview)
router.post("/review/like", protectRoute, LikeReview)
router.get("/review/:movieId", getReview)
router.post("/reply", protectRoute, addReply)
router.delete("/reply", protectRoute, DeleteReply)

export default router;