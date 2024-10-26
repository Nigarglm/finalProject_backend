import Movie from '../models/movies.model.js'; 
import { v2 as cloudinaryV2 } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

// Cloudinary configuration
cloudinaryV2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Get all movies
export const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching movies', error });
  }
};

// Get a single movie by ID
export const getSingleMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching movie', error });
  }
};

// Create a new movie
export const createMovie = async (req, res) => {
  const { name, description, country, duration, year, category, main_actors, comments, rating, price } = req.body;
  
  const { posterFile, trailerFile, videoFile } = req.files; // Assuming you're using middleware like multer for file uploads

  if (!posterFile || !trailerFile || !videoFile) {
    return res.status(400).json({ message: 'All files (poster, trailer, video) are required' });
  }

  try {
    // Upload files to Cloudinary
    const posterResult = await cloudinaryV2.uploader.upload(posterFile.path);
    const trailerResult = await cloudinaryV2.uploader.upload(trailerFile.path);
    const videoResult = await cloudinaryV2.uploader.upload(videoFile.path);

    // Create the movie
    const newMovie = new Movie({
      poster: posterResult.secure_url,
      name,
      trailer: trailerResult.secure_url,
      video: videoResult.secure_url,
      description,
      country,
      duration,
      year,
      category,
      main_actors,
      comments,
      rating,
      price,
    });

    await newMovie.save();
    res.status(201).json(newMovie);
  } catch (error) {
    res.status(500).json({ message: 'Error creating movie', error });
  }
};

// Edit a movie
export const editMovie = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  if (req.files) {
    const { posterFile, trailerFile, videoFile } = req.files;

    try {
      // Upload new files to Cloudinary if provided
      if (posterFile) {
        const posterResult = await cloudinaryV2.uploader.upload(posterFile.path);
        updates.poster = posterResult.secure_url;
      }
      if (trailerFile) {
        const trailerResult = await cloudinaryV2.uploader.upload(trailerFile.path);
        updates.trailer = trailerResult.secure_url;
      }
      if (videoFile) {
        const videoResult = await cloudinaryV2.uploader.upload(videoFile.path);
        updates.video = videoResult.secure_url;
      }
    } catch (error) {
      return res.status(500).json({ message: 'Error uploading files', error });
    }
  }

  try {
    const movie = await Movie.findByIdAndUpdate(id, updates, { new: true });
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({ message: 'Error updating movie', error });
  }
};

// Delete a movie
export const deleteMovie = async (req, res) => {
  const { id } = req.params;

  try {
    const movie = await Movie.findByIdAndDelete(id);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting movie', error });
  }
};

