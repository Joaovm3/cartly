import { createContext, useState } from 'react'

interface AuthContextProviderProps {
  children: React.ReactNode
}

type SignInProps = {
  email: string
  password: string
}

type UserProps = {
  username: string
  uri: string
} | null

type AuthContext = {
  user: UserProps
  signIn: (payload: SignInProps) => boolean
  logout: () => void
}

const USER = {
  email: 'teste@gmail.com',
  username: 'Jhon Doe',
  password: '123456',
  uri: 'https://github.com/joaovm3.png',
}

export const AuthContext = createContext({} as AuthContext)

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const userData: UserProps = {
    username: USER.username,
    uri: USER.uri,
  }

  const [user, setUser] = useState<UserProps>(null)

  function signIn(payload: SignInProps) {
    if (payload.email === USER.email && payload.password === USER.password) {
      setUser(userData)
      return true
    } else {
      return false
    }
  }

  function logout() {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, signIn, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
