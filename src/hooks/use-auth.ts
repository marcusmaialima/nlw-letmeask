import { useContext } from 'react';
import { AuthContext } from '../auth/AuthContextProvider';

export function useAuth() {
  const contextAuth = useContext(AuthContext);
  return contextAuth
}