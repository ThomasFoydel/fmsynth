import { Schema, model, models } from 'mongoose'

const userSchema = Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      validate: {
        validator: (str) => {
          const re =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return re.test(String(str).toLowerCase())
        }
      }
    },
    password: {
      type: String,
      required: true,
      select: false,
      validate: {
        validator: (str) => str.length >= 8
      }
    }
  },
  { timestamps: true }
)

const User = models.User || model('User', userSchema)
export default User
