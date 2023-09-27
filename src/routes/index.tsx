import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Categories } from "@screens/Categories";
import { History } from "@screens/History";

import { Home } from "@screens/Home";
import { Search } from "@screens/Search";

const Tab = createBottomTabNavigator();

export function Routes() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Categories" component={Categories} />
      <Tab.Screen name="History" component={History} />
    </Tab.Navigator>
  );
}
