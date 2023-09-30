import React from "react";
import { View, TouchableHighlight, Text, Image } from "react-native";
import Feather from "@expo/vector-icons/Feather";

export function ProductCard() {
  return (
    <View className="bg-gray-200 flex-1 rounded-md overflow-hidden">
      <View className="w-full max-h-40">
        <Image
          source={{ uri: "https://github.com/gabrielvbauer.png" }}
          className="w-full h-full"
        />
      </View>

      <View className="p-3 space-y-2">
        <View>
          <Text className="text-base text-gray-900 font-medium leading-relaxed">
            Leite condensado
          </Text>
          <Text className="text-base text-gray-600 font-normal leading-relaxed -mt-1">
            500g - Moça
          </Text>
        </View>
        <View className="flex-row justify-between items-center">
          <Text className="text-lg text-gray-900 font-medium leadind-relaxed">
            R$ 34,99
          </Text>
          <TouchableHighlight className="w-12 h-12 bg-green-500 items-center justify-center rounded-lg">
            <Feather name="shopping-cart" size={18} color="#FFF" />
          </TouchableHighlight>
        </View>
      </View>
    </View>
  );
}
