import React from 'react'
import { View, TouchableHighlight, Text, Image } from 'react-native'
import Feather from '@expo/vector-icons/Feather'

interface ProductCardProps {
  data: {
    name: string
    brand: string
    value: number
    previewURL: string
  }
}

export function ProductCard({ data }: ProductCardProps) {
  const formattedValue = data.value.toLocaleString('pt-BR')

  return (
    <View className="flex-1 overflow-hidden rounded-md bg-gray-200">
      <View className="max-h-40 w-full">
        <Image
          source={{ uri: 'https://github.com/gabrielvbauer.png' }}
          className="h-full w-full"
        />
      </View>

      <View className="space-y-2 p-3">
        <View>
          <Text className="text-base font-medium leading-none text-gray-900">
            {data.name}
          </Text>
          <Text className="mt-1 text-base font-normal leading-relaxed text-gray-600">
            {data.brand}
          </Text>
        </View>
        <View className="flex-row items-center justify-between">
          <Text className="leadind-relaxed text-lg font-medium text-gray-900">
            R$ {formattedValue}
          </Text>
          <TouchableHighlight className="h-12 w-12 items-center justify-center rounded-lg bg-green-500">
            <Feather name="shopping-cart" size={18} color="#FFF" />
          </TouchableHighlight>
        </View>
      </View>
    </View>
  )
}
