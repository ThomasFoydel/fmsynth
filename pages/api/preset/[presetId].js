import { getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]'
import connection from '../../../Mongo/connection'
import Preset from '../../../Mongo/models/Preset'
import User from '../../../Mongo/models/User'

export default async (req, res) => {
  const { user } = await getServerSession(req, res, authOptions)
  const { email } = user
  const { method, query } = req
  const { presetId } = query

  if (!email) {
    return res
      .status(401)
      .json({ status: 'error', message: 'Not authenticated' })
  }
  await connection()

  let foundUser
  try {
    foundUser = await User.findOne({ email })
  } catch (err) {
    return res.status(400).json({ status: 'error', message: 'User not found' })
  }

  if (method === 'DELETE') {
    try {
      const result = await Preset.deleteOne({ _id: presetId })
      console.log(result)

      return res.status(200).json({
        status: 'success',
        message: 'Preset deletion successful',
        presetId
      })
    } catch (err) {
      return res
        .status(400)
        .json({ status: 'error', message: 'Preset deletion failed' })
    }
  }

  return res
    .status(400)
    .json({ status: 'error', message: 'method not supported' })
}
