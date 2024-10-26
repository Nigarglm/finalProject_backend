import Logo from '../models/logo.model.js'; 
import { v2 as cloudinaryV2 } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

// Cloudinary configuration
cloudinaryV2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Get all logos
export const getAllLogos = async (req, res) => {
  try {
    const logos = await Logo.find();
    res.status(200).json(logos);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching logos', error });
  }
};

// Get a single logo by ID
export const getSingleLogo = async (req, res) => {
  try {
    const logo = await Logo.findById(req.params.id);
    if (!logo) {
      return res.status(404).json({ message: 'Logo not found' });
    }
    res.status(200).json(logo);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching logo', error });
  }
};

// Create a new logo
export const createLogo = async (req, res) => {
  const logoFile = req.file; // Assuming you're using middleware like multer for file uploads

  if (!logoFile) {
    return res.status(400).json({ message: 'Logo image is required' });
  }

  try {
    // Upload logo to Cloudinary
    const result = await cloudinaryV2.uploader.upload(logoFile.path);

    // Create the logo entry
    const newLogo = new Logo({
      image: result.secure_url,
    });

    await newLogo.save();
    res.status(201).json(newLogo);
  } catch (error) {
    res.status(500).json({ message: 'Error creating logo', error });
  }
};

// Edit a logo
export const editLogo = async (req, res) => {
  const { id } = req.params;

  if (req.file) {
    const logoFile = req.file;

    try {
      // Upload new logo to Cloudinary
      const result = await cloudinaryV2.uploader.upload(logoFile.path);

      // Update the logo entry
      const updatedLogo = await Logo.findByIdAndUpdate(
        id,
        { image: result.secure_url },
        { new: true }
      );

      if (!updatedLogo) {
        return res.status(404).json({ message: 'Logo not found' });
      }
      res.status(200).json(updatedLogo);
    } catch (error) {
      res.status(500).json({ message: 'Error updating logo', error });
    }
  } else {
    res.status(400).json({ message: 'Logo image is required' });
  }
};

// Delete a logo
export const deleteLogo = async (req, res) => {
  const { id } = req.params;

  try {
    const logo = await Logo.findByIdAndDelete(id);
    if (!logo) {
      return res.status(404).json({ message: 'Logo not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting logo', error });
  }
};
