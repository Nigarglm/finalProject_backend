import express from "express";
import {
  createMovie,
  getMovies,
  getSingleMovie,
  editMovie,
  deleteMovie,
} from "../controllers/movie.controller.js";

const router = express.Router();

router.post("/", createMovie);

router.get("/", getMovies);

router.get("/:id", getSingleMovie);

router.put("/:id", editMovie);

router.delete("/:id", deleteMovie);

export default router;