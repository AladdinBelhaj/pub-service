import express from 'express';
import multer from 'multer';
import path from 'path';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join('uploads')),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});

const upload = multer({ storage });

router.post('/', upload.array('mediaFiles', 5), (req, res) => {
  console.log('req.files:', req.files);
  const { text } = req.body;
  const mediaUrls = req.files.map(file => `/uploads/${file.filename}`);
  res.json({ text, mediaUrls });
});

export default router;
