import bcrypt from 'bcryptjs'
import auth from '../middlewares/auth'
import User from '../models/User'

export default async (req, res) => {
  if (req.method === 'POST') {
    const { email, name, password, confirmpassword } = req.body
    const allFieldsExist = email && name && password && confirmpassword
    if (!allFieldsExist) {
      return res
        .status(400)
        .json({ status: 'error', message: 'all fields required' })
    }

    if (password.length < 6) {
      return res.status(400).json({
        status: 'error',
        message: 'Password must be at least 6 characters'
      })
    }
    if (name.length < 4 || name.length > 12) {
      return res.status(400).json({
        status: 'error',
        message: 'Name must be between 4 and 12 characters'
      })
    }
    if (password !== confirmpassword) {
      return res
        .status(400)
        .json({ status: 'error', message: 'Passwords do not match' })
    }
    if (!email.includes('@') || !email.includes('.')) {
      return res
        .status(400)
        .json({ status: 'error', message: 'Valid email required' })
    }

    const existingUser = await User.findOne({ email: email })
    if (existingUser) {
      return res.status(400).json({
        status: 'error',
        message: 'Profile with this email already exists'
      })
    }

    const hashedPw = await bcrypt.hash(password, 12)

    const newUser = new User({
      name: name,
      email: email.toLowerCase(),
      password: hashedPw
    })

    newUser
      .save()
      .then((result) => {
        res.status(201).json(result)
      })
      .catch((err) => {
        res.status(400).json(err)
      })
  }
  return res
    .status(400)
    .json({ status: 'error', message: 'method not supported' })
}

module.exports = router
