import Hero from '../models/herosec.model.js'; 
import { v2 as cloudinaryV2 } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

// Cloudinary configuration
cloudinaryV2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Get all hero sections
export const getAllHeroes = async (req, res) => {
  try {
    const heroes = await Hero.find();
    res.status(200).json(heroes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching hero sections', error });
  }
};

// Get a single hero section by ID
export const getSingleHero = async (req, res) => {
  try {
    const hero = await Hero.findById(req.params.id);
    if (!hero) {
      return res.status(404).json({ message: 'Hero section not found' });
    }
    res.status(200).json(hero);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching hero section', error });
  }
};

// Create a new hero section
export const createHero = async (req, res) => {
  const { text } = req.body;
  const bgImageFile = req.file; // Assuming you're using middleware like multer for file uploads

  if (!bgImageFile) {
    return res.status(400).json({ message: 'Background image is required' });
  }

  try {
    // Upload background image to Cloudinary
    const result = await cloudinaryV2.uploader.upload(bgImageFile.path);

    // Create the hero section
    const newHero = new Hero({
      image: result.secure_url,
      text,
    });

    await newHero.save();
    res.status(201).json(newHero);
  } catch (error) {
    res.status(500).json({ message: 'Error creating hero section', error });
  }
};

// Edit a hero section
export const editHero = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  if (req.file) {
    const bgImageFile = req.file;

    try {
      // Upload new background image to Cloudinary
      const result = await cloudinaryV2.uploader.upload(bgImageFile.path);
      updates.image = result.secure_url;
    } catch (error) {
      return res.status(500).json({ message: 'Error uploading background image', error });
    }
  }

  try {
    const hero = await Hero.findByIdAndUpdate(id, updates, { new: true });
    if (!hero) {
      return res.status(404).json({ message: 'Hero section not found' });
    }
    res.status(200).json(hero);
  } catch (error) {
    res.status(500).json({ message: 'Error updating hero section', error });
  }
};

// Delete a hero section
export const deleteHero = async (req, res) => {
  const { id } = req.params;

  try {
    const hero = await Hero.findByIdAndDelete(id);
    if (!hero) {
      return res.status(404).json({ message: 'Hero section not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting hero section', error });
  }
};


