import Movie from "../models/movies.model.js";

export const createMovie = async (req, res) => {
  try {
    const { poster, name, trailer, video, description, country, duration, year, category, main_actors, comments, rating, price } = req.body;

    if (!poster || !name || !trailer || !video || !description || !country || !duration || !year || !category || !main_actors || !comments || !rating || !price) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const movieExists = await Movie.findOne({
      $or: [{ name }, { trailer }, { video }],
    });
    if (movieExists) {
      let conflictField = "";
      if (movieExists.name === name) conflictField = "Name";
      else if (movieExists.trailer === trailer) conflictField = "Trailer";

      return res.status(400).json({ message: `${conflictField} already exists` });
    }

    const newMovie = new Movie({ name, trailer, video, description, country, duration, year, category, main_actors, comments });
    await newMovie.save();

    const movieResponse = {
      id: newMovie._id,
      name: newMovie.name,
      trailer: newMovie.trailer,
      video: newMovie.video,
      description: newMovie.description,
      country: newMovie.country,
      duration: newMovie.duration,
      year: newMovie.year,
      category: newMovie.category,
      main_actors: newMovie.main_actors,
      comments: newMovie.comments,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt,
    };

    res.status(201).json({ message: "Movie created successfully", movie: movieResponse });
  } catch (error) {
    console.error("Error in createMovie:", error);
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      return res.status(400).json({
        message: `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`,
      });
    }
    res.status(500).json({ message: "Server error" });
  }
};

export const getMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (error) {
    console.error("Error in getMovies:", error);
    res.status(500).json({ message: "Error fetching movies" });
  }
};

export const getSingleMovie = async (req, res) => {
  try {
    const movieId = req.params.id;

    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.status(200).json(movie);
  } catch (error) {
    console.error("Error in getSingleMovie:", error);
    res.status(500).json({ message: "Error fetching movie" });
  }
};

export const editMovie = async (req, res) => {
  try {
    const movieId = req.params.id;

    const existingMovie = await Movie.findById(movieId);
    if (!existingMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    const { name, trailer, video, description, country, duration, year, category, main_actors, comments } = req.body;

    const updateData = { name, trailer, video, description, country, duration, year, category, main_actors, comments };


    const updatedMovie = await Movie.findByIdAndUpdate(movieId, updateData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ message: "Movie updated successfully", movie: updatedMovie });
  } catch (error) {
    console.error("Error in editMovie:", error);
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      return res.status(400).json({
        message: `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`,
      });
    }
    res.status(500).json({ message: "Error editing movie", error: error.message }); 
  }
};


export const deleteMovie = async (req, res) => {
  try {
    const movieId = req.params.id;
    console.log("Deleting movie with ID:", movieId);

    const movie = await Movie.findByIdAndDelete(movieId);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.status(200).json({ message: "Movie deleted successfully" });
  } catch (error) {
    console.error("Error in deleteMovie:", error);
    res.status(500).json({ message: "Error deleting movie", error });
  }
};