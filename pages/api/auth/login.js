import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User'

export default async (req, res) => {
  if (req.method === 'POST') {
    const { email, password } = req.body
    if (!email) {
      return res
        .status(400)
        .json({ status: 'error', message: 'Email field required' })
    }
    if (!password) {
      return res
        .status(400)
        .json({ status: 'error', message: 'Password field required' })
    }
    try {
      const user = await User.findOne({ email })
      if (!user) {
        return res.status(400).json({ err: 'No user found with this email' })
      }

      const passwordsMatch = await bcrypt.compare(password, user.password)
      if (passwordsMatch) {
        const token = jwt.sign(
          {
            tokenUser: {
              id: user._id,
              email: user.email
            }
          },
          process.env.SECRET,
          { expiresIn: '1000hr' }
        )

        const userData = {
          id: user._id,
          email: user.email,
          name: user.name,
          presets: user.presets
        }

        res.status(200).json({
          status: 'success',
          message: 'Login successful',
          data: {
            user: userData,
            token
          }
        })
      } else {
        return res.json({ status: 'error', message: 'Incorrect password' })
      }
    } catch (err) {
      return res.status(500).json({
        err: 'Sorry, there is an issue with connecting to the database. We are working on fixing this.'
      })
    }
  }
}
