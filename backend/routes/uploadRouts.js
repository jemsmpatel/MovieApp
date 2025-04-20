import express from 'express';
import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

dotenv.config();

const router = express.Router();

// Cloudinary config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer Cloudinary Storage config
const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'Movies', // Cloudinary folder name
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
        transformation: [{ width: 500, height: 500, crop: 'limit' }],
    },
});

const upload = multer({ storage });

router.post('/', upload.single('image'), (req, res) => {
    if (req.file && req.file.path) {
        res.status(200).send({
            message: 'Image uploaded successfully',
            image: req.file.path, // Cloudinary image URL
        });
    } else {
        res.status(400).send({ message: 'Image upload failed' });
    }
});

export default router;
