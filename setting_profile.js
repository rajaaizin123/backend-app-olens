const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const admin = require('firebase-admin');
require('dotenv').config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(
            require('./servicesAccountKey.json'),
        ),
    });
}

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 }, // maks 5 MB
});

// =========================
// HANDLER: POST /upload-profile
// =========================
async function uploadProfile(req, res) {
    try {
        const authHeader = req.headers.authorization || '';
        const token = authHeader.replace('Bearer ', '').trim();
        if (!token) {
            return res.status(401).json({ error: 'Token tidak ada' });
        }

        let decoded;
        try {
            decoded = await admin.auth().verifyIdToken(token);
        } catch (e) {
            return res.status(401).json({ error: 'Token tidak valid' });
        }
        const uid = decoded.uid;

        if (!req.file) {
            return res.status(400).json({ error: 'File tidak ditemukan' });
        }

        const result = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                {
                    folder: 'profile_photos',
                    public_id: uid,
                    overwrite: true,
                    resource_type: 'image',
                    transformation: [
                        { width: 512, height: 512, crop: 'fill', gravity: 'auto' },
                        { quality: 'auto', fetch_format: 'auto' },
                    ],
                },
                (error, uploaded) => (error ? reject(error) : resolve(uploaded)),
            );
            stream.end(req.file.buffer);
        });

        // Balas URL
        return res.status(200).json({ secure_url: result.secure_url });
    } catch (err) {
        console.error('Upload profile error:', err);
        return res.status(500).json({ error: 'Upload gagal' });
    }
}

module.exports = { upload, uploadProfile };