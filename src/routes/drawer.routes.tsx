import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItemList, createDrawerNavigator } from "@react-navigation/drawer";
import TabRoutes from "./tab.routes";
import Feather from "@expo/vector-icons/Feather";
import { Header } from "@components/Header";
import { Image, Text, View } from "react-native";

import { Order } from "@screens/Drawer/Order";
import { PaymentMethod } from "@screens/Drawer/PaymentMethod";
import { Address } from "@screens/Drawer/Address";
import { Settings } from "@screens/Drawer/Settings";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ACTIVE_BACKGROUND_COLOR, ACTIVE_TINT_COLOR, INACTIVE_TINT_COLOR } from "@constants/color.constants";

const Drawer = createDrawerNavigator();

export type Route = {
  name: string; // deve ser único para fazer chamadas de navegação - ex: navigation.navigate('PaymentMethods')
  label: string;
  icon: any;
  component: React.FC;
}

const routes: Route[] = [
  { name: "inicio", label: "Início", icon: "home", component: TabRoutes, },
  { name: "pedidos", label: "Pedidos", icon: "clipboard", component: Order, },
  { name: "formas-pagamento", label: "Formas de pagamento", icon: "credit-card", component: PaymentMethod, },
  { name: "enderecos", label: "Endereços", icon: "map-pin", component: Address, },
  { name: "configuracoes", label: "Configurações", icon: "settings", component: Settings, },
];

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  return (
    <View className="flex-1"> 
      <View className="flex-row items-center space-x-3 mt-10 ml-3">
        <Image
          source={{ uri: "https://github.com/joaovm3.png" }}
          width={64}
          height={64}
          className="rounded-full"
        />
        <Text className="font-semibold"> Olá, John </Text>
      </View>

      <DrawerContentScrollView {...props}>
        <View>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      
      <TouchableOpacity onPress={() => navigation.navigate("Login")} activeOpacity={0.7}>
        <View className="flex-row py-4 px-2 mb-12 mx-2 bg-gray-200 rounded-md">
          <Feather name="log-out" size={18} color="#DB2B39"/>
          <Text className="ml-2 font-semibold text-red-500">
            Sair
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default function DrawerRoutes() {
  return (
    <Drawer.Navigator 
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{ 
        headerTransparent: true,
        header: ({ navigation }) => <Header onPress={() => {navigation.openDrawer()}}/>,
      }}
    >
      {routes.map((route, index) => (
        <Drawer.Screen 
          key={index} 
          name={route.name} 
          component={route.component} 
          options={{
            drawerLabel: route.label,
            drawerIcon: ({focused, size}) => (
              <Feather name={route.icon} style={{marginRight: -20}} size={18} color={focused ? ACTIVE_TINT_COLOR : INACTIVE_TINT_COLOR} />
            ),
            drawerActiveBackgroundColor: ACTIVE_BACKGROUND_COLOR,
            drawerActiveTintColor: ACTIVE_TINT_COLOR,
            drawerInactiveTintColor: INACTIVE_TINT_COLOR,
         }}
        />
      ))}
    </Drawer.Navigator>
  );
}