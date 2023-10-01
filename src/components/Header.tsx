import { View, Image, TouchableOpacity } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { useDrawerNavigation } from "@hooks/useDrawerNavigation";
import { AppStackNavigatorProps } from "@routes/app.stack.routes";
import { useNavigation } from "@react-navigation/native";

export function Header() {
  const navigation = useNavigation<AppStackNavigatorProps>();
  const { openDrawer } = useDrawerNavigation();

  function handleOpenDrawer() {
    openDrawer();
  }

  function handleOpenCart() {
    navigation.navigate("cart");
  }

  function handleOpenNotifications() {
    navigation.navigate("notifications");
  }

  return (
    <View className="flex-row justify-between items-center px-6 ">
      <TouchableOpacity onPress={handleOpenDrawer}>
        <Image
          source={{ uri: "https://github.com/gabrielvbauer.png" }}
          width={48}
          height={48}
          className="rounded-full"
        />
      </TouchableOpacity>
      <View className="flex-row gap-3">
        <TouchableOpacity
          onPress={handleOpenCart}
          className="w-12 h-12 bg-gray-200 items-center justify-center rounded-lg"
        >
          <Feather name="shopping-cart" size={18} color="#737380" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleOpenNotifications}
          className="w-12 h-12 bg-gray-200 items-center justify-center rounded-lg"
        >
          <Feather name="bell" size={18} color="#737380" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
