import {
  DrawerNavigationProp,
  createDrawerNavigator,
} from '@react-navigation/drawer'
import Feather from '@expo/vector-icons/Feather'
import { HomeTabRoutes } from '@navigation/HomeTabs/HomeTabs'

import { Drawer as DrawerComponent } from '@components/Drawer'
import { Order } from '@screens/Order'
import { PaymentMethod } from '@screens/PaymentMethod'
import { Address } from '@screens/Address'
import { Settings } from '@screens/Settings'

import {
  ACTIVE_BACKGROUND_COLOR,
  ACTIVE_TINT_COLOR,
  INACTIVE_TINT_COLOR,
} from '@constants/color.constants'

export type DrawerRoutes = {
  home_3: undefined
  orders: undefined
  paymentMethods: undefined
  addresses: undefined
  settings: undefined
}

export type AppDrawerNavigatorProps = DrawerNavigationProp<DrawerRoutes>

export type Route = {
  name: keyof DrawerRoutes
  label: string
  icon: keyof typeof Feather.glyphMap
  component: React.FC
}

const routes: Route[] = [
  {
    name: 'home_3',
    label: 'Início',
    icon: 'home',
    component: HomeTabRoutes,
  },
  {
    name: 'orders',
    label: 'Pedidos',
    icon: 'clipboard',
    component: Order,
  },
  {
    name: 'paymentMethods',
    label: 'Formas de pagamento',
    icon: 'credit-card',
    component: PaymentMethod,
  },
  {
    name: 'addresses',
    label: 'Endereços',
    icon: 'map-pin',
    component: Address,
  },
  {
    name: 'settings',
    label: 'Configurações',
    icon: 'settings',
    component: Settings,
  },
]

const Drawer = createDrawerNavigator<DrawerRoutes>()

export function AppDrawerRoutes() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerComponent {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      {routes.map((route, index) => (
        <Drawer.Screen
          key={index}
          name={route.name}
          component={route.component}
          options={{
            drawerLabel: route.label,
            drawerIcon: ({ focused }) => (
              <Feather
                name={route.icon}
                style={{ marginRight: -20 }}
                size={18}
                color={focused ? ACTIVE_TINT_COLOR : INACTIVE_TINT_COLOR}
              />
            ),
            drawerActiveBackgroundColor: ACTIVE_BACKGROUND_COLOR,
            drawerActiveTintColor: ACTIVE_TINT_COLOR,
            drawerInactiveTintColor: INACTIVE_TINT_COLOR,
          }}
        />
      ))}
    </Drawer.Navigator>
  )
}
