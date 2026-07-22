import mongoose from 'mongoose'

const charitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    trim: true
  },
  type: {
    type: String,
    required: true
  },
  message: {
    type: String
  },
  status: {
    type: String,
    enum: ['pending', 'contacted', 'active'],
    default: 'pending'
  }
}, { timestamps: true })

export default mongoose.model('Charity', charitySchema)