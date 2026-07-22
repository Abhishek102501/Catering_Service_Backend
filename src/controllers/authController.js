import Admin from '../models/Admin.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' })
}

// Register admin
export const registerAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body

    const adminExists = await Admin.findOne({ email })
    if (adminExists) {
      return res.status(400).json({ message: 'Admin already exists' })
    }

    // Hash password manually
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const admin = await Admin.create({
      name,
      email,
      password: hashedPassword
    })

    res.status(201).json({
      success: true,
      message: 'Admin created successfully',
      token: generateToken(admin._id),
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email
      }
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Login admin
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body

    const admin = await Admin.findOne({ email })
    if (!admin) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    const isMatch = await bcrypt.compare(password, admin.password)
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    res.json({
      success: true,
      token: generateToken(admin._id),
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email
      }
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Get admin profile
export const getAdminProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id).select('-password')
    res.json({ success: true, data: admin })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}