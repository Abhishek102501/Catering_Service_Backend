import mongoose from 'mongoose'

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
}, { timestamps: true })

adminSchema.methods.matchPassword = async function(enteredPassword) {
  const bcrypt = await import('bcryptjs')
  return await bcrypt.default.compare(enteredPassword, this.password)
}

export default mongoose.model('Admin', adminSchema)