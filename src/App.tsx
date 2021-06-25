import { BrowserRouter } from 'react-router-dom'
import { AuthContextProvider } from '@context/auth/AuthContextProvider'

import { Router } from './router'

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Router />
      </AuthContextProvider>
    </BrowserRouter>
  )
}

export default App
