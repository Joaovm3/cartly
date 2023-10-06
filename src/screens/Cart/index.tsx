import { useContext, useMemo } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native-gesture-handler";

import BottomSheet from "@gorhom/bottom-sheet";

import { useNavigation } from "@react-navigation/native";

import Feather from "@expo/vector-icons/Feather";
import { CartContext } from "@contexts/CartContext";
import { AppCartStackNavigatorProps } from "@navigation/Cart/CartStack";
import { CartProductList } from "@components/CartProductList";

export function Cart() {
  const { totalPriceFormatted, totalItems } = useContext(CartContext);

  const navigation = useNavigation<AppCartStackNavigatorProps>();
  const snapPoints = useMemo(() => [80, "22%"], []);

  function handleGoBack() {
    navigation.goBack();
  }

  function handleFinishBuying() {
    navigation.navigate("checkout");
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView className="px-6">
        <TouchableOpacity className="p-2" onPress={handleGoBack}>
          <Feather name="arrow-left" size={24} color={"#29292E"} />
        </TouchableOpacity>

        <Text className="text-2xl font-medium leading-relaxed">Carrinho</Text>

        <View className="mt-5 pb-52">
          <CartProductList />
        </View>
      </ScrollView>

      <BottomSheet
        snapPoints={snapPoints}
        index={1}
        backgroundStyle={{
          backgroundColor: "#f8f8f8",
        }}
      >
        <View className="px-6 pb-8 justify-between h-full">
          <View className="flex-row items-center justify-between">
            <View className="flex-row space-x-4 items-center">
              <Text className="text-lg text-gray-900 font-medium">Total</Text>
              <Text className="text-sm text-gray-600">{totalItems} itens</Text>
            </View>

            <Text className="text-2xl text-gray-900 font-medium">
              R$ {totalPriceFormatted}
            </Text>
          </View>

          <TouchableOpacity
            className="h-14 w-full bg-green-500 rounded-md items-center justify-center"
            onPress={handleFinishBuying}
          >
            <Text className="text-base text-gray-100 font-medium">
              Finalizar compra
            </Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </SafeAreaView>
  );
}
