import Feather from '@expo/vector-icons/Feather'
import { View, Text } from 'react-native'

interface QuickAccessProps {
  title: string
  icon?: string
}

export function QuickAccess({ title }: QuickAccessProps) {
  return (
    <View className="w-20 items-center space-y-1">
      <View className="flex h-16 w-16 items-center justify-center rounded-full bg-orange-500">
        <Feather name="activity" size={18} color="#FFF" />
      </View>
      <Text className="text-center text-sm leading-snug text-gray-700">
        {title}
      </Text>
    </View>
  )
}
