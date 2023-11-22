import { CartContextProvider } from '@contexts/CartContext'
import { AppStackRoutes } from './app.stack.routes'
import { AuthRoutes } from './auth.routes'
import { useAuth } from '@hooks/useAuth'

export function Routes() {
  const { user } = useAuth()

  return user ? (
    <CartContextProvider>
      <AppStackRoutes />
    </CartContextProvider>
  ) : (
    <AuthRoutes />
  )
}
