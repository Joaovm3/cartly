import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home } from "@screens/Home";

const Tab = createBottomTabNavigator();

export function Routes() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
    </Tab.Navigator>
  );
}
