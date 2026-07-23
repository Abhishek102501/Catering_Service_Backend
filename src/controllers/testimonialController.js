import Testimonial from '../models/Testimonial.js'

export const getAllTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 })
    res.json({ success: true, data: testimonials })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const createTestimonial = async (req, res) => {
  try {
    const { name, role, text, rating } = req.body
    if (!name || !role || !text) {
      return res.status(400).json({ message: 'Name, role and text are required' })
    }
    const testimonial = await Testimonial.create({ name, role, text, rating })
    res.status(201).json({ success: true, data: testimonial })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const updateTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    if (!testimonial) return res.status(404).json({ message: 'Not found' })
    res.json({ success: true, data: testimonial })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const deleteTestimonial = async (req, res) => {
  try {
    await Testimonial.findByIdAndDelete(req.params.id)
    res.json({ success: true, message: 'Deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}