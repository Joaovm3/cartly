import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack'
import { Cart } from '@screens/Cart'
import { Checkout } from '@screens/Checkout'

export type StackRoutes = {
  cart: undefined
  checkout: undefined
}

export type AppCartStackNavigatorProps = StackNavigationProp<StackRoutes>

const Stack = createStackNavigator<StackRoutes>()

export function CartStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitle: '',
        cardStyle: {
          backgroundColor: 'white',
        },
      }}
    >
      <Stack.Screen name="cart" component={Cart} />
      <Stack.Screen name="checkout" component={Checkout} />
    </Stack.Navigator>
  )
}
