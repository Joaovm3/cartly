import { useState, useEffect } from 'react'
import { View, Image, TouchableOpacity, Text } from 'react-native'
import Feather from '@expo/vector-icons/Feather'
import { useDrawerNavigation } from '@hooks/useDrawerNavigation'
import { AppStackNavigatorProps } from '@routes/app.stack.routes'
import { useNavigation } from '@react-navigation/native'
import { QuerySnapshot, onSnapshot, query, where } from 'firebase/firestore'
import { ordersRef } from '@db/firebaseConfig'

export function Header() {
  const [notificationCounter, setNotificationCounter] = useState<number>(0)

  useEffect(() => {
    const unreadNotifications = query(ordersRef, where('read', '==', false))
    const unsub = onSnapshot(unreadNotifications, onResult, onError)

    return () => unsub()
  }, [])

  function onResult(snapshot: QuerySnapshot) {
    setNotificationCounter(snapshot.size)
  }

  function onError(e) {
    console.error(e)
    setNotificationCounter(0)
  }

  const navigation = useNavigation<AppStackNavigatorProps>()
  const { openDrawer } = useDrawerNavigation()

  function handleOpenDrawer() {
    openDrawer()
  }

  function handleOpenCart() {
    navigation.navigate('cart')
  }

  function handleOpenNotifications() {
    navigation.navigate('notifications')
  }

  return (
    <View className="flex-row items-center justify-between px-6 ">
      <TouchableOpacity onPress={handleOpenDrawer}>
        <Image
          source={{ uri: 'https://github.com/gabrielvbauer.png' }}
          width={48}
          height={48}
          className="rounded-full"
        />
      </TouchableOpacity>
      <View className="flex-row gap-3">
        <TouchableOpacity
          onPress={handleOpenCart}
          className="h-12 w-12 items-center justify-center rounded-lg bg-gray-200"
        >
          <Feather name="shopping-cart" size={18} color="#737380" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleOpenNotifications}
          className="h-12 w-12 items-center justify-center rounded-lg bg-gray-200"
        >
          {notificationCounter > 0 && (
            <View className="absolute right-0 top-0 h-5 w-5 items-center justify-center rounded-full bg-green-500">
              <Text className="text-xs text-white">{notificationCounter}</Text>
            </View>
          )}
          <View className="relative">
            <Feather name="bell" size={18} color="#737380" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}
