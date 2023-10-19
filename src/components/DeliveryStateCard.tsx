import React from 'react'
import { View, Text } from 'react-native'
import Feather from '@expo/vector-icons/Feather'

export function DeliveryStateCard() {
  return (
    <View className="space-y-4 rounded-md bg-gray-200 p-4">
      <View className="flex-row items-center gap-4">
        <Feather name="archive" size={28} color="#4CB944" />
        <View>
          <Text className="text-base font-semibold leading-relaxed text-green-500">
            Coletando itens
          </Text>
          <Text className="text-sm leading-4 text-gray-600">
            Seus itens estão sendo coletados pelos entregadores
          </Text>
        </View>
      </View>

      <View className="h-2 w-full bg-green-500"></View>

      <View className="flex-row items-center justify-between">
        <Text className="text-sm leading-4 text-gray-600">
          Entrega estimada
        </Text>
        <Text className="text-xl font-bold leading-relaxed text-green-500">
          17:48h
        </Text>
      </View>
    </View>
  )
}
