import express from 'express';
import multer from 'multer';
import { createMovie, getAllMovies, getSingleMovie, editMovie, deleteMovie } from '../controllers/movie.controller.js';

const router = express.Router();

const upload = multer({ dest: 'uploads/' }); // Specify the destination for file uploads

// Create a new movie route
router.post('/movies', upload.fields([{ name: 'posterFile' }, { name: 'trailerFile' }, { name: 'videoFile' }]), createMovie);

router.get("/", getAllMovies);

router.get("/:id", getSingleMovie);

// Edit a movie route
router.put('/movies/:id', upload.fields([{ name: 'posterFile' }, { name: 'trailerFile' }, { name: 'videoFile' }]), editMovie);

router.delete("/:id", deleteMovie);

export default router;



