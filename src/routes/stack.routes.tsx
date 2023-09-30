import { createStackNavigator } from "@react-navigation/stack";
import { NotificationStackScreen } from "../navigation/Notification/NotificationStack";
import { CartStackScreen } from "../navigation/Cart/CartStack";
import { Login } from "@screens/Login";
import DrawerRoutes from "./drawer.routes";

const Stack = createStackNavigator();

export default function StackRoutes() {
  return (
    <Stack.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: {
        backgroundColor: "white",
      }
    }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Home" component={DrawerRoutes} />
      <Stack.Screen name="Cart" component={CartStackScreen} />
      <Stack.Screen name="Notifications" component={NotificationStackScreen} />
    </Stack.Navigator>
  );
}
