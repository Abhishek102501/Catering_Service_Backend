import express from 'express'
import {
  createCharity,
  getAllCharity,
  updateCharityStatus
} from '../controllers/charityController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/', createCharity)
router.get('/', protect, getAllCharity)
router.patch('/:id', protect, updateCharityStatus)

export default router