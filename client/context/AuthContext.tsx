'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'


type Props = {
    children: React.ReactNode
}

export const AuthData = React.createContext<null | any>(null)

function AuthContext({ children }: Props) {

    const router= useRouter()
    const [user, setUser] = useState({})
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
    const value = {
        user,
        setUser,
        isLoggedIn,
        setIsLoggedIn
    }
    useEffect(() => {
        localStorage.getItem('access_token') ? router.push('/') : router.push('/login')
    })
    return (
        <AuthData.Provider value={value}>{children}</AuthData.Provider>
    )
}

export default AuthContext