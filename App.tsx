import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { StatusBar } from 'expo-status-bar'
import { NavigationContainer } from '@react-navigation/native'

import { Routes } from '@routes/index'
import Toast from 'react-native-toast-message'

const queryClient = new QueryClient()

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar translucent />

      <QueryClientProvider client={queryClient}>
        <GestureHandlerRootView className="flex-1">
          <Routes />
        </GestureHandlerRootView>
      </QueryClientProvider>

      <Toast />
    </NavigationContainer>
  )
}
