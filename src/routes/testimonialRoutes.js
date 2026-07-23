import express from 'express'
import {
  getAllTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial
} from '../controllers/testimonialController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/', getAllTestimonials)
router.post('/', protect, createTestimonial)
router.patch('/:id', protect, updateTestimonial)
router.delete('/:id', protect, deleteTestimonial)

export default router