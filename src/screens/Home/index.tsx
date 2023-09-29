import { Text, View, TextInput, Image, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from "@expo/vector-icons/Feather";

import { Header } from "@components/Header";
import PromotionImage from "@assets/promotion.png";

const promos = [1, 2];

export function Home() {
  return (
    <SafeAreaView className="h-screen bg-gray-100">
      <View className="pt-4">
        <Header />
      </View>

      <View className="px-6 mt-8">
        <View className="p-4 bg-gray-200 rounded-md space-y-4">
          <View className="flex-row items-center gap-4">
            <Feather name="archive" size={28} color="#4CB944" />
            <View>
              <Text className="font-semibold text-green-500 text-base leading-relaxed">
                Coletando itens
              </Text>
              <Text className="text-gray-600 text-sm leading-4">
                Seus itens estão sendo coletados pelos entregadores
              </Text>
            </View>
          </View>

          <View className="w-full h-2 bg-green-500"></View>

          <View className="flex-row justify-between items-center">
            <Text className="text-gray-600 text-sm leading-4">
              Entrega estimada
            </Text>
            <Text className="font-bold text-green-500 text-xl leading-relaxed">
              17:48h
            </Text>
          </View>
        </View>
      </View>

      <View className="px-6 mt-8">
        <TextInput
          className="h-14 bg-gray-200 rounded-md pl-4 placeholder:text-gray-600 placeholder:text-base"
          placeholder="Busque por mercados e produtos"
          cursorColor="#4CB944"
        />
      </View>

      <FlatList
        className="max-h-40 mt-8"
        data={promos}
        keyExtractor={(item) => item.toString()}
        renderItem={() => (
          <View className="bg-gray-400 rounded-md h-40 w-72 overflow-hidden">
            <Image
              source={PromotionImage}
              resizeMode="cover"
              className="w-full h-full"
            />
          </View>
        )}
        contentContainerStyle={{ paddingHorizontal: 24 }}
        ItemSeparatorComponent={() => <View className="mr-2 ml-2" />}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
