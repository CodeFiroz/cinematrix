import express from "express";
import { getMovie, getMoviesList } from "../controller/movieListController.js";

const router = express.Router();

router.get("/list/:key", getMoviesList)
router.get("/:id", getMovie)

export default router;