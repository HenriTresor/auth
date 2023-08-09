'use client'

import React, { useState } from 'react'
import Link from 'next/link'

type Props = {}


function Signup({ }: Props) {

    const [inputValues, setInputValues] = useState({
        email: '',
        username: '',
        password: ""
    })

    const handleChange = (e: any) => {

        setInputValues(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async () => {

        try {
            const res = await fetch('http://localhost:4000/api/v1/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(inputValues)
            })

            const data = await res.json()

            if (data.status) {
                
            }
        } catch (error: any) {
            console.log('error creating account', error.message)
            alert('an error occurred')
        }
    }
    return (
        <div className='w-full min-h-screen flex items-center justify-center'>
            <div className='shadow-md p-2 border'>
                <h1 className='text-[2rem] text-center'>Signup</h1>

                <div className='input-container'>
                    <label htmlFor="email">Email address: </label>
                    <input onChange={(e) => handleChange(e)} type="email" name='email' placeholder='email' id='email' />
                </div>
                <div className='input-container'>
                    <label htmlFor="username">Username: </label>
                    <input onChange={(e) => handleChange(e)} type="text" name='username' placeholder='username' id='username' />
                </div>
                <div className='input-container'>
                    <label htmlFor="password">Create Password: </label>
                    <input onChange={(e) => handleChange(e)} type="password" name='password' placeholder='password' id='password' />
                </div>
                <button
                    onClick={handleSubmit}
                    className='p-2 border bg-blue-400 rounded-sm text-white mt-5'>
                    create account
                </button>
                <p>Already have an account? <a><Link href={'/login'}>Login</Link></a></p>
            </div>


        </div>
    )
}

export default Signup