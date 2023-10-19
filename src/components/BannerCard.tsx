import { View, Image } from 'react-native'
import PromotionImage from '@assets/promotion.png'

export function BannerCard() {
  return (
    <View className="h-40 w-72 overflow-hidden rounded-md bg-gray-400">
      <Image
        source={PromotionImage}
        resizeMode="cover"
        className="h-full w-full"
      />
    </View>
  )
}
