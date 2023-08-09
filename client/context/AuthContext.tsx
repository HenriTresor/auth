import React, {useState} from 'react'


type Props = {
    children: React.ReactNode
}

export const AuthData = React.createContext<null | any>(null)

function AuthContext({ children }: Props) {

    const [user, setUser] = useState({})
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
    const value = {
        user,
        setUser,
        isLoggedIn,
        setIsLoggedIn
    }
    return (
        <AuthData.Provider value={value}>{children}</AuthData.Provider>
    )
}

export default AuthContext