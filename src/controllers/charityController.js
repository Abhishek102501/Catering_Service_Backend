import Charity from '../models/Charity.js'
import { sendCharityEmail, sendConfirmationEmail } from '../utils/emailService.js'

// Create charity registration
export const createCharity = async (req, res) => {
  try {
    const { name, phone, email, type, message } = req.body

    if (!name || !phone || !type) {
      return res.status(400).json({ message: 'Name, phone and type are required' })
    }

    const charity = await Charity.create({
      name, phone, email, type, message
    })

    try {
      await sendCharityEmail(charity)
      if (email) await sendConfirmationEmail(email, name, 'charity')
    } catch (emailError) {
      console.log('Email error:', emailError.message)
    }

    res.status(201).json({
      success: true,
      message: 'Thank you! We will contact you soon.',
      data: charity
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Get all charity registrations (admin)
export const getAllCharity = async (req, res) => {
  try {
    const charities = await Charity.find().sort({ createdAt: -1 })
    res.json({ success: true, count: charities.length, data: charities })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Update status (admin)
export const updateCharityStatus = async (req, res) => {
  try {
    const charity = await Charity.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    )
    if (!charity) return res.status(404).json({ message: 'Record not found' })
    res.json({ success: true, data: charity })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}