import { SafeAreaView } from 'react-native-safe-area-context'
import { FlatList, ScrollView, View } from 'react-native'
import { PageHeader } from '@components/PageHeader'
import { StackScreenProps } from '@react-navigation/stack'
import { CategoriesRoutes } from '@navigation/Categories/CategoriesStack'
import { PageTitle } from '@components/PageTitle'
import { ProductCard } from '@components/ProductCard'

export interface CategoryRouteParams {
  categoryId: number
}

const products = [
  {
    id: 1,
    name: 'Arroz Integral 1kg',
    brand: 'Tio João',
    value: 5.99,
    previewURL: 'https://example.com/arroz.jpg',
  },
  {
    id: 2,
    name: 'Óleo de Canola 1L',
    brand: 'Liza',
    value: 9.49,
    previewURL: 'https://example.com/oleo.jpg',
  },
  {
    id: 3,
    name: 'Leite Desnatado 1L',
    brand: 'Nestlé',
    value: 3.99,
    previewURL: 'https://example.com/leite.jpg',
  },
  {
    id: 4,
    name: 'Café Torrado e Moído 250g',
    brand: 'Melitta',
    value: 8.29,
    previewURL: 'https://example.com/cafe.jpg',
  },
  {
    id: 5,
    name: 'Manteiga 200g',
    brand: 'Aviação',
    value: 6.79,
    previewURL: 'https://example.com/manteiga.jpg',
  },
  {
    id: 6,
    name: 'Maçãs (1kg)',
    brand: 'Fazenda Frutas Frescas',
    value: 4.49,
    previewURL: 'https://example.com/macas.jpg',
  },
  {
    id: 7,
    name: 'Pão de Forma Integral',
    brand: 'Wickbold',
    value: 5.29,
    previewURL: 'https://example.com/pao.jpg',
  },
  {
    id: 8,
    name: 'Salmão Fresco (200g)',
    brand: 'Mar Fresco',
    value: 12.99,
    previewURL: 'https://example.com/salmao.jpg',
  },
]

interface Props extends StackScreenProps<CategoriesRoutes, 'category'> {}

export function Category({ route }: Props) {
  const { params } = route
  console.log(params)

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView
        className="px-6"
        contentContainerStyle={{ paddingBottom: 42 }}
      >
        <PageHeader rightButtonIcon="more-vertical" />

        <PageTitle title="Lacticínios" />

        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ProductCard
              data={{
                name: item.name,
                brand: item.brand,
                value: item.value,
                previewURL: item.previewURL,
              }}
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
      </ScrollView>
    </SafeAreaView>
  )
}
