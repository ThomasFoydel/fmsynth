import cn from 'classnames'
import { toast } from 'react-toastify'
import React, { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useSession } from 'next-auth/react'
import styles from './Login.module.scss'

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
    <form onSubmit={handleSubmit} className={styles.login}>
      <div className={styles.title}>sign in</div>
      <div className={styles.defaultUserLogin}>
        for testing:
        <br />
        email: test@gmail.com
        <br />
        password: password
      </div>
      <input
        className='center'
        type='email'
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        placeholder='email'
        id='email'
      />
      <input
        className='center'
        type='password'
        onKeyDown={handleKeyDown}
        placeholder='password'
        onChange={handleChange}
        id='password'
      />
      <div className={cn(styles.btnsContainer, 'center')}>
        <button className={styles.signinBtn} type='submit'>
          sign in
        </button>
        <button
          type='button'
          className={styles.signupBtn}
          onClick={() => setCurrentShow('register')}>
          sign up
        </button>
      </div>
    </form>
  )
}

export default Login
