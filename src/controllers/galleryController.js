import Gallery from '../models/Gallery.js'
import cloudinary from '../config/cloudinary.js'

export const getAllImages = async (req, res) => {
  try {
    const images = await Gallery.find().sort({ createdAt: -1 })
    res.json({ success: true, data: images })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const uploadImage = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' })

    const image = await Gallery.create({
      url: req.file.path,
      publicId: req.file.filename,
      caption: req.body.caption || '',
      category: req.body.category || 'general'
    })

    res.status(201).json({ success: true, data: image })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const deleteImage = async (req, res) => {
  try {
    const image = await Gallery.findById(req.params.id)
    if (!image) return res.status(404).json({ message: 'Image not found' })

    await cloudinary.uploader.destroy(image.publicId)
    await Gallery.findByIdAndDelete(req.params.id)

    res.json({ success: true, message: 'Image deleted' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}