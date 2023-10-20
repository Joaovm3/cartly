import { TouchableOpacity, TouchableOpacityProps, Text } from 'react-native'
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
      className="relative h-28 flex-1 rounded-md bg-gray-200 p-4"
      onPress={() => onCategoryPress(categoryId)}
      {...rest}
    >
      <Text className="text-base font-medium text-gray-900">{title}</Text>
      <Feather
        name={icon}
        className="absolute bottom-0 left-0 right-0 opacity-5"
        size={80}
      />
    </TouchableOpacity>
  )
}
