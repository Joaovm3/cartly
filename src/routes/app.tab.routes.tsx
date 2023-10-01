import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";

import { Categories } from "@screens/Categories";
import { History } from "@screens/History";
import { Home } from "@screens/Home";
import { Search } from "@screens/Search";

import {
  ACTIVE_BACKGROUND_COLOR,
  ACTIVE_TINT_COLOR,
} from "@constants/color.constants";

export type TabRoutes = {
  home: undefined;
  search: undefined;
  categories: undefined;
  history: undefined;
};

export type AppTabNavigatorProps = BottomTabNavigationProp<TabRoutes>;

const Tab = createBottomTabNavigator<TabRoutes>();

export function AppTabRoutes() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveBackgroundColor: ACTIVE_BACKGROUND_COLOR,
        tabBarActiveTintColor: ACTIVE_TINT_COLOR,
        tabBarInactiveBackgroundColor: ACTIVE_TINT_COLOR,
      }}
    >
      <Tab.Screen name="home" component={Home} />
      <Tab.Screen name="search" component={Search} />
      <Tab.Screen name="categories" component={Categories} />
      <Tab.Screen name="history" component={History} />
    </Tab.Navigator>
  );
}
