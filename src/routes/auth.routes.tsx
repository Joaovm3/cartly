import { createStackNavigator } from '@react-navigation/stack'

import { Login } from '@screens/Login'
import { CreateAccount } from '@screens/Login/CreateAccount'
import ForgotPassword from '@screens/Login/ForgotPassword'
import { SignUp } from '@screens/SignUp'

const Stack = createStackNavigator()

export function AuthRoutes() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="create-account" component={CreateAccount} />
      <Stack.Screen name="forgot-password" component={ForgotPassword} />
      <Stack.Screen name="signup" component={SignUp} />
    </Stack.Navigator>
  )
}
