import { useState, useEffect } from 'react'
import { Text, View } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'

import {
  onSnapshot,
  QuerySnapshot,
  Timestamp,
  updateDoc,
  doc,
  query,
  where,
} from 'firebase/firestore'
import { SafeAreaView } from 'react-native-safe-area-context'
import Feather from '@expo/vector-icons/Feather'
import { ordersRef } from '@db/firebaseConfig'
import { CheckoutData } from '@screens/Checkout'
import moment from 'moment'
import { OrderStatus } from '@utils/order-status.enum'

export interface NotificationInterface {
  id: number
  orderId: number
  read: boolean
  createdAt: Timestamp
  status: string
  title: string
  subtitle: string
}

export function Notification() {
  const [notifications, setNotifications] = useState<CheckoutData[]>([])

  useEffect(() => {
    const q = query(ordersRef, where('createdAt', '!=', null))
    const unsub = onSnapshot(q, onResult, onError)
    return () => unsub()
  }, [])

  function onResult(snapshot: QuerySnapshot) {
    const list: CheckoutData[] = []
    snapshot.docs.forEach((doc) => {
      list.push({ ...doc.data(), id: doc.id } as CheckoutData)
    })

    list.sort((a, b) =>
      moment(b.updatedAt?.toDate(), 'DD-MM-YYYY').diff(
        moment(a.updatedAt?.toDate(), 'DD-MM-YYYY'),
      ),
    )

    setNotifications(list)
  }

  function onError(e) {
    console.error(e)
    setNotifications([])
  }

  async function readNotificationOnPress(data: CheckoutData) {
    // if (data.read) {
    //   return
    // }

    const refDoc = doc(ordersRef, data.id)
    data.read = !data.read
    data.status = OrderStatus.COMPLETED

    await updateDoc(refDoc, data as any)
  }

  const capitalize = (word: string) =>
    word.charAt(0).toUpperCase() + word.slice(1)
  const timeString = (date = new Date()) => capitalize(moment(date).fromNow())

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text className="p-2 text-2xl font-medium leading-relaxed">
          Notificações
        </Text>

        <View className="pt-8">
          {notifications.map((notification, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => readNotificationOnPress(notification)}
            >
              {notification.status === OrderStatus.COMPLETED && (
                <View
                  className={`m-2 space-y-4 rounded-md ${
                    notification.read ? 'bg-gray-100' : 'bg-gray-200'
                  } p-4`}
                >
                  <View className="flex-row items-center">
                    <View className="pr-2">
                      <Feather
                        name={notification.read ? 'check' : 'truck'}
                        size={20}
                        color="#4CB944"
                      />
                    </View>
                    <View className="flex-1">
                      <View className="flex-row justify-between">
                        <Text className="text-base font-semibold leading-relaxed">
                          Pedido confirmado!
                        </Text>
                        <Text>
                          {timeString(notification.updatedAt?.toDate())}
                        </Text>
                      </View>
                      <Text className="text-sm leading-4 text-gray-600">
                        Seus itens do pedido {notification.orderId} foram
                        coletados e logo serão entregues!
                      </Text>
                    </View>
                  </View>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
