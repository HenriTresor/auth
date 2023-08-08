import React from 'react'
import Link from 'next/link'

type Props = {}

function Signup({}: Props) {
  return (
      <div className='w-full min-h-screen flex items-center justify-center'>
          <div className='shadow-md p-2 border'>
              <h1 className='text-[2rem] text-center'>Signup</h1>

              <div className='input-container'>
                  <label htmlFor="email">Email address: </label>
                  <input type="email" name='email' placeholder='email' id='email' />
              </div>
              <div className='input-container'>
                  <label htmlFor="username">Username: </label>
                  <input type="text" name='username' placeholder='username' id='username' />
              </div>
              <div className='input-container'>
                  <label htmlFor="password">Create Password: </label>
                  <input type="password" name='password' placeholder='password' id='password' />
              </div>
              <button className='p-2 border bg-blue-400 rounded-sm text-white mt-5'>
                  Sign in
              </button>
              <p>Already have an account? <a><Link href={'/login'}>Login</Link></a></p>
          </div>

        
    </div>
  )
}

export default Signup