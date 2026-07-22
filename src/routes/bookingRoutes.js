import express from 'express'
import {
  createBooking,
  getAllBookings,
  updateBookingStatus,
  deleteBooking
} from '../controllers/bookingController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/', createBooking)
router.get('/', protect, getAllBookings)
router.patch('/:id', protect, updateBookingStatus)
router.delete('/:id', protect, deleteBooking)

export default router