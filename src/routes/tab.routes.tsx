import { ACTIVE_BACKGROUND_COLOR, ACTIVE_TINT_COLOR } from "@constants/color.constants";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Categories } from "@screens/Categories";
import { History } from "@screens/History";
import { Home } from "@screens/Home";
import { Search } from "@screens/Search";

const Tab = createBottomTabNavigator();

export default function TabRoutes() {
  return (
    <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarActiveBackgroundColor: ACTIVE_BACKGROUND_COLOR,
      tabBarActiveTintColor: ACTIVE_TINT_COLOR,
      tabBarInactiveBackgroundColor: ACTIVE_TINT_COLOR,
    }}
  > 
    <Tab.Screen name="Home" component={Home} />
    <Tab.Screen name="Search" component={Search} />
    <Tab.Screen name="Categories" component={Categories} />
    <Tab.Screen name="History" component={History} />
  </Tab.Navigator>
  )
}
