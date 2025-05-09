import express from "express";
import { getMovie, getMoviesList } from "../controller/movieListController.js";
import { addReply, addReview, getReview } from "../controller/reviewController.js";
import protectRoute from "../Middleware/authMiddleware.js";

const router = express.Router();

router.get("/list/:key", getMoviesList)
router.get("/:id", getMovie)
router.post("/review", protectRoute, addReview)
router.get("/review/:movieId", getReview)
router.post("/reply", protectRoute, addReply)

export default router;