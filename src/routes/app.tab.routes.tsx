import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";

import Feather from "@expo/vector-icons/Feather";

import { Categories } from "@screens/Categories";
import { History } from "@screens/History";
import { Home } from "@screens/Home";
import { Search } from "@screens/Search";

import {
  ACTIVE_BACKGROUND_COLOR,
  ACTIVE_TINT_COLOR,
} from "@constants/color.constants";

const ICON_SIZE = 24;

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
        tabBarStyle: {
          position: "absolute",
          height: 52,
          backgroundColor: "#f5f5f5",
          borderTopWidth: 0,

          bottom: 14,
          left: 14,
          right: 14,
          elevation: 0,
          borderRadius: 8,
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#4CB944",
      }}
    >
      <Tab.Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="home" size={ICON_SIZE} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="search"
        component={Search}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="search" size={ICON_SIZE} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="categories"
        component={Categories}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="menu" size={ICON_SIZE} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="history"
        component={History}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="clock" size={ICON_SIZE} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
