'use client'

import React, { useState, useContext, useEffect } from 'react'
import Link from 'next/link'
import { AuthData } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'

type Props = {}


function Signup({ }: Props) {

  
    const router = useRouter()
    useEffect(() => {
        localStorage.getItem('access_token') && router.push('/')
    }, [router])
    const { setUser, setIsLoggedIn } = useContext(AuthData)
    const [inputValues, setInputValues] = useState({
        email: '',
        username: '',
        password: ""
    })
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setIsError] = useState({
        status: false,
        message: ''
    })

    const handleChange = (e: any) => {

        setInputValues(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async () => {
        setIsLoading(true)
        try {
            const res = await fetch('https://auth-server-dui2.onrender.com/api/v1/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(inputValues)
            })

            const data = await res.json()

            setIsLoading(false)
            if (data.status) {
                setUser(data.user)
                setIsLoggedIn(true)
                localStorage.setItem('access_token', data.access_token)
                return router.push('/')
            }
            setIsError({
                status: true,
                message: data.message
            })

        } catch (error: any) {
            console.log('error creating account', error.message)
            setIsError({
                status: true,
                message: 'an error occured'
            })
        }
    }
    return (
        <div className='w-full min-h-screen flex items-center justify-center'>
            <div className='shadow-md p-2 border'>
                {error.status && (
                    <p className='text-center p-2 bg-red-300 text-white'>*{error.message}</p>
                )}
                <h1 className='text-[2rem] text-center'>Signup</h1>

                <div className='input-container'>
                    <label htmlFor="email">Email address: </label>
                    <input onChange={(e) => handleChange(e)} type="email" name='email' placeholder='email' id='email' />
                </div>
                <div className='input-container'>
                    <label htmlFor="fullName">full Name: </label>
                    <input onChange={(e) => handleChange(e)} type="text" name='fullName' placeholder='fullName' id='fullName' />
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
                    disabled={isLoading}
                    onClick={handleSubmit}
                    className='p-2 border bg-blue-400 rounded-sm disabled:bg-gray-100 text-white mt-5'>
                    {
                        isLoading ? 'loading' : 'create account'
                    }
                </button>
                <p>Already have an account? <a><Link href={'/login'}>Login</Link></a></p>
            </div>


        </div>
    )
}

export default Signup