import { Text, View, Image, TouchableOpacity } from 'react-native'
import Feather from '@expo/vector-icons/Feather'
import { useMemo } from 'react'
import { currencyFormatter } from '@utils/formatter'

export interface CartItemProps {
  data: {
    id: string
    product: {
      name: string
      brand: string
      category: string
      price: number
      previewURL: string
    }
    amount: number
  }
  onRemoveProduct: (cartProductId: string) => void
  onIncreaseProductAmount: (cartProductId: string) => void
  onDecreaseProductAmount: (cartProductId: string) => void
}

export function CartItem({
  data: { product, amount, id },
  onRemoveProduct,
  onIncreaseProductAmount,
  onDecreaseProductAmount,
}: CartItemProps) {
  const priceFormatted = useMemo(
    () => currencyFormatter(product.price),
    [product],
  )

  const isProductAmountLessOrEqualToOne = amount <= 1

  function handleRemoveProduct() {
    onRemoveProduct(id)
  }

  function handleIncreaseAmount() {
    onIncreaseProductAmount(id)
  }

  function handleDecreaseAmount() {
    onDecreaseProductAmount(id)
  }

  return (
    <View className="flex-row space-x-4">
      <View className="h-24 w-24 overflow-hidden rounded-md">
        <Image source={{ uri: product.previewURL }} className="h-full w-full" />
      </View>

      <View className="flex-1 justify-between">
        <View className="flex-row items-start justify-between">
          <View>
            <Text className="text-lg font-medium text-gray-900">
              {product.name}
            </Text>
            <Text className="text-sm text-gray-600">{product.brand}</Text>
          </View>
          <TouchableOpacity onPress={handleRemoveProduct}>
            <Feather name="trash-2" size={22} color={'#DB2B39'} />
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center justify-between">
          <Text className="text-xl font-medium text-gray-900">
            R$ {priceFormatted}
          </Text>
          <View className="flex-row items-center space-x-2 rounded-md border-2 border-gray-400">
            <TouchableOpacity
              className="h-9 w-9 items-center justify-center"
              onPress={handleDecreaseAmount}
              disabled={isProductAmountLessOrEqualToOne}
            >
              <Feather name="minus" size={18} />
            </TouchableOpacity>
            <Text className="text-base font-medium text-gray-900">
              {amount}
            </Text>
            <TouchableOpacity
              className="h-9 w-9 items-center justify-center"
              onPress={handleIncreaseAmount}
            >
              <Feather name="plus" size={18} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}
