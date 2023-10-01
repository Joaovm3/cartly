import {
  StackNavigationProp,
  createStackNavigator,
} from "@react-navigation/stack";

import { AppDrawerRoutes } from "@routes/app.drawer.routes";
import { Cart } from "@screens/Cart";
import { Notification } from "@screens/Notification";

export type StackRoutes = {
  home: undefined;
  cart: undefined;
  notifications: undefined;
};

export type AppStackNavigatorProps = StackNavigationProp<StackRoutes>;

const Stack = createStackNavigator<StackRoutes>();

export function AppStackRoutes() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: "white",
        },
      }}
    >
      <Stack.Screen name="home" component={AppDrawerRoutes} />
      <Stack.Screen name="cart" component={Cart} />
      <Stack.Screen name="notifications" component={Notification} />
    </Stack.Navigator>
  );
}
