import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import PaymentConfirmationSvg from "@assets/payment-confirmation.svg";
import { useNavigation } from "@react-navigation/native";
import { AppStackNavigatorProps } from "@routes/app.stack.routes";

export function PaymentConfirmation() {
  const navigation = useNavigation<AppStackNavigatorProps>();

  function handleGoToInitialScreen() {
    navigation.navigate("home_2");
  }

  return (
    <SafeAreaView className="px-6 justify-between flex-1">
      <View className="mt-10">
        <Text className="font-bold text-2xl text-green-500 text-center">
          Compra finalizada
        </Text>
        <PaymentConfirmationSvg width={"100%"} />
        <Text className="text-lg text-gray-900 text-center">
          Uhul!!! a sua compra foi finalizada e os seus produtos já estão sendo
          coletados. Fique atento no horário de entrega previsto.
        </Text>
      </View>

      <TouchableOpacity
        className="h-14 w-full bg-green-500 rounded-md items-center justify-center mt-6 mb-16"
        onPress={handleGoToInitialScreen}
      >
        <Text className="text-base text-gray-100 font-medium">
          Voltar para a tela inicial
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
