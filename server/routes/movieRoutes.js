import express from "express";
import { getMoviesList } from "../controller/movieListController.js";

const router = express.Router();

router.get("/list/:key", getMoviesList)

export default router;