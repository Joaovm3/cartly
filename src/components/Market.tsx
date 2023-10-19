import { View, Text, Image } from 'react-native'

type MarketType = {
  name: string
  distanceFormatted: string
  previewURL: string
}

interface MarketProps {
  data: MarketType
}

export function Market({ data }: MarketProps) {
  return (
    <View className="flex-row space-x-3 rounded-md bg-gray-200 px-4 py-3">
      <View className="h-16 w-16 overflow-hidden rounded-sm">
        <Image
          source={{ uri: data.previewURL }}
          className="h-full w-full"
          resizeMode="cover"
        />
      </View>
      <View>
        <Text className="text-base leading-relaxed text-gray-700">
          {data.name}
        </Text>
        <Text className="text-sm leading-relaxed text-gray-400">
          {data.distanceFormatted} de você
        </Text>
      </View>
    </View>
  )
}
