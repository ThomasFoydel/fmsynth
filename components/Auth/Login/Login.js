import cn from 'classnames'
import { toast } from 'react-toastify'
import React, { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useSession } from 'next-auth/react'
import styles from '../Auth.module.scss'

const Login = ({ setCurrentShow }) => {
  const [formValues, setFormValues] = useState({})
  const { data } = useSession()

  const handleChange = (e) => {
    const { value, id } = e.target
    setFormValues({ ...formValues, [id]: value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    const { email, password } = formValues
    if (email && password) {
      const status = await signIn('credentials', {
        redirect: false,
        email,
        password,
        callbackUrl: '/'
      })
      console.log({ status, data })
      toast.success('Login successful')
    } else toast.error('All fields required')
  }
  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <div className={styles.title}>sign in</div>
      <div className={styles.defaultUserLogin}>
        for testing:
        <br />
        email: test@gmail.com
        <br />
        password: password
      </div>
      <div>
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
          placeholder='password'
          onChange={handleChange}
          id='password'
        />
      </div>
      <div className={cn(styles.btnsContainer, 'center')}>
        <button
          type='button'
          className={styles.switchBtn}
          onClick={() => setCurrentShow('register')}>
          sign up
        </button>
        <button className={styles.submitBtn} type='submit'>
          sign in
        </button>
      </div>
    </form>
  )
}

export default Login
