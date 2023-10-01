import { createStackNavigator } from "@react-navigation/stack";
import { Login } from "@screens/Login";
import { SignUp } from "@screens/SignUp";

const Stack = createStackNavigator();

export function AuthRoutes() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="signup" component={SignUp} />
    </Stack.Navigator>
  );
}
