import { useMemo } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native-gesture-handler";

import BottomSheet from "@gorhom/bottom-sheet";

import { CartItem } from "@components/CartItem";
import { useNavigation } from "@react-navigation/native";

import Feather from "@expo/vector-icons/Feather";

export function Cart() {
  const navigation = useNavigation();
  const snapPoints = useMemo(() => [80, "22%"], []);

  function handleGoBack() {
    navigation.goBack();
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView className="px-6 mb-20">
        <TouchableOpacity className="p-2" onPress={handleGoBack}>
          <Feather name="arrow-left" size={24} color={"#29292E"} />
        </TouchableOpacity>

        <Text className="text-2xl font-medium leading-relaxed">Carrinho</Text>

        <View className="mt-5">
          <Text className="text-base text-gray-900 font-medium">
            Lacticínios
          </Text>

          <View className="mt-4 space-y-6">
            <View>
              <CartItem />
            </View>
            <View>
              <CartItem />
            </View>
            <View>
              <CartItem />
            </View>
          </View>
        </View>

        <View className="mt-5">
          <Text className="text-base text-gray-900 font-medium">
            Lacticínios
          </Text>

          <View className="mt-4 space-y-6">
            <View>
              <CartItem />
            </View>
            <View>
              <CartItem />
            </View>
            <View>
              <CartItem />
            </View>
          </View>
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
              <Text className="text-sm text-gray-600">14 itens</Text>
            </View>

            <Text className="text-2xl text-gray-900 font-medium">
              R$ 168,95
            </Text>
          </View>

          <TouchableOpacity className="h-14 w-full bg-green-500 rounded-md items-center justify-center">
            <Text className="text-base text-gray-100 font-medium">
              Finalizar compra
            </Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </SafeAreaView>
  );
}
