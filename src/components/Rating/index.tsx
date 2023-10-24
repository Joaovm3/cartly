import { View, Text } from 'react-native'
import Feather from '@expo/vector-icons/Feather'
import { THEME } from '@theme/index'

interface RatingProps {
  rating: number
  amountOfReviews: number
}

export function Rating({ rating, amountOfReviews }: RatingProps) {
  return (
    <View className="flex-row items-center space-x-2 rounded-full bg-gray-200 px-3 py-1">
      <Feather name="star" size={18} color={THEME.COLORS.WARNING_LIGHT} />
      <Text className="text-base font-medium text-orange-500">
        {rating} ({amountOfReviews})
      </Text>
    </View>
  )
}
