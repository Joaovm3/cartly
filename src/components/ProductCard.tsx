import React from 'react'
import {
  View,
  TouchableHighlight,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native'
import Feather from '@expo/vector-icons/Feather'
import Toast from 'react-native-toast-message'

interface ProductCardProps {
  data: {
    id: string
    name: string
    brand: string
    value: number
    previewURL: string
  }
  onAddProductToCart: (productId: string) => void
  onPress: (productId: string) => void
}

export function ProductCard({
  data,
  onAddProductToCart,
  onPress,
}: ProductCardProps) {
  const formattedValue = data.value.toLocaleString('pt-BR')

  function handleAddProductToCart() {
    onAddProductToCart(data.id)

    Toast.show({
      type: 'success',
      text1: 'Produto adicionado ao carrinho!',
    })
  }

  return (
    <TouchableOpacity
      className="flex-1 overflow-hidden rounded-md bg-gray-200"
      onPress={() => onPress(data.id)}
    >
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
          <TouchableHighlight
            className="h-12 w-12 items-center justify-center rounded-lg bg-green-500"
            onPress={handleAddProductToCart}
          >
            <Feather name="shopping-cart" size={18} color="#FFF" />
          </TouchableHighlight>
        </View>
      </View>
    </TouchableOpacity>
  )
}
