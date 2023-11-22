import { View, TouchableOpacity, Image, Text } from 'react-native'
import Feather from '@expo/vector-icons/Feather'
import { useNavigation } from '@react-navigation/core'
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer'
import { ParamListBase } from '@react-navigation/routers'
import { StackNavigationProp } from '@react-navigation/stack'
import { useAuth } from '@hooks/useAuth'

export function Drawer(props: DrawerContentComponentProps) {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>()

  const { logout } = useAuth()

  return (
    <View className="flex-1">
      <View className="ml-3 mt-10 flex-row items-center space-x-3">
        <Image
          source={{ uri: 'https://github.com/joaovm3.png' }}
          width={64}
          height={64}
          className="rounded-full"
        />
        <Text className="font-semibold"> Olá, John </Text>
      </View>

      <DrawerContentScrollView {...props}>
        <View>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>

      <TouchableOpacity onPress={() => logout()} activeOpacity={0.7}>
        <View className="mx-2 mb-12 flex-row rounded-md bg-gray-200 px-2 py-4">
          <Feather name="log-out" size={18} color="#DB2B39" />
          <Text className="ml-2 font-semibold text-red-500">Sair</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}
