import {
  ImageBackground,
  ScrollView,
  View,
  TouchableOpacity,
  Text,
} from 'react-native'
import Feather from '@expo/vector-icons/Feather'
import { THEME } from '@theme/index'
import { Rating } from '@components/Rating'
import { SelectedMarket } from '@components/SelectedMarket'
import { Market } from '@components/Market'
import { FlatList } from 'react-native-gesture-handler'
import { useCart } from '@hooks/useCart'
import { useNavigation } from '@react-navigation/native'
import { StackScreenProps } from '@react-navigation/stack'
import { CategoriesRoutes } from '@navigation/Categories/CategoriesStack'
import { Loading } from '@components/Loading'
import { useFetchProduct } from '@hooks/useFetchProduct'
import { useToast } from '@hooks/useToast'
import { AppCartStackNavigatorProps } from '@navigation/Cart/CartStack'

const data = [
  {
    id: 1,
    name: 'Mercado Leopoldo',
    distance: 300,
    distanceFormatted: '300m',
    previewURL: 'https://i.ibb.co/ws9BTZN/mercado-1.webp',
  },
  {
    id: 2,
    name: 'Mercado Família',
    distance: 1400,
    distanceFormatted: '1.4km',
    previewURL: 'https://i.ibb.co/LR85yGn/mercado-2.jpg',
  },
  {
    id: 3,
    name: 'Copral',
    distance: 2480,
    distanceFormatted: '2.48km',
    previewURL: 'https://i.ibb.co/Fw0L1LJ/mercado-3.webp',
  },
]

export interface ProductRouteParams {
  productId: string
}

interface Props extends StackScreenProps<CategoriesRoutes, 'product'> {}

export function Product({ route }: Props) {
  const { productId } = route.params
  const { isLoadingProduct, product, remove } = useFetchProduct(productId)

  const navigation = useNavigation<AppCartStackNavigatorProps>()

  const { addProductToCart } = useCart()
  const { showNotification } = useToast()
  const { goBack } = useNavigation()

  function handleAddProductToCart() {
    addProductToCart(productId)

    showNotification({
      title: 'Produto adicionado ao carrinho!',
      description: 'Clique aqui para ir até o carrinho',
      onPress: () => navigation.navigate('cart'),
    })
  }

  function handleFavoriteProduct() {}

  function handleGoBack() {
    remove()
    goBack()
  }

  return (
    <>
      {isLoadingProduct ? (
        <View className="flex-1 items-center justify-center">
          <Loading />
        </View>
      ) : (
        <>
          <ScrollView className="flex-1 bg-gray-100">
            <ImageBackground
              source={{
                uri: product[0].previewURL,
              }}
              className="h-96"
            >
              <View className="mt-14 flex-row items-center justify-between px-6">
                <TouchableOpacity onPress={handleGoBack}>
                  <Feather
                    name="arrow-left"
                    color={THEME.COLORS.WHITE}
                    size={24}
                  />
                </TouchableOpacity>

                <View className="flex-row items-center space-x-4">
                  <TouchableOpacity onPress={handleFavoriteProduct}>
                    <Feather
                      name="heart"
                      color={THEME.COLORS.WHITE}
                      size={24}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity>
                    <Feather
                      name="shopping-cart"
                      color={THEME.COLORS.WHITE}
                      size={24}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </ImageBackground>

            <View className="mt-6 px-6">
              <View className="flex-row items-center justify-between">
                <View>
                  <Text className="text-sm font-medium text-gray-600">
                    {product[0].brand}
                  </Text>
                  <Text className="text-xl font-medium text-gray-900">
                    {product[0].name}
                  </Text>
                </View>

                <Rating rating={4.8} amountOfReviews={320} />
              </View>

              <View className="mt-5 flex-row items-baseline">
                <Text className="text-3xl font-medium text-gray-900">
                  R$ {product[0].price}
                </Text>
                <Text className="text-base font-medium text-gray-600">/kg</Text>
              </View>
            </View>

            <View className="mt-9 px-6">
              <View className="mb-3 flex-row items-center justify-between">
                <Text className="text-base font-medium text-gray-700">
                  Comprando de
                </Text>
                <TouchableOpacity>
                  <Text className="text-base font-normal text-orange-500">
                    Alterar mercado
                  </Text>
                </TouchableOpacity>
              </View>

              <SelectedMarket
                name="Mercado São Jorge"
                distance={2.48}
                previewUrl="https://i.ibb.co/Fw0L1LJ/mercado-3.webp"
                isTheBestPriceOption
              />
            </View>

            <View className="mt-6">
              <View className="mb-3 flex-row items-center justify-between px-6">
                <Text className="text-base font-medium text-gray-700">
                  Disponível em
                </Text>
              </View>

              <FlatList
                data={data}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <Market data={item} />}
                contentContainerStyle={{ paddingHorizontal: 24 }}
                ItemSeparatorComponent={() => <View className="ml-1 mr-1" />}
                horizontal
                showsHorizontalScrollIndicator={false}
              />
            </View>

            <View className="mt-10 px-6 pb-52">
              <View className="mb-3 flex-row items-center justify-between">
                <Text className="text-lg font-medium text-gray-700">
                  Descrição
                </Text>
              </View>

              <Text className="text-base font-normal leading-relaxed text-gray-700">
                Lorem ipsum dolor sit amet consectetur. Eget amet ultrices in
                metus ultrices duis. Eget in amet ultricies integer nullam
                augue. Ultricies varius adipiscing semper aliquam. Sed dictumst
                lectus semper amet sociis pulvinar tellus. Ipsum tellus
                adipiscing risus porta est convallis est orci posuere.
              </Text>
            </View>
          </ScrollView>

          <View className="absolute bottom-20 w-full px-6">
            <View className="flex-row space-x-3 rounded-md bg-gray-200 px-3 py-3">
              <TouchableOpacity
                className="h-14 flex-1 items-center justify-center rounded-md bg-green-500"
                onPress={handleAddProductToCart}
              >
                <Text className="text-base font-medium text-gray-100">
                  Adicionar ao carrinho
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
    </>
  )
}
