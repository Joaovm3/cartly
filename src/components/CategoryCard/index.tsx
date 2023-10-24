import {
  TouchableOpacity,
  TouchableOpacityProps,
  Text,
  View,
} from 'react-native'
import Feather from '@expo/vector-icons/Feather'

interface CategoryCardProps extends TouchableOpacityProps {
  categoryId: number
  title: string
  icon: keyof typeof Feather.glyphMap
  onCategoryPress: (id: number) => void
}

export function CategoryCard({
  categoryId,
  title,
  icon,
  onCategoryPress,
  ...rest
}: CategoryCardProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      className="flex-1 rounded-md bg-gray-200 p-4"
      onPress={() => onCategoryPress(categoryId)}
      {...rest}
    >
      <Text className="text-base font-medium text-gray-900">{title}</Text>
      <View className="items-end opacity-5">
        <Feather name={icon} size={64} />
      </View>
    </TouchableOpacity>
  )
}
