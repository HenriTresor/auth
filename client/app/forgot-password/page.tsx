import React from 'react'

type Props = {}

function ForgotPassword({}: Props) {
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