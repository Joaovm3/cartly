import BottomSheet from '@gorhom/bottom-sheet'
import React, { useMemo } from 'react'
import {
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  FlatList,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import Feather from '@expo/vector-icons/Feather'
import { AppStackNavigatorProps } from '@routes/app.stack.routes'
import {
  GroceryCategory,
  GroceryCategoryStatus,
} from '@components/GroceryCategory/GroceryCategory'

type Categories = {
  id: number
  description: string
  amountOfProducts: number
  totalPrice: number
  status: GroceryCategoryStatus
}

const categories: Categories[] = [
  {
    id: 1,
    description: 'Não perecíveis',
    amountOfProducts: 5,
    totalPrice: 149.86,
    status: 'filled',
  },
  {
    id: 2,
    description: 'Frutas e verduras',
    amountOfProducts: 0,
    totalPrice: 0,
    status: 'skipped',
  },
  {
    id: 3,
    description: 'Carnes',
    amountOfProducts: 0,
    totalPrice: 0,
    status: 'skipped',
  },
  {
    id: 4,
    description: 'Frios',
    amountOfProducts: 5,
    totalPrice: 149.86,
    status: 'normal',
  },
  {
    id: 5,
    description: 'Bebidas',
    amountOfProducts: 5,
    totalPrice: 149.86,
    status: 'normal',
  },
  {
    id: 6,
    description: 'Lacticínios',
    amountOfProducts: 5,
    totalPrice: 149.86,
    status: 'normal',
  },
]

export function GroceryMode() {
  const navigation = useNavigation<AppStackNavigatorProps>()
  const snapPoints = useMemo(() => [80, '22%'], [])

  function handleGoBack() {
    navigation.goBack()
  }

  function handleFinishShopping() {
    navigation.navigate('checkout')
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView className="px-6">
        <TouchableOpacity className="p-2" onPress={handleGoBack}>
          <Feather name="arrow-left" size={24} color={'#29292E'} />
        </TouchableOpacity>

        <Text className="text-2xl font-medium leading-relaxed">Rancho</Text>

        <View className="mt-5 flex-1 pb-52">
          <FlatList
            data={categories}
            renderItem={({ item }) => (
              <GroceryCategory key={item.id} data={item} />
            )}
            scrollEnabled={false}
            ItemSeparatorComponent={() => <View className="mb-2 mt-2" />}
          />
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
            </View>
          </View>

          <TouchableOpacity
            className="h-14 w-full items-center justify-center rounded-md bg-green-500"
            onPress={handleFinishShopping}
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
