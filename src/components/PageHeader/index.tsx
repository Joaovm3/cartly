import { View, TouchableOpacity } from 'react-native'
import Feather from '@expo/vector-icons/Feather'
import { useNavigation } from '@react-navigation/native'

interface PageHeadeProps {
  rightButtonIcon?: keyof typeof Feather.glyphMap
  onPressRightButton?: () => void
}

export function PageHeader({
  rightButtonIcon,
  onPressRightButton,
}: PageHeadeProps) {
  const navigation = useNavigation()

  function handleGoBack() {
    navigation.goBack()
  }

  return (
    <View className="mt-4 flex-1 flex-row justify-between">
      <TouchableOpacity className="p-2" onPress={handleGoBack}>
        <Feather name="arrow-left" size={24} color={'#29292E'} />
      </TouchableOpacity>
      {rightButtonIcon && (
        <TouchableOpacity className="p-2" onPress={onPressRightButton}>
          <Feather name={rightButtonIcon} size={24} color={'#29292E'} />
        </TouchableOpacity>
      )}
    </View>
  )
}
