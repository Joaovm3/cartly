import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Feather from '@expo/vector-icons/Feather'
import { useNavigation } from '@react-navigation/core'
import { CartProductList } from '@components/CartProductList'
import { Separator } from '@components/Separator'
import { AppStackNavigatorProps } from '@routes/app.stack.routes'

export function Checkout() {
  const navigation = useNavigation<AppStackNavigatorProps>()

  function handleGoBack() {
    navigation.goBack()
  }

  function handleFinishBuying() {
    navigation.navigate('payment_confirmation')
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView
        className="px-6"
        contentContainerStyle={{ paddingBottom: 42 }}
      >
        <TouchableOpacity className="p-2" onPress={handleGoBack}>
          <Feather name="arrow-left" size={24} color={'#29292E'} />
        </TouchableOpacity>

        <Text className="text-2xl font-medium leading-relaxed">
          Finalizando compra
        </Text>

        <View className="mt-5">
          <CartProductList />
        </View>

        <View className="mb-6 mt-2">
          <Separator />
        </View>

        <View className="space-y-6">
          <View className="space-y-2">
            <Text className="text-base font-medium text-gray-900">
              Entregar em
            </Text>

            <TouchableOpacity className="flex-row items-center justify-between rounded-md bg-gray-200 p-4">
              <View className="space-y-1">
                <Text className="text-base font-medium text-gray-900">
                  R.Bento Gonçalves
                </Text>
                <Text className="font-regular text-sm text-gray-600">
                  245 Centro
                </Text>
              </View>
              <Text className="text-sm font-medium text-orange-500">
                Alterar endereço
              </Text>
            </TouchableOpacity>
          </View>

          <View className="space-y-2">
            <Text className="text-base font-medium text-gray-900">
              Forma de pagamento
            </Text>

            <TouchableOpacity className="flex-row items-center justify-between rounded-md bg-gray-200 p-4">
              <View className="space-y-1">
                <Text className="text-base font-medium text-gray-900">
                  Nubank
                </Text>
                <Text className="font-regular text-sm text-gray-600">
                  **** 2645
                </Text>
              </View>
              <Text className="text-sm font-medium text-orange-500">
                Alterar forma de pagamento
              </Text>
            </TouchableOpacity>
          </View>

          <View className="space-y-2">
            <Text className="text-base font-medium text-gray-900">
              Observação
            </Text>

            <TextInput
              placeholder="Deixe uma observação"
              className="flex-row items-center justify-between rounded-md bg-gray-200 p-4 text-base"
            ></TextInput>
          </View>
        </View>

        <View className="mt-11">
          <View>
            <View className="flex-row items-center justify-between">
              <Text className="text-base text-gray-600">Subtotal</Text>
              <Text className="text-lg font-medium text-gray-800">
                R$ 168,95
              </Text>
            </View>

            <View className="flex-row items-center justify-between">
              <Text className="text-base text-gray-600">Taxa de entrega</Text>
              <Text className="text-lg font-medium text-gray-800">
                R$ 20,00
              </Text>
            </View>

            <View className="flex-row items-center justify-between">
              <Text className="text-base text-gray-600">Desconto</Text>
              <Text className="text-lg font-medium text-gray-800">-</Text>
            </View>

            <View className="mb-4 mt-4">
              <Separator />
            </View>

            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center space-x-4">
                <Text className="text-lg text-gray-900">Total</Text>
                <Text className="text-sm font-medium text-gray-600">
                  14 itens
                </Text>
              </View>

              <Text className="text-2xl font-medium text-gray-900">
                R$ 188,95
              </Text>
            </View>
          </View>

          <TouchableOpacity
            className="mt-6 h-14 w-full items-center justify-center rounded-md bg-green-500"
            onPress={handleFinishBuying}
          >
            <Text className="text-base font-medium text-gray-100">
              Finalizar compra
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
