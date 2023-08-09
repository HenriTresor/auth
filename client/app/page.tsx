'use client'
import { useContext, useState, useEffect, useCallback } from 'react'
import { AuthData } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  useEffect(() => {
    !localStorage.getItem('access_token') && router.push('/login')
  },[])
  const { user, setUser, setIsLoggedIn, isLoggedIn } = useContext(AuthData)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setIsError] = useState({
    status: false,
    message: ''
  })


  const getUser = async () => {
    const res = await fetch('https://auth-server-dui2.onrender.com/api/v1/auth/profile', {
      method: 'GET',
      headers: {
        'authorization': `Beater ${localStorage.getItem('access_token')}`
      }

    })

    const data = await res.json()
    setIsLoading(false)
    if (data.status) {
      setUser(data.user)
      setIsLoggedIn(true)
      return
    }

    setIsError({
      status: true,
      message: data.message
    })
  }

  useEffect(() => {
    localStorage.getItem('access_token') && getUser()
  }, [])

  const logout = () => {
    router.push('/login')
    setIsLoggedIn(false)
    setUser(null)
    localStorage.removeItem('access_token')
  }

  if (isLoading) {
    return (
      <div className='w-full min-h-screen flex items-center justify-center'>
        <div className='rounded-full w-[50px] h-[50px] border-2 border-t-2 border-t-black animate-spin'>
          
          </div>
      </div>
    )
  }
  return (
    <div className='w-full min-h-screen flex justify-center items-center'>
      <div className='shadow-md border rounded-md p-2 flex flex-col gap-2 items-center'>
      
        {
          !user?.verified && (
            <p className='text-center p-2 bg-red-500 text-white'>Account is not verified. <a href="">Verify</a></p>
          )
        }
        {error.status && (
          <p className='text-center p-2 bg-red-300 text-white'>*{error.message}</p>
        )}
        <div className='w-[100px] h-[100px] bg-gray-100 rounded-full'>

        </div>

        <h1 className='text-[2rem] capitalize '>{user?.fullName}</h1>
        <p className='mt-0'>{user?.email}</p>
        <button className=' border-2 p-2 border-red-500 rounded-md mt-4'
          onClick={() => logout()}
        >Logout</button>
       </div>
  </div>
  )
}
