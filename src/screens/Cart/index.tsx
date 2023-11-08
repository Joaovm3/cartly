import { useContext, useMemo } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TouchableOpacity } from 'react-native-gesture-handler'

import BottomSheet from '@gorhom/bottom-sheet'

import { useNavigation } from '@react-navigation/native'

import Feather from '@expo/vector-icons/Feather'
import { CartContext } from '@contexts/CartContext'
import { type AppCartStackNavigatorProps } from '@navigation/Cart/CartStack'
import { CartProductList } from '@components/CartProductList'

export function Cart() {
  const { totalPriceFormatted, totalItems } = useContext(CartContext)

  const navigation = useNavigation<AppCartStackNavigatorProps>()
  const snapPoints = useMemo(() => [80, '22%'], [])

  function handleGoBack() {
    navigation.goBack()
  }

  function handleFinishBuying() {
    navigation.navigate('checkout')
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView className="px-6">
        <TouchableOpacity className="p-2" onPress={handleGoBack}>
          <Feather name="arrow-left" size={24} color={'#29292E'} />
        </TouchableOpacity>

        <Text className="text-2xl font-medium leading-relaxed">Carrinho</Text>

        <View className="mt-5">
          <CartProductList />
        </View>
      </ScrollView>

      <BottomSheet
        snapPoints={snapPoints}
        index={1}
        backgroundStyle={{
          backgroundColor: '#f8f8f8',
        }}
      >
        <View className="h-full justify-between px-6 pb-8">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center space-x-4">
              <Text className="text-lg font-medium text-gray-900">Total</Text>
              <Text className="text-sm text-gray-600">{totalItems} itens</Text>
            </View>

            <Text className="text-2xl font-medium text-gray-900">
              R$ {totalPriceFormatted}
            </Text>
          </View>

          <TouchableOpacity
            className="h-14 w-full items-center justify-center rounded-md bg-green-500"
            onPress={handleFinishBuying}
          >
            <Text className="text-base font-medium text-gray-100">
              Finalizar compra
            </Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </SafeAreaView>
  )
}
