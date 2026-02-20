const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

if (process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_KEY.includes('your_api_key')) {
    console.warn('Warning: Cloudinary credentials are not configured in .env. Image uploads will fail.');
}


const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'smart_mirror_wardrobe',
        allowed_formats: ['jpg', 'png', 'jpeg'],
    },
});

const upload = multer({ storage: storage });

module.exports = { cloudinary, upload };
