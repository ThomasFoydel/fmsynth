import Axios from 'axios'
import cn from 'classnames'
import { toast } from 'react-toastify'
import React, { useState } from 'react'
import styles from './Register.module.scss'

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
    Axios.post('/auth/register', formValues)
      .then((result) => {
        if (result.data.status === 'error') {
          return toast.error(result.data.message)
        }
        setCurrentShow('login')
        toast.success(result.data.message)
      })
      .catch((err) => toast.error('Registration error: ', err))
  }

  return (
    <form onSubmit={handleSubmit} className={styles.register}>
      <div className={styles.title}>register</div>
      <input
        className='center'
        type='text'
        onChange={handleChange}
        placeholder='name'
        id='name'
      />
      <input
        className='center'
        type='email'
        onChange={handleChange}
        placeholder='email'
        id='email'
      />
      <input
        className='center'
        type='password'
        onChange={handleChange}
        placeholder='password'
        id='password'
      />
      <input
        className='center'
        type='password'
        onChange={handleChange}
        placeholder='confirm password'
        id='confirmPassword'
      />
      <button className={cn('center', styles.registerBtn)} type='submit'>
        submit
      </button>
      <button
        type='button'
        className={cn('center', styles.signinBtn)}
        onClick={() => setCurrentShow('login')}>
        i already have an account
      </button>
    </form>
  )
}

export default Register
