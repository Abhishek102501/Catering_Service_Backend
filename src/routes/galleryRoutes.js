import express from 'express'
import { getAllImages, uploadImage, deleteImage } from '../controllers/galleryController.js'
import { protect } from '../middleware/authMiddleware.js'
import { upload } from '../config/cloudinary.js'

const router = express.Router()

router.get('/', getAllImages)
router.post('/', protect, upload.single('image'), uploadImage)
router.delete('/:id', protect, deleteImage)

export default router