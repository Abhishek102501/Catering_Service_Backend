import mongoose from 'mongoose'

const testimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  text: { type: String, required: true },
  rating: { type: Number, default: 5 },
  isActive: { type: Boolean, default: true }
}, { timestamps: true })

export default mongoose.model('Testimonial', testimonialSchema)
