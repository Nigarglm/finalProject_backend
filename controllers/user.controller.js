import User from '../models/user.model.js'; 
import bcrypt from 'bcrypt';
import { v2 as cloudinaryV2 } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

// Cloudinary configuration
cloudinaryV2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
};

// Get single user by ID
export const getSingleUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error });
  }
};

// Create a new user
export const createUser = async (req, res) => {
  const { email, fullName, userName, password } = req.body;
  const photoFile = req.file; // Assuming you're using middleware like multer for file uploads

  if (!photoFile) {
    return res.status(400).json({ message: 'Photo is required' });
  }

  try {
    // Upload photo to Cloudinary
    const result = await cloudinaryV2.uploader.upload(photoFile.path);
    
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const newUser = new User({
      email,
      photo: result.secure_url,
      fullName,
      userName,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
};

// Edit user details
export const editUser = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  if (req.file) {
    const photoFile = req.file;

    try {
      // Upload new photo to Cloudinary
      const result = await cloudinaryV2.uploader.upload(photoFile.path);
      updates.photo = result.secure_url;
    } catch (error) {
      return res.status(500).json({ message: 'Error uploading photo', error });
    }
  }

  try {
    const user = await User.findByIdAndUpdate(id, updates, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error });
  }
};

// Delete a user
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error });
  }
};
