import Booking from '../models/Booking.js'
import { sendBookingEmail, sendConfirmationEmail } from '../utils/emailService.js'

// Create booking
export const createBooking = async (req, res) => {
  try {
    const { name, phone, email, eventType, eventDate, guests, message } = req.body

    if (!name || !phone || !eventType) {
      return res.status(400).json({ message: 'Name, phone and event type are required' })
    }

    const booking = await Booking.create({
      name, phone, email, eventType, eventDate, guests, message
    })

    // Send email to owner
    try {
      await sendBookingEmail(booking)
      if (email) await sendConfirmationEmail(email, name, 'booking')
    } catch (emailError) {
      console.log('Email error:', emailError.message)
    }

    res.status(201).json({
      success: true,
      message: 'Booking request received successfully!',
      data: booking
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Get all bookings (admin)
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 })
    res.json({ success: true, count: bookings.length, data: bookings })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Update booking status (admin)
export const updateBookingStatus = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    )
    if (!booking) return res.status(404).json({ message: 'Booking not found' })
    res.json({ success: true, data: booking })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Delete booking (admin)
export const deleteBooking = async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id)
    res.json({ success: true, message: 'Booking deleted' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}