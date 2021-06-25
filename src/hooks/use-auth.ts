import { useContext } from 'react'
import { AuthContext } from '@context/auth/AuthContextProvider'

export function useAuth() {
  const contextAuth = useContext(AuthContext)
  return contextAuth
}
