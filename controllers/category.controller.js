import Category from '../models/category.model.js'; 
import { v2 as cloudinaryV2 } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

// Cloudinary configuration
cloudinaryV2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Get all categories
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching categories', error });
  }
};

// Get a single category by ID
export const getSingleCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching category', error });
  }
};

// Create a new category
export const createCategory = async (req, res) => {
  const { name } = req.body;
  const imageFile = req.file; 

  if (!imageFile) {
    return res.status(400).json({ message: 'Category image is required' });
  }

  try {
    // Upload image to Cloudinary
    const result = await cloudinaryV2.uploader.upload(imageFile.path);

    // Create the category entry
    const newCategory = new Category({
      image: result.secure_url,
      name,
    });

    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ message: 'Error creating category', error });
  }
};

// Edit a category
export const editCategory = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  if (req.file) {
    const imageFile = req.file;

    try {
      // Upload new image to Cloudinary
      const result = await cloudinaryV2.uploader.upload(imageFile.path);
      updates.image = result.secure_url;
    } catch (error) {
      return res.status(500).json({ message: 'Error uploading category image', error });
    }
  }

  try {
    const category = await Category.findByIdAndUpdate(id, updates, { new: true });
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: 'Error updating category', error });
  }
};

// Delete a category
export const deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting category', error });
  }
};
