import { createContext, useState } from 'react'

interface AuthContextProviderProps {
  children: React.ReactNode
}

type SignInProps = {
  email: string
  password: string
}

type AuthContext = {
  user: string | null
  signIn: (payload: SignInProps) => boolean
  logout: () => void
}

const USER = {
  email: 'gabriel.vieira@sou.unijui.edu.br',
  username: 'Gabriel',
  password: '123456',
}

export const AuthContext = createContext({} as AuthContext)

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<string | null>(null)

  function signIn(payload: SignInProps) {
    if (payload.email === USER.email && payload.password === USER.password) {
      setUser(USER.username)
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
