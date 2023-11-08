import { Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import PaymentConfirmationSvg from '@assets/payment-confirmation.svg'
import { useNavigation } from '@react-navigation/native'
import { AppStackNavigatorProps } from '@routes/app.stack.routes'

export function PaymentConfirmation() {
  const navigation = useNavigation<AppStackNavigatorProps>()

  function handleGoToInitialScreen() {
    navigation.navigate('home')
  }

  return (
    <SafeAreaView className="flex-1 justify-between px-6">
      <View className="mt-10">
        <Text className="text-center text-2xl font-bold text-green-500">
          Compra finalizada
        </Text>
        <PaymentConfirmationSvg width={'100%'} />
        <Text className="text-center text-lg text-gray-900">
          Uhul!!! a sua compra foi finalizada e os seus produtos já estão sendo
          coletados. Fique atento no horário de entrega previsto.
        </Text>
      </View>

      <TouchableOpacity
        className="mb-16 mt-6 h-14 w-full items-center justify-center rounded-md bg-green-500"
        onPress={handleGoToInitialScreen}
      >
        <Text className="text-base font-medium text-gray-100">
          Voltar para a tela inicial
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}
