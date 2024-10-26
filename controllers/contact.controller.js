import Contact from '../models/contact.model.js'; 
import { v2 as cloudinaryV2 } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

// Cloudinary configuration
cloudinaryV2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Get all contacts
export const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching contacts', error });
  }
};

// Get a single contact by ID
export const getSingleContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching contact', error });
  }
};

// Create a new contact
export const createContact = async (req, res) => {
  const { name, link } = req.body;
  const iconFile = req.file; // Assuming you're using middleware like multer for file uploads

  if (!iconFile) {
    return res.status(400).json({ message: 'Contact icon is required' });
  }

  try {
    // Upload icon to Cloudinary
    const result = await cloudinaryV2.uploader.upload(iconFile.path);

    // Create the contact entry
    const newContact = new Contact({
      name,
      icon: result.secure_url,
      link,
    });

    await newContact.save();
    res.status(201).json(newContact);
  } catch (error) {
    res.status(500).json({ message: 'Error creating contact', error });
  }
};

// Edit a contact
export const editContact = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  if (req.file) {
    const iconFile = req.file;

    try {
      // Upload new icon to Cloudinary
      const result = await cloudinaryV2.uploader.upload(iconFile.path);
      updates.icon = result.secure_url;
    } catch (error) {
      return res.status(500).json({ message: 'Error uploading icon', error });
    }
  }

  try {
    const contact = await Contact.findByIdAndUpdate(id, updates, { new: true });
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ message: 'Error updating contact', error });
  }
};

// Delete a contact
export const deleteContact = async (req, res) => {
  const { id } = req.params;

  try {
    const contact = await Contact.findByIdAndDelete(id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting contact', error });
  }
};


