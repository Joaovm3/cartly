import React from "react";
import { View, Text } from "react-native";
import Feather from "@expo/vector-icons/Feather";

export function DeliveryStateCard() {
  return (
    <View className="p-4 bg-gray-200 rounded-md space-y-4">
      <View className="flex-row items-center gap-4">
        <Feather name="archive" size={28} color="#4CB944" />
        <View>
          <Text className="font-semibold text-green-500 text-base leading-relaxed">
            Coletando itens
          </Text>
          <Text className="text-gray-600 text-sm leading-4">
            Seus itens estão sendo coletados pelos entregadores
          </Text>
        </View>
      </View>

      <View className="w-full h-2 bg-green-500"></View>

      <View className="flex-row justify-between items-center">
        <Text className="text-gray-600 text-sm leading-4">
          Entrega estimada
        </Text>
        <Text className="font-bold text-green-500 text-xl leading-relaxed">
          17:48h
        </Text>
      </View>
    </View>
  );
}
