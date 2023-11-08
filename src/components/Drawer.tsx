import { View, TouchableOpacity, Image, Text } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { useNavigation } from "@react-navigation/core";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { ParamListBase } from "@react-navigation/routers";
import { StackNavigationProp } from "@react-navigation/stack";

export function Drawer(props: DrawerContentComponentProps) {
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

      <TouchableOpacity
        onPress={() => navigation.navigate("login")}
        activeOpacity={0.7}
      >
        <View className="flex-row py-4 px-2 mb-12 mx-2 bg-gray-200 rounded-md">
          <Feather name="log-out" size={18} color="#DB2B39" />
          <Text className="ml-2 font-semibold text-red-500">Sair</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
