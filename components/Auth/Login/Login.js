import cn from 'classnames'
import { toast } from 'react-toastify'
import React, { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useSession } from 'next-auth/react'
import styles from './Login.module.scss'

const Login = ({ setCurrentShow }) => {
  const [formValues, setFormValues] = useState({})
  const { data } = useSession()

  const handleKeyDown = (e) => {
    if (e.keyCode === 'Enter') {
      handleSubmit()
    }
  }

  const handleChange = (e) => {
    const { value, id } = e.target
    setFormValues({ ...formValues, [id]: value })
  }
  const handleSubmit = async () => {
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
    <div className={styles.login}>
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
        dontbubble='true'
      />
      <input
        className='center'
        type='password'
        onKeyDown={handleKeyDown}
        placeholder='password'
        onChange={handleChange}
        id='password'
        dontbubble='true'
      />
      <div className={cn(styles.btnsContainer, 'center')}>
        <button className={styles.signinBtn} onClick={handleSubmit}>
          sign in
        </button>
        <button
          className={styles.signupBtn}
          onClick={() => setCurrentShow('register')}>
          sign up
        </button>
      </div>
    </div>
  )
}

export default Login
