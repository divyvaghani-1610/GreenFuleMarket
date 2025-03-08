const express = require('express');
const multer = require('multer');
const cloudinary = require('./cloudinaryConfig');

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/upload', upload.single('image'), async (req, res) => {
    try {
        cloudinary.uploader.upload_stream(
            { resource_type: 'auto', folder: 'uploads' },
            (error, result) => {
                if (error) return res.status(500).json({ error });

                res.json({ imageUrl: result.secure_url, publicId: result.public_id });
            }
        ).end(req.file.buffer);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
