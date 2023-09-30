import { View, TextInput, FlatList, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Header } from "@components/Header";
import { SectionHeader } from "@components/SectionHeader";
import { DeliveryStateCard } from "@components/DeliveryStateCard";
import { BannerCard } from "@components/BannerCard";
import { QuickAccess } from "@components/QuickAccess";
import { Market } from "@components/Market";
import { ProductCard } from "@components/ProductCard";
import { useNavigation } from "@react-navigation/native";
import { NavigatorRouteProps } from "@routes/index";

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
  const navigation = useNavigation<NavigatorRouteProps>();

  function handleOpenCategories() {
    navigation.navigate("categories");
  }

  function handleOpenProduct() {}

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

        <View className="mt-8">
          <FlatList
            className="max-h-40"
            data={promos}
            keyExtractor={(item) => item.toString()}
            renderItem={() => <BannerCard />}
            contentContainerStyle={{ paddingHorizontal: 24 }}
            ItemSeparatorComponent={() => <View className="mr-2 ml-2" />}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>

        <View className="mt-8">
          <SectionHeader
            title="Categorias principais"
            onSeeMorePress={handleOpenCategories}
          />
          <FlatList
            data={mainCategories}
            keyExtractor={(item) => item.toString()}
            renderItem={({ item }) => <QuickAccess title={item} />}
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
            renderItem={(item) => <Market />}
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
            renderItem={(item) => <ProductCard />}
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
