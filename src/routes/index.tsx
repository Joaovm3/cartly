import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from "@react-navigation/bottom-tabs";
import { Categories } from "@screens/Categories";
import { History } from "@screens/History";

import { Home } from "@screens/Home";
import { Search } from "@screens/Search";

type Routes = {
  home: undefined;
  search: undefined;
  categories: undefined;
  history: undefined;
};

export type NavigatorRouteProps = BottomTabNavigationProp<Routes>;

const Tab = createBottomTabNavigator<Routes>();

export function Routes() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="home" component={Home} />
      <Tab.Screen name="search" component={Search} />
      <Tab.Screen name="categories" component={Categories} />
      <Tab.Screen name="history" component={History} />
    </Tab.Navigator>
  );
}
