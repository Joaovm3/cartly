import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from "@expo/vector-icons/Feather";
import { useNavigation } from "@react-navigation/core";
import { CartProductList } from "@components/CartProductList";
import { Separator } from "@components/Separator";
import { AppStackNavigatorProps } from "@routes/app.stack.routes";

export function Checkout() {
  const navigation = useNavigation<AppStackNavigatorProps>();

  function handleGoBack() {
    navigation.goBack();
  }

  function handleFinishBuying() {
    navigation.navigate("payment_confirmation");
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView
        className="px-6"
        contentContainerStyle={{ paddingBottom: 42 }}
      >
        <TouchableOpacity className="p-2" onPress={handleGoBack}>
          <Feather name="arrow-left" size={24} color={"#29292E"} />
        </TouchableOpacity>

        <Text className="text-2xl font-medium leading-relaxed">
          Finalizando compra
        </Text>

        <View className="mt-5">
          <CartProductList />
        </View>

        <View className="mt-2 mb-6">
          <Separator />
        </View>

        <View className="space-y-6">
          <View className="space-y-2">
            <Text className="text-base text-gray-900 font-medium">
              Entregar em
            </Text>

            <TouchableOpacity className="flex-row items-center justify-between p-4 bg-gray-200 rounded-md">
              <View className="space-y-1">
                <Text className="font-medium text-gray-900 text-base">
                  R.Bento Gonçalves
                </Text>
                <Text className="font-regular text-gray-600 text-sm">
                  245 Centro
                </Text>
              </View>
              <Text className="font-medium text-orange-500 text-sm">
                Alterar endereço
              </Text>
            </TouchableOpacity>
          </View>

          <View className="space-y-2">
            <Text className="text-base text-gray-900 font-medium">
              Forma de pagamento
            </Text>

            <TouchableOpacity className="flex-row items-center justify-between p-4 bg-gray-200 rounded-md">
              <View className="space-y-1">
                <Text className="font-medium text-gray-900 text-base">
                  Nubank
                </Text>
                <Text className="font-regular text-gray-600 text-sm">
                  **** 2645
                </Text>
              </View>
              <Text className="font-medium text-orange-500 text-sm">
                Alterar forma de pagamento
              </Text>
            </TouchableOpacity>
          </View>

          <View className="space-y-2">
            <Text className="text-base text-gray-900 font-medium">
              Observação
            </Text>

            <TextInput
              placeholder="Deixe uma observação"
              className="flex-row items-center justify-between p-4 bg-gray-200 rounded-md text-base"
            ></TextInput>
          </View>
        </View>

        <View className="mt-11">
          <View>
            <View className="flex-row items-center justify-between">
              <Text className="text-gray-600 text-base">Subtotal</Text>
              <Text className="text-gray-800 text-lg font-medium">
                R$ 168,95
              </Text>
            </View>

            <View className="flex-row items-center justify-between">
              <Text className="text-gray-600 text-base">Taxa de entrega</Text>
              <Text className="text-gray-800 text-lg font-medium">
                R$ 20,00
              </Text>
            </View>

            <View className="flex-row items-center justify-between">
              <Text className="text-gray-600 text-base">Desconto</Text>
              <Text className="text-gray-800 text-lg font-medium">-</Text>
            </View>

            <View className="mt-4 mb-4">
              <Separator />
            </View>

            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center space-x-4">
                <Text className="text-lg text-gray-900">Total</Text>
                <Text className="text-sm text-gray-600 font-medium">
                  14 itens
                </Text>
              </View>

              <Text className="text-2xl text-gray-900 font-medium">
                R$ 188,95
              </Text>
            </View>
          </View>

          <TouchableOpacity
            className="h-14 w-full bg-green-500 rounded-md items-center justify-center mt-6"
            onPress={handleFinishBuying}
          >
            <Text className="text-base text-gray-100 font-medium">
              Finalizar compra
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
