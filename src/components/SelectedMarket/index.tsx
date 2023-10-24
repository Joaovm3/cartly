import { Image, Text, View } from 'react-native'

interface SelectedMarketProps {
  name: string
  distance: number
  previewUrl: string
  isTheBestPriceOption?: boolean
}

export function SelectedMarket({
  name,
  distance,
  previewUrl,
  isTheBestPriceOption = false,
}: SelectedMarketProps) {
  return (
    <View className="flex-row items-start space-x-3 rounded-md bg-green-500 px-4 py-3">
      <Image source={{ uri: previewUrl }} className="h-16 w-16 rounded-sm" />
      <View>
        <Text className="w-full text-base font-semibold text-gray-200">
          {name}
        </Text>
        <Text className="text-sm text-gray-100">{distance}km de você</Text>
      </View>

      {isTheBestPriceOption && (
        <View className="rounded-sm bg-orange-500 px-2 py-[2]">
          <Text className="text-xs font-medium text-gray-200">
            Melhor preço
          </Text>
        </View>
      )}
    </View>
  )
}
