import express from "express";
import {
  createMovie,
  getAllMovies,
  getSingleMovie,
  editMovie,
  deleteMovie,
} from "../controllers/movie.controller.js";

const router = express.Router();

router.post("/", createMovie);

router.get("/", getAllMovies);

router.get("/:id", getSingleMovie);

router.put("/:id", editMovie);

router.delete("/:id", deleteMovie);

export default router;