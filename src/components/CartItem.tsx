import { Text, View, Image, TouchableOpacity } from "react-native";
import Feather from "@expo/vector-icons/Feather";

export function CartItem() {
  return (
    <View className="flex-row space-x-4">
      <View className="w-24 h-24 rounded-md overflow-hidden">
        <Image
          source={{ uri: "http://github.com/gabrielvbauer.png" }}
          className="w-full h-full"
        />
      </View>

      <View className="flex-1 justify-between">
        <View className="flex-row items-start justify-between">
          <View>
            <Text className="text-lg text-gray-900 font-medium">
              Leite Condensado Lata
            </Text>
            <Text className="text-sm text-gray-600">Moça</Text>
          </View>
          <Feather name="trash-2" size={22} color={"#DB2B39"} />
        </View>

        <View className="flex-row items-center justify-between">
          <Text className="text-xl text-gray-900 font-medium">R$ 39,99</Text>
          <View className="flex-row items-center border-2 rounded-md border-gray-400 space-x-2">
            <TouchableOpacity className="w-9 h-9 items-center justify-center">
              <Feather name="minus" size={18} />
            </TouchableOpacity>
            <Text className="text-base text-gray-900 font-medium">1</Text>
            <TouchableOpacity className="w-9 h-9 items-center justify-center">
              <Feather name="plus" size={18} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
