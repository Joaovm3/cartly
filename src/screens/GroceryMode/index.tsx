import BottomSheet from "@gorhom/bottom-sheet";
import React, { useMemo } from "react";
import {
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import Feather from "@expo/vector-icons/Feather";
import { AppStackNavigatorProps } from "@routes/app.stack.routes";
import {
  GroceryCategory,
  GroceryCategoryStatus,
} from "@components/GroceryCategory/GroceryCategory";

type Categories = {
  id: number;
  description: string;
  amountOfProducts: number;
  totalPrice: number;
  status: GroceryCategoryStatus;
};

const categories: Categories[] = [
  {
    id: 1,
    description: "Não perecíveis",
    amountOfProducts: 5,
    totalPrice: 149.86,
    status: "filled",
  },
  {
    id: 2,
    description: "Frutas e verduras",
    amountOfProducts: 0,
    totalPrice: 0,
    status: "skipped",
  },
  {
    id: 3,
    description: "Carnes",
    amountOfProducts: 0,
    totalPrice: 0,
    status: "skipped",
  },
  {
    id: 4,
    description: "Frios",
    amountOfProducts: 5,
    totalPrice: 149.86,
    status: "normal",
  },
  {
    id: 5,
    description: "Bebidas",
    amountOfProducts: 5,
    totalPrice: 149.86,
    status: "normal",
  },
  {
    id: 6,
    description: "Lacticínios",
    amountOfProducts: 5,
    totalPrice: 149.86,
    status: "normal",
  },
];

export function GroceryMode() {
  const navigation = useNavigation<AppStackNavigatorProps>();
  const snapPoints = useMemo(() => [80, "22%"], []);

  function handleGoBack() {
    navigation.goBack();
  }

  function handleFinishShopping() {
    navigation.navigate("checkout");
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView className="px-6">
        <TouchableOpacity className="p-2" onPress={handleGoBack}>
          <Feather name="arrow-left" size={24} color={"#29292E"} />
        </TouchableOpacity>

        <Text className="text-2xl font-medium leading-relaxed">Rancho</Text>

        <View className="mt-5 pb-52 flex-1">
          <FlatList
            data={categories}
            renderItem={({ item }) => (
              <GroceryCategory key={item.id} data={item} />
            )}
            scrollEnabled={false}
            ItemSeparatorComponent={() => <View className="mt-2 mb-2" />}
          />
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
            </View>
          </View>

          <TouchableOpacity
            className="h-14 w-full bg-green-500 rounded-md items-center justify-center"
            onPress={handleFinishShopping}
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
