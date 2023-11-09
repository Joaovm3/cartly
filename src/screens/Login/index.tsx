import { ParamListBase, useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import {
  Button,
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

export function Login() {
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')

  const navigation = useNavigation<StackNavigationProp<ParamListBase>>()

  const handleSignIn = () => {
    console.log('logado')
    navigation.navigate('Home')
  }

  const handleFacebook = () => {
    handleSignIn() // TODO: Implementar login social
  }

  const handleGoogle = () => {
    handleSignIn() // TODO: Implementar login social
  }

  const handleRegister = () => {
    navigation.navigate('create-account')
  }

  const handleForgotPassword = () => {
    navigation.navigate('forgot-password')
  }

  const onKeyPress = (data: any) => {
    if (data.nativeEvent.key === 'Backspace') {
      setPassword(password.slice(0, -1))
      return
    }

    if (data.nativeEvent.key === 'Enter') {
      // On Enter handle here
      return
    }

    if (data.nativeEvent.key === ' ') {
      setPassword(password + ' ')
      return
    }

    if (data.nativeEvent.key === 'Tab') {
      // On Tab handle here
      return
    }

    setPassword(password + data.nativeEvent.key)
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
                    cursorColor="#4CB944"
                  />
                </View>

                <View>
                  <TextInput
                    className="h-14 rounded-md bg-gray-200 pl-4 placeholder:text-base placeholder:text-gray-600"
                    placeholder="Senha"
                    secureTextEntry
                    autoCorrect={false}
                    cursorColor="#4CB944"
                    value={'*'.repeat(password.length)} // This is important.
                    onKeyPress={onKeyPress}
                  />
                </View>
                <Text>{password}</Text>
              </View>
              <View className="flex-row justify-end">
                <TouchableOpacity
                  onPress={handleForgotPassword}
                  className=" text-right"
                >
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
              {/* <Button title="Entrar" onPress={handleSignIn} /> */}
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </View>

      <View>
        <View>
          <Text className="font-semi bold  text-center"> Ou entre com </Text>
          <View className="my-3 flex-row justify-between">
            {/* <Button title="Facebook" onPress={handleFacebook} />
            <Button title="Google" onPress={handleGoogle} /> */}

            <TouchableOpacity
              onPress={handleFacebook}
              className="h-16 w-16 items-center justify-center rounded-lg bg-gray-200"
            >
              <Feather name="shopping-cart" size={18} color="#737380" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleGoogle}
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
