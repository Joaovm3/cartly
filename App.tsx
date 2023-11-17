import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { StatusBar } from 'expo-status-bar'
import { NavigationContainer } from '@react-navigation/native'

import { Routes } from '@routes/index'
import Toast from 'react-native-toast-message'
import { NotifierWrapper, Notifier } from 'react-native-notifier'
import 'moment/locale/pt-br'
import {
  QuerySnapshot,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from 'firebase/firestore'
import { ordersRef } from '@db/firebaseConfig'
import { useEffect } from 'react'
import { OrderStatus } from '@utils/order-status.enum'
import { CheckoutData } from '@screens/Checkout'

const queryClient = new QueryClient()

export default function App() {
  useEffect(() => {
    const completedUnreadOrders = query(
      ordersRef,
      where('status', '==', OrderStatus.PROCESSED),
      where('read', '==', false),
    )

    const unsub = onSnapshot(completedUnreadOrders, onResult, onError)
    return () => unsub()
  }, [])

  function onResult(snapshot: QuerySnapshot) {
    const list: CheckoutData[] = []
    snapshot.docs.forEach((doc) => {
      list.push({ ...doc.data(), id: doc.id } as CheckoutData)
    })

    list.forEach((l) => {
      showNotification(l)
    })
  }

  function onError(e) {
    console.error(e)
  }

  function showNotification(doc: CheckoutData) {
    const TITLE_COLOR = 'white'
    const DESCRIPTION_COLOR = TITLE_COLOR
    const BACKGROUND_COLOR = '#4CB944'

    Notifier.showNotification({
      title: 'Pedido confirmado!',
      description: `Olá, seu pedido ${doc.id} foi despachado e logo será entregue.`,
      duration: 5000,
      // duration: 0,
      showAnimationDuration: 800,
      // onHidden: () => readNotification(doc),
      onPress: () => readNotification(doc),
      hideOnPress: false,
      componentProps: {
        containerStyle: {
          marginTop: 25,
          backgroundColor: BACKGROUND_COLOR,
        },
        titleStyle: {
          color: TITLE_COLOR,
        },
        descriptionStyle: {
          color: DESCRIPTION_COLOR,
        },
      },
    })
  }

  async function readNotification(data: CheckoutData) {
    if (data?.read) {
      return
    }

    const refDoc = doc(ordersRef, data.id)
    data.read = true
    data.status = OrderStatus.COMPLETED

    await updateDoc(refDoc, data as any)
  }

  return (
    <NavigationContainer>
      <StatusBar translucent />

      <QueryClientProvider client={queryClient}>
        <GestureHandlerRootView className="flex-1">
          <NotifierWrapper>
            <Routes />
          </NotifierWrapper>
        </GestureHandlerRootView>
      </QueryClientProvider>

      <Toast />
    </NavigationContainer>
  )
}
