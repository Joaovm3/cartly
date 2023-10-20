import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack'

import { AppDrawerRoutes } from '@routes/app.drawer.routes'
import { Notification } from '@screens/Notification'
import { Checkout } from '@screens/Checkout'
import { Cart } from '@screens/Cart'
import { PaymentConfirmation } from '@screens/PaymentConfirmation'
import { GroceryMode } from '@screens/GroceryMode'

export type StackRoutes = {
  home_2: undefined
  cart: undefined
  checkout: undefined
  notifications: undefined
  payment_confirmation: undefined
  grocery_mode: undefined
}

export type AppStackNavigatorProps = StackNavigationProp<StackRoutes>

const Stack = createStackNavigator<StackRoutes>()

export function AppStackRoutes() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: 'white',
        },
      }}
    >
      <Stack.Screen name="home_2" component={AppDrawerRoutes} />
      <Stack.Group>
        <Stack.Screen name="cart" component={Cart} />
        <Stack.Screen name="checkout" component={Checkout} />
        <Stack.Screen
          name="payment_confirmation"
          component={PaymentConfirmation}
        />
      </Stack.Group>
      <Stack.Screen name="grocery_mode" component={GroceryMode} />
      <Stack.Screen name="notifications" component={Notification} />
    </Stack.Navigator>
  )
}
