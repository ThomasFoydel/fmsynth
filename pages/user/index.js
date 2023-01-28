import User from '../models/User'

router.get('/user/', auth, async (req, res) => {
  let { tokenUser } = req
  if (tokenUser) {
    try {
      const user = User.findOne({ _id: tokenUser.userId })
      const { name, email, _id, presets } = user
      return res.status(200).json({ name, email, id: _id, presets })
    } catch (err) {
      res.status(400).json({ status: 'error', message: 'no user found' })
    }
  } else {
    return res.status(400).json({ status: 'error', message: 'no token' })
  }
})
