import { ParamListBase, useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import Feather from '@expo/vector-icons/Feather'
import { useState } from 'react'
import { useAuth } from '@hooks/useAuth'
import { useToast } from '@hooks/useToast'

export function Login() {
  const { showNotification } = useToast()
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')

  const { signIn } = useAuth()

  const navigation = useNavigation<StackNavigationProp<ParamListBase>>()

  const handleSignIn = () => {
    const isSignIn = signIn({
      email,
      password,
    })

    if (!isSignIn) {
      showNotification({
        title: 'Login inválido!',
        description: 'Usuário ou senha incorretos',
        type: 'danger',
      })
    }
  }

  const handleRegister = () => {
    navigation.navigate('create-account')
  }

  const handleForgotPassword = () => {
    navigation.navigate('forgot-password')
  }

  return (
    <View className="h-screen items-center justify-end bg-white py-11">
      <View className="w-full px-4">
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View>
              <Text className="text-3xl text-gray-900">Login</Text>

              <Text className="text-lg text-gray-600">Entre na sua conta</Text>
            </View>

            <View className="mb-8 mt-10">
              <View className="space-y-4">
                <View>
                  <TextInput
                    className="h-14 rounded-md bg-gray-200 pl-4 placeholder:text-base placeholder:text-gray-600"
                    placeholder="Email"
                    keyboardType="email-address"
                    cursorColor="#4CB944"
                    value={email}
                    onChangeText={setEmail}
                  />
                </View>

                <View>
                  <TextInput
                    className="h-14 rounded-md bg-gray-200 pl-4 placeholder:text-base placeholder:text-gray-600"
                    placeholder="Senha"
                    secureTextEntry
                    autoCorrect={false}
                    cursorColor="#4CB944"
                    value={password}
                    onChangeText={setPassword}
                  />
                </View>
              </View>
              <View className="flex-row justify-end">
                <TouchableOpacity onPress={handleForgotPassword}>
                  <Text className="my-3 mb-8 text-gray-400">
                    Esqueci minha senha
                  </Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                className="rounded-md bg-green-500"
                onPress={handleSignIn}
                activeOpacity={0.7}
              >
                <Text className="p-4 text-center text-lg text-gray-100">
                  Entrar
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </View>

      <View>
        <View>
          <Text className="font-semi bold  text-center"> Ou entre com </Text>
          <View className="my-3 flex-row justify-between">
            <TouchableOpacity
              onPress={handleSignIn}
              className="h-16 w-16 items-center justify-center rounded-lg bg-gray-200"
            >
              <Feather name="shopping-cart" size={18} color="#737380" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleSignIn}
              className="h-16 w-16 items-center justify-center rounded-lg bg-gray-200"
            >
              <Feather name="shopping-cart" size={18} color="#737380" />
            </TouchableOpacity>
          </View>
        </View>

        <View className="flex-row">
          <Text> Novo no app? </Text>
          <TouchableWithoutFeedback onPress={handleRegister}>
            <Text className="text-green-500 underline">Registre-se</Text>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </View>
  )
}
