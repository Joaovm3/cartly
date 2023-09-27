import { View, Image, TouchableHighlight, Alert } from "react-native";
import Feather from "@expo/vector-icons/Feather";

export function Header() {
  return (
    <View className="flex-row justify-between items-center px-6">
      <Image
        source={{ uri: "https://github.com/gabrielvbauer.png" }}
        width={48}
        height={48}
        className="rounded-full"
      />
      <View className="flex-row gap-3">
        <TouchableHighlight className="w-11 h-11 bg-gray-200 items-center justify-center rounded-lg">
          <Feather name="shopping-cart" size={18} color="#737380" />
        </TouchableHighlight>
        <TouchableHighlight className="w-11 h-11 bg-gray-200 items-center justify-center rounded-lg">
          <Feather name="bell" size={18} color="#737380" />
        </TouchableHighlight>
      </View>
    </View>
  );
}
