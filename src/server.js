import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './config/db.js'
import bookingRoutes from './routes/bookingRoutes.js'
import charityRoutes from './routes/charityRoutes.js'
import authRoutes from './routes/authRoutes.js'
import testimonialRoutes from './routes/testimonialRoutes.js'

dotenv.config()
connectDB()

const app = express()

// Middleware
app.use(cors({ origin: process.env.CLIENT_URL }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/api/bookings', bookingRoutes)
app.use('/api/charity', charityRoutes)
app.use('/api/auth', authRoutes)


// Add after other routes:
app.use('/api/testimonials', testimonialRoutes)
// Test route
app.get('/', (req, res) => {
  res.json({ message: 'LTCS Backend Running!' })
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

export default app