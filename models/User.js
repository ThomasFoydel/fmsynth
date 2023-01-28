const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    presets: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Preset',
      default: []
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('User', userSchema)
