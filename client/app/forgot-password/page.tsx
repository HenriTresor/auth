'use client'
import React, { useState } from 'react'


type Props = {}

function ForgotPassword({ }: Props) {

  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const requestToken = async () => {
    try {

      const res = await fetch('https://auth-server-dui2.onrender.com/api/v1/requestToken', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
        ,
        body: JSON.stringify({ email, token_type:'password_reset' })
      })

      const data = await res.json()

      if (data.status) {
        alert(data.message)
        return 
      }
    } catch (error: any) {

      console.log('error rquesting password reset link', error.message)
    }
  }
  return (
    <div className='w-full min-h-screen flex items-center justify-center'>
      <div className='shadow-md p-2 border'>
        <h1 className='text-[2rem] text-center mb-5'>Reset Password</h1>
        <div className='input-container text-center'>
          <label htmlFor="email">Input Your email address</label>
          <input type="email" name='email' placeholder='email' id='email' />
          <p>You will receive a reset link on your email.</p>
        </div>
        <button className='p-2 border bg-blue-400 rounded-sm text-white mt-5'>
          Reset
        </button>
      </div>
    </div>
  )
}

export default ForgotPassword