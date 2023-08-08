import React from 'react'
import Link from 'next/link'

type Props = {}

function Login({}: Props) {
  return (
      <div className='w-full min-h-screen flex items-center justify-center'>
          <div className='shadow-md p-2 border'>
              <h1 className='text-[2rem] text-center'>Login</h1>

              <div className='input-container'>
                  <label htmlFor="email">Email address: </label>
                  <input type="email" name='email' placeholder='email' id='email' />
              </div>
              <div className='input-container'>
                  <label htmlFor="password">Password: </label>
                  <input type="password" name='password' placeholder='enter password' id='password' />
              </div>
              <Link href={'forgot-password'}>Forgot password?</Link>
              <button className='p-2 border bg-blue-400 rounded-sm text-white mt-5'>
                  Sign in
              </button>
              <p>Don&apos;t have an account yet? <Link href={'/signup'}>Create One!</Link></p>

          </div>

        
    </div>
  )
}

export default Login