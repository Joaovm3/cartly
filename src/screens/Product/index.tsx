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

const data = [
  {
    id: 1,
    name: 'Mercado Leopoldo',
    distance: 300,
    distanceFormatted: '300m',
    previewURL: 'https://github.com/gabrielvbauer.png',
  },
  {
    id: 2,
    name: 'Mercado Família',
    distance: 1400,
    distanceFormatted: '1.4km',
    previewURL: 'https://github.com/gabrielvbauer.png',
  },
  {
    id: 3,
    name: 'Copral',
    distance: 2480,
    distanceFormatted: '2.48km',
    previewURL: 'https://github.com/gabrielvbauer.png',
  },
]

export function Product() {
  return (
    <>
      <ScrollView className="flex-1 bg-gray-100">
        <ImageBackground
          source={{
            uri: 'https://github.com/gabrielvbauer.png',
          }}
          className="h-96"
        >
          <View className="mt-14 flex-row items-center justify-between px-6">
            <TouchableOpacity>
              <Feather name="arrow-left" color={THEME.COLORS.WHITE} size={24} />
            </TouchableOpacity>

            <View className="flex-row items-center space-x-4">
              <TouchableOpacity>
                <Feather name="heart" color={THEME.COLORS.WHITE} size={24} />
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
              <Text className="text-sm font-medium text-gray-600">Moça</Text>
              <Text className="text-xl font-medium text-gray-900">
                Leite Condensado
              </Text>
            </View>

            <Rating rating={4.8} amountOfReviews={320} />
          </View>

          <View className="mt-5 flex-row items-baseline">
            <Text className="text-3xl font-medium text-gray-900">R$ 34,99</Text>
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
            previewUrl="https://github.com/gabrielvbauer.png"
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

        <View className="mt-10 px-6">
          <View className="mb-3 flex-row items-center justify-between">
            <Text className="text-lg font-medium text-gray-700">Descrição</Text>
          </View>

          <Text className="text-base font-normal leading-relaxed text-gray-700">
            Lorem ipsum dolor sit amet consectetur. Eget amet ultrices in metus
            ultrices duis. Eget in amet ultricies integer nullam augue.
            Ultricies varius adipiscing semper aliquam. Sed dictumst lectus
            semper amet sociis pulvinar tellus. Ipsum tellus adipiscing risus
            porta est convallis est orci posuere.
          </Text>
        </View>
      </ScrollView>

      <View className="absolute bottom-20 w-full px-6">
        <View className="flex-row space-x-3 rounded-md bg-gray-200 px-3 py-3">
          <TouchableOpacity className="h-14 flex-1 items-center justify-center rounded-md bg-green-500">
            <Text className="text-base font-medium text-gray-100">
              Adicionar ao carrinho
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  )
}
