import { CartContextProvider } from '@contexts/CartContext'
import { AppStackRoutes } from './app.stack.routes'
import { AuthRoutes } from './auth.routes'

const isUserAuthenticated = true

export function Routes() {
  return isUserAuthenticated ? (
    <CartContextProvider>
      <AppStackRoutes />
    </CartContextProvider>
  ) : (
    <AuthRoutes />
  )
}
