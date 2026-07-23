import mongoose from 'mongoose'

const gallerySchema = new mongoose.Schema({
  url: { type: String, required: true },
  publicId: { type: String, required: true },
  caption: { type: String, default: '' },
  category: { type: String, default: 'general' }
}, { timestamps: true })

export default mongoose.model('Gallery', gallerySchema)