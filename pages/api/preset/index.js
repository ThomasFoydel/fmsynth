import { getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]'
import connection from '../../../Mongo/connection'
import User from '../../../Mongo/models/User'
import Preset from '../../../Mongo/models/Preset'

export default async (req, res) => {
  const { user } = await getServerSession(req, res, authOptions)
  const { email } = user
  const { method, body } = req

  if (!email) {
    return res
      .status(401)
      .json({ status: 'error', message: 'Not authenticated' })
  }
  await connection()

  if (method === 'GET') {
    try {
      const user = await User.findOne({ email })
      const presets = await Preset.find({ author: user._id })
      return res.status(200).json({
        status: 'success',
        message: 'Preset fetch successful',
        presets
      })
    } catch (err) {
      return res
        .status(400)
        .json({ status: 'error', message: 'User not found' })
    }
  }

  if (method === 'POST') {
    console.log('POST METHOD HIT!!')
    try {
      const user = await User.findOne({ email })
      const { name, state } = body
      const newPreset = new Preset({ name, state, author: user.id })
      const result = await newPreset.save()
      console.log({ result })
      return res.status(200).json({
        status: 'success',
        message: 'Preset fetch successful',
        preset: result
      })
    } catch (err) {
      console.log('error: ', err)
      return res
        .status(400)
        .json({ status: 'error', message: 'User not found' })
    }
  }

  return res
    .status(400)
    .json({ status: 'error', message: 'method not supported' })
}
