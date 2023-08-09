'use client'
import React, { useContext, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { AuthData } from '@/context/AuthContext'

type Props = {}

function Login({ }: Props) {
    const router = useRouter()
    const { setUser, setIsLoggedIn } = useContext(AuthData)
    const [inputValues, setInputValues] = useState({
        email: '',
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
            const res = await fetch('https://auth-server-dui2.onrender.com/api/v1/auth/login', {
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
                <h1 className='text-[2rem] text-center'>Login</h1>

                <div className='input-container'>
                    <label htmlFor="email">Email address: </label>
                    <input onChange={(e) => handleChange(e)} type="email" name='email' placeholder='email' id='email' />
                </div>
                <div className='input-container'>
                    <label htmlFor="password">Password: </label>
                    <input onChange={(e) => handleChange(e)} type="password" name='password' placeholder='enter password' id='password' />
                </div>
                <Link href={'forgot-password'}>Forgot password?</Link>
                <button className='p-2 border bg-blue-400 rounded-sm text-white mt-5' onClick={handleSubmit}>
                    Sign in
                </button>
                <p>Don&apos;t have an account yet? <Link href={'/signup'}>Create One!</Link></p>

            </div>


        </div>
    )
}

export default Login