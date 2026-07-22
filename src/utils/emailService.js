import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
  }
})

export const sendBookingEmail = async (booking) => {
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: process.env.GMAIL_USER,
    subject: `New Booking Request - ${booking.eventType}`,
    html: `
      <h2>New Booking Request Received</h2>
      <table border="1" cellpadding="10" cellspacing="0">
        <tr><td><b>Name</b></td><td>${booking.name}</td></tr>
        <tr><td><b>Phone</b></td><td>${booking.phone}</td></tr>
        <tr><td><b>Email</b></td><td>${booking.email || 'Not provided'}</td></tr>
        <tr><td><b>Event Type</b></td><td>${booking.eventType}</td></tr>
        <tr><td><b>Event Date</b></td><td>${booking.eventDate || 'Not specified'}</td></tr>
        <tr><td><b>Guests</b></td><td>${booking.guests || 'Not specified'}</td></tr>
        <tr><td><b>Message</b></td><td>${booking.message || 'None'}</td></tr>
      </table>
      <p>Login to admin dashboard to manage this booking.</p>
    `
  }

  await transporter.sendMail(mailOptions)
}

export const sendCharityEmail = async (charity) => {
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: process.env.GMAIL_USER,
    subject: `New Charity Registration - ${charity.type}`,
    html: `
      <h2>New Charity Registration</h2>
      <table border="1" cellpadding="10" cellspacing="0">
        <tr><td><b>Name</b></td><td>${charity.name}</td></tr>
        <tr><td><b>Phone</b></td><td>${charity.phone}</td></tr>
        <tr><td><b>Email</b></td><td>${charity.email || 'Not provided'}</td></tr>
        <tr><td><b>Type</b></td><td>${charity.type}</td></tr>
        <tr><td><b>Message</b></td><td>${charity.message || 'None'}</td></tr>
      </table>
    `
  }

  await transporter.sendMail(mailOptions)
}

export const sendConfirmationEmail = async (to, name, type) => {
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to,
    subject: `Thank you for contacting LTCS!`,
    html: `
      <h2>Dear ${name},</h2>
      <p>Thank you for your ${type} request with <b>Lala Trivedi Catering Service</b>.</p>
      <p>We have received your request and will contact you within <b>24 hours</b>.</p>
      <br/>
      <p>For urgent queries, call us at:</p>
      <p><b>+91-9936485155 | +91-8299503034</b></p>
      <br/>
      <p>With regards,<br/>Team LTCS</p>
    `
  }

  await transporter.sendMail(mailOptions)
}