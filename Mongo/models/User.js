import { Schema, model, models } from 'mongoose'

const userSchema = Schema(
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
      required: true,
      select: false
    }
  },
  { timestamps: true }
)

const User = models.User || model('User', userSchema)
export default User
