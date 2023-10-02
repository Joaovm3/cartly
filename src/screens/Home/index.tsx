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
import { AppTabNavigatorProps } from "@routes/app.tab.routes";
import { Loading } from "@components/Loading";
import { useFetchMainCategories } from "@hooks/useFetchMainCategories";
import { useFetchNearbyMarkets } from "@hooks/useFetchNearbyMarkets";
import { useFetchOffers } from "@hooks/useFetchOffers";

const promos = [1, 2];

export function Home() {
  const { mainCategories, isMainCategoriesLoading } = useFetchMainCategories();
  const { nearbyMarkets, isNearbyMarketsLoading } = useFetchNearbyMarkets();
  const { offers, isOffersLoading } = useFetchOffers();

  const navigation = useNavigation<AppTabNavigatorProps>();

  function handleOpenCategories() {
    navigation.navigate("categories");
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView showsVerticalScrollIndicator={false}>
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

          {isMainCategoriesLoading ? (
            <View className="h-16 items-center justify-center">
              <Loading />
            </View>
          ) : (
            <FlatList
              data={mainCategories}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <QuickAccess title={item.description} />
              )}
              contentContainerStyle={{ paddingHorizontal: 24, marginTop: 16 }}
              ItemSeparatorComponent={() => <View className="mr-1 ml-1" />}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          )}
        </View>

        <View className="mt-8">
          <SectionHeader title="Mercados nas proximidades" />

          {isNearbyMarketsLoading ? (
            <View className="h-16 items-center justify-center">
              <Loading />
            </View>
          ) : (
            <FlatList
              data={nearbyMarkets}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => <Market data={item} />}
              contentContainerStyle={{ paddingHorizontal: 24, marginTop: 16 }}
              ItemSeparatorComponent={() => <View className="mr-1 ml-1" />}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          )}
        </View>

        <View className="mt-8">
          <SectionHeader title="Aproveite a oferta" />

          {isOffersLoading ? (
            <View className="h-16 items-center justify-center">
              <Loading />
            </View>
          ) : (
            <FlatList
              data={offers}
              disableVirtualization
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => <ProductCard data={item} />}
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
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
