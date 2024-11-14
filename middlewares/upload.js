// upload.js
import multer from 'multer';
import path from 'path';

// Configure storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Make sure this directory exists
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Append file extension
  }
});

// Create multer instance
const upload = multer({ storage });

// Define the fields to be uploaded
export const uploadFiles = upload.fields([
  { name: 'posterFile', maxCount: 1 },
  { name: 'trailerFile', maxCount: 1 },
  { name: 'videoFile', maxCount: 1 },
]);
