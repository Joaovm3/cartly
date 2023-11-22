import { AuthContext } from '@contexts/AuthContext'
import { useContext } from 'react'

export function useAuth() {
  const auth = useContext(AuthContext)

  return auth
}
