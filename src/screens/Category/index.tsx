import { SafeAreaView } from 'react-native-safe-area-context'
import { FlatList, ScrollView, View } from 'react-native'
import { PageHeader } from '@components/PageHeader'
import { StackScreenProps } from '@react-navigation/stack'
import {
  CategoriesRoutes,
  CategoriesStackNavigatorProps,
} from '@navigation/Categories/CategoriesStack'
import { PageTitle } from '@components/PageTitle'
import { ProductCard } from '@components/ProductCard'
import { useCart } from '@hooks/useCart'
import { useNavigation } from '@react-navigation/native'
import { useFetchProductsByCategory } from '@hooks/useFetchProductsByCategory'
import { Loading } from '@components/Loading'

export interface CategoryRouteParams {
  categoryName: string
}

interface Props extends StackScreenProps<CategoriesRoutes, 'category'> {}

export function Category({ route }: Props) {
  const { params } = route

  const navigation = useNavigation<CategoriesStackNavigatorProps>()
  const { isLoadingProducts, products } = useFetchProductsByCategory(
    params.categoryName,
  )

  const { addProductToCart } = useCart()

  function handleAddProductToCart(productId: string) {
    addProductToCart(productId)
  }

  function handleOpenProduct(productId: string) {
    navigation.navigate('product', { productId })
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView
        className="px-6"
        contentContainerStyle={{ paddingBottom: 42 }}
      >
        <PageHeader rightButtonIcon="more-vertical" />

        <PageTitle title={params.categoryName} />

        {isLoadingProducts ? (
          <View className="flex-1 items-center justify-center">
            <Loading />
          </View>
        ) : (
          <FlatList
            data={products}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <ProductCard
                data={{
                  id: item.id.toString(),
                  name: item.name,
                  brand: item.brand,
                  price: item.price,
                  previewURL: item.previewURL,
                }}
                onPress={handleOpenProduct}
                onAddProductToCart={handleAddProductToCart}
              />
            )}
            contentContainerStyle={{
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
      </ScrollView>
    </SafeAreaView>
  )
}
