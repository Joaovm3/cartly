import {
  Text,
  View,
  TextInput,
  Image,
  FlatList,
  Pressable,
  ScrollView,
  TouchableHighlight,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from "@expo/vector-icons/Feather";

import { Header } from "@components/Header";
import PromotionImage from "@assets/promotion.png";
import { SectionHeader } from "@components/SectionHeader";
import { DeliveryStateCard } from "@components/DeliveryStateCard";

const promos = [1, 2];
const mainCategories = [
  "Não perecíveis",
  "Frutas e verduras",
  "Carnes",
  "Frios",
  "Bebidas",
  "Higiêne",
];
const oferta = [1, 2, 3, 4, 5, 6];

export function Home() {
  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView>
        <View className="pt-4">
          <Header />
        </View>

        <View className="px-6 mt-8">
          <DeliveryStateCard />
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
          <SectionHeader title="Categorias principais" />

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
          <SectionHeader title="Mercados nas proximidades" />

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
          <SectionHeader title="Aproveite a oferta" />

          <FlatList
            data={oferta}
            disableVirtualization
            keyExtractor={(item) => item.toString()}
            renderItem={(item) => (
              <View className="bg-gray-200 flex-1 rounded-md overflow-hidden">
                <View className="w-full max-h-40">
                  <Image
                    source={{ uri: "https://github.com/gabrielvbauer.png" }}
                    className="w-full h-full"
                  />
                </View>

                <View className="p-3 space-y-2">
                  <View>
                    <Text className="text-base text-gray-900 font-medium leading-relaxed">
                      Leite condensado
                    </Text>
                    <Text className="text-base text-gray-600 font-normal leading-relaxed -mt-1">
                      500g - Moça
                    </Text>
                  </View>
                  <View className="flex-row justify-between items-center">
                    <Text className="text-lg text-gray-900 font-medium leadind-relaxed">
                      R$ 34,99
                    </Text>
                    <TouchableHighlight className="w-12 h-12 bg-green-500 items-center justify-center rounded-lg">
                      <Feather name="shopping-cart" size={18} color="#FFF" />
                    </TouchableHighlight>
                  </View>
                </View>
              </View>
            )}
            contentContainerStyle={{
              paddingHorizontal: 24,
              marginTop: 16,
              marginBottom: 64,
            }}
            numColumns={2}
            columnWrapperStyle={{
              gap: 24,
            }}
            ItemSeparatorComponent={() => <View className="my-3" />}
            showsHorizontalScrollIndicator={false}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
