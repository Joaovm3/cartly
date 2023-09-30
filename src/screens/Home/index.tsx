import {
  Text,
  View,
  TextInput,
  Image,
  FlatList,
  Pressable,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from "@expo/vector-icons/Feather";

import { Header } from "@components/Header";
import PromotionImage from "@assets/promotion.png";

const promos = [1, 2];
const mainCategories = [
  "Não perecíveis",
  "Frutas e verduras",
  "Carnes",
  "Frios",
  "Bebidas",
  "Higiêne",
];

export function Home() {
  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView>
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

        <View className="mt-8">
          <View className="flex-row justify-between px-6">
            <Text className="text-base font-medium leading-relaxed text-gray-800">
              Categorias principais
            </Text>
            <Pressable className="flex-row items-center space-x-1">
              <Text className="text-gray-600">Ver mais</Text>
              <Feather name="arrow-right" size={20} color="#737380" />
            </Pressable>
          </View>

          <FlatList
            data={mainCategories}
            keyExtractor={(item) => item.toString()}
            renderItem={(item) => (
              <View className="w-20 items-center space-y-1">
                <View className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center"></View>
                <Text className="text-center text-gray-700 text-sm leading-snug">
                  {item.item}
                </Text>
              </View>
            )}
            contentContainerStyle={{ paddingHorizontal: 24, marginTop: 16 }}
            ItemSeparatorComponent={() => <View className="mr-1 ml-1" />}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>

        <View className="mt-8">
          <View className="flex-row justify-between px-6">
            <Text className="text-base font-medium leading-relaxed text-gray-800">
              Mercados nas proximidades
            </Text>
            <Pressable className="flex-row items-center space-x-1">
              <Text className="text-gray-600">Ver mais</Text>
              <Feather name="arrow-right" size={20} color="#737380" />
            </Pressable>
          </View>

          <FlatList
            data={mainCategories}
            keyExtractor={(item) => item.toString()}
            renderItem={(item) => (
              <View className="flex-row space-x-3 px-4 py-3 bg-gray-200 rounded-md">
                <View className="w-16 h-16 rounded-sm overflow-hidden">
                  <Image
                    source={{ uri: "https://github.com/gabrielvbauer.png" }}
                    className="w-full h-full"
                    resizeMode="cover"
                  />
                </View>
                <View>
                  <Text className="text-base text-gray-700 leading-relaxed">
                    Mercado xpto
                  </Text>
                  <Text className="text-sm text-gray-400 leading-relaxed">
                    2.48km de você
                  </Text>
                </View>
              </View>
            )}
            contentContainerStyle={{ paddingHorizontal: 24, marginTop: 16 }}
            ItemSeparatorComponent={() => <View className="mr-1 ml-1" />}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>

        <View className="mt-8">
          <View className="flex-row justify-between px-6">
            <Text className="text-base font-medium leading-relaxed text-gray-800">
              Aproveite a oferta
            </Text>
            <Pressable className="flex-row items-center space-x-1">
              <Text className="text-gray-600">Ver mais</Text>
              <Feather name="arrow-right" size={20} color="#737380" />
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
