import { View, Image, TouchableOpacity, Alert } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from "@react-navigation/stack";

type HeaderProps = {
  onPress?: () => void;
};

export function Header({ onPress }: HeaderProps) {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  return (
    <View className="flex-row justify-between items-center px-6 py-10">
      <TouchableOpacity onPress={onPress}>
        <Image
          source={{ uri: "https://github.com/gabrielvbauer.png" }}
          width={48}
          height={48}
          className="rounded-full"
        />
      </TouchableOpacity>
      <View className="flex-row gap-3">
        <TouchableOpacity onPress={() => navigation.navigate("Cart")} className="w-12 h-12 bg-gray-200 items-center justify-center rounded-lg">
          <Feather name="shopping-cart" size={18} color="#737380" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Notifications")} className="w-12 h-12 bg-gray-200 items-center justify-center rounded-lg">
          <Feather name="bell" size={18} color="#737380" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
