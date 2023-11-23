import { useState, useEffect } from 'react'
import { View, TextInput, FlatList, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Header } from '@components/Header'
import { SectionHeader } from '@components/SectionHeader'
import {
  DeliveryCardProps,
  DeliveryStateCard,
} from '@components/DeliveryStateCard'
import { BannerCard } from '@components/BannerCard'
import { QuickAccess } from '@components/QuickAccess'
import { Market } from '@components/Market'
import { ProductCard } from '@components/ProductCard'
import { useNavigation } from '@react-navigation/native'
import { AppTabNavigatorProps } from '@routes/app.tab.routes'
import { Loading } from '@components/Loading'
import { useFetchMainCategories } from '@hooks/useFetchMainCategories'
import { useFetchNearbyMarkets } from '@hooks/useFetchNearbyMarkets'
import { useFetchOffers } from '@hooks/useFetchOffers'
import { useFetchPromos } from '@hooks/useFetchPromos'
import { useCart } from '@hooks/useCart'
import {
  FirestoreError,
  QuerySnapshot,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore'
import { ordersRef } from '@db/firebaseConfig'
import { OrderStatus } from '@utils/order-status.enum'

export function Home() {
  const [items, setItems] = useState<DeliveryCardProps[]>([])

  useEffect(() => {
    const q = query(
      ordersRef,
      where('createdAt', '!=', null),
      orderBy('createdAt', 'asc'),
    )
    const unsub = onSnapshot(q, onResult, onError)
    return () => unsub()
  }, [])

  function onResult(snapshot: QuerySnapshot) {
    const list: DeliveryCardProps[] = []
    const STATUS_TITLE = {
      [OrderStatus.FAILED]: 'Falha ao coletar os itens',
      [OrderStatus.PENDING]: 'Coletando itens',
      [OrderStatus.PROCESSED]: 'Itens a caminho',
      [OrderStatus.COMPLETED]: 'Itens a caminho',
    }

    const STATUS_SUBTITLE = {
      [OrderStatus.FAILED]: 'Ops! Houve uma falha, entre em contato!',
      [OrderStatus.PENDING]:
        'Seus itens estão sendo coletados pelos entregadores',
      [OrderStatus.PROCESSED]: 'Seus itens estão chegando!',
      [OrderStatus.COMPLETED]: 'Seus itens foram entregues!',
    }

    snapshot.docs.forEach((doc) => {
      const status: OrderStatus = doc.data().status || OrderStatus.FAILED

      list.push({
        id: doc.data().orderId,
        estimatedDelivery: '17:48h',
        status,
        title: STATUS_TITLE[status],
        subtitle: STATUS_SUBTITLE[status],
      } as DeliveryCardProps)
    })

    setItems(list)
  }

  function onError(e: FirestoreError) {
    console.error(e)
    setItems([])
  }

  const { mainCategories, isMainCategoriesLoading } = useFetchMainCategories()
  const { nearbyMarkets, isNearbyMarketsLoading } = useFetchNearbyMarkets()
  const { offers, isOffersLoading } = useFetchOffers()
  const { promos, isPromosLoading } = useFetchPromos()

  const { addProductToCart } = useCart()

  const navigation = useNavigation<AppTabNavigatorProps>()

  function handleOpenCategories() {
    navigation.navigate('categories')
  }

  function handleAddProductToCart(productId: string) {
    addProductToCart(productId)
  }

  function handleOpenProduct(productId: string) {
    navigation.navigate('categories', {
      screen: 'product',
      params: {
        productId,
      },
    })
  }

  const LoadingView = () => {
    return (
      <View className="h-16 items-center justify-center">
        <Loading />
      </View>
    )
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="pt-4">
          <Header />
        </View>

        <View className="mt-8 px-6">
          {!items.length ? (
            <LoadingView />
          ) : (
            <FlatList
              className="max-h-40"
              data={items}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => <DeliveryStateCard {...item} />}
              // contentContainerStyle={{ paddingHorizontal: 24 }}
              ItemSeparatorComponent={() => <View className="ml-2 mr-2" />}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          )}
        </View>

        <View className="mt-8 px-6">
          <TextInput
            className="h-14 rounded-md bg-gray-200 pl-4 placeholder:text-base placeholder:text-gray-600"
            placeholder="Busque por mercados e produtos"
            cursorColor="#4CB944"
          />
        </View>

        <View className="mt-8">
          {isPromosLoading ? (
            <LoadingView />
          ) : (
            <FlatList
              className="max-h-40"
              data={promos}
              keyExtractor={(item) => item.id.toString()}
              renderItem={() => <BannerCard />}
              contentContainerStyle={{ paddingHorizontal: 24 }}
              ItemSeparatorComponent={() => <View className="ml-2 mr-2" />}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          )}
        </View>

        <View className="mt-8">
          <SectionHeader
            title="Categorias principais"
            onSeeMorePress={handleOpenCategories}
          />

          {isMainCategoriesLoading ? (
            <LoadingView />
          ) : (
            <FlatList
              data={mainCategories}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <QuickAccess title={item.description} />
              )}
              contentContainerStyle={{ paddingHorizontal: 24, marginTop: 16 }}
              ItemSeparatorComponent={() => <View className="ml-1 mr-1" />}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          )}
        </View>

        <View className="mt-8">
          <SectionHeader title="Mercados nas proximidades" />

          {isNearbyMarketsLoading ? (
            <LoadingView />
          ) : (
            <FlatList
              data={nearbyMarkets}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => <Market data={item} />}
              contentContainerStyle={{ paddingHorizontal: 24, marginTop: 16 }}
              ItemSeparatorComponent={() => <View className="ml-1 mr-1" />}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          )}
        </View>

        <View className="mt-8">
          <SectionHeader title="Aproveite a oferta" />

          {isOffersLoading ? (
            <LoadingView />
          ) : (
            <FlatList
              data={offers}
              disableVirtualization
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <ProductCard
                  data={item}
                  onAddProductToCart={handleAddProductToCart}
                  onPress={handleOpenProduct}
                />
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
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
