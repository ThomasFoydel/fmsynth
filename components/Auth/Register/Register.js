import Axios from 'axios'
import cn from 'classnames'
import { toast } from 'react-toastify'
import React, { useState } from 'react'
import styles from '../Auth.module.scss'

const inputs = [
  { name: 'name', label: 'name' },
  { name: 'email', label: 'email' },
  { name: 'password', label: 'password' },
  { name: 'confirmPassword', label: 'confirm password' }
]

const Register = ({ setCurrentShow }) => {
  const [formValues, setFormValues] = useState({})

  const handleChange = (e) => {
    let { value, id } = e.target
    setFormValues({ ...formValues, [id]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    let { email, name, password, confirmPassword } = formValues
    if (!email || !name || !password || !confirmPassword) {
      return toast.error('All inputs required!')
    }
    Axios.post('/api/auth/register', formValues)
      .then((result) => {
        if (result.data.status === 'error') {
          return toast.error(result.data.message)
        }
        setCurrentShow('login')
        toast.success(result.data.message)
      })
      .catch((err) =>
        toast.error(`Registration error: ${err?.response?.data?.message}`)
      )
  }

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <div className={styles.title}>register</div>
      <div>
        {inputs.map(({ name, label }) => (
          <input
            key={name}
            className='center'
            type={label.includes('password') ? 'password' : 'text'}
            onChange={handleChange}
            placeholder={label}
            id={name}
          />
        ))}
      </div>

      <div className={cn(styles.btnsContainer, 'center')}>
        <button
          type='button'
          className={styles.switchBtn}
          onClick={() => setCurrentShow('login')}>
          sign in
        </button>
        <button className={styles.submitBtn} type='submit'>
          submit
        </button>
      </div>
    </form>
  )
}

export default Register
