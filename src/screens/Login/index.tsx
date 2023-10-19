import { ParamListBase, useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import Feather from '@expo/vector-icons/Feather'

export function Login() {
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

  return (
    <View className="h-screen items-center justify-center">
      <View className="w-full px-4">
        <View>
          <Text className="text-3xl text-gray-900">Login</Text>

          <Text className="text-lg text-gray-600">Entre na sua conta</Text>
        </View>

        <View className="mb-8 mt-10">
          <View className="space-y-4">
            <TextInput
              className="h-14 rounded-md bg-gray-200 pl-4 placeholder:text-base placeholder:text-gray-600"
              placeholder="Email"
              cursorColor="#4CB944"
            />

            <TextInput
              className="h-14 rounded-md bg-gray-200 pl-4 placeholder:text-base placeholder:text-gray-600"
              placeholder="Senha"
              cursorColor="#4CB944"
            />
          </View>

          <TouchableOpacity onPress={() => console.log('esqueci minha senha')}>
            <Text className="my-3 text-right text-gray-400">
              Esqueci minha senha
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="rounded-md bg-green-500"
            onPress={handleSignIn}
            activeOpacity={0.7}
          >
            <Text className="p-4 text-center text-lg text-gray-100">
              {' '}
              Entrar{' '}
            </Text>
          </TouchableOpacity>
          {/* <Button title="Entrar" onPress={handleSignIn} /> */}
        </View>
      </View>

      <View>
        <View>
          <Text className="text-center"> Ou entre com </Text>
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
          <TouchableWithoutFeedback onPress={() => console.log('registre-se')}>
            <Text className="text-green-500 underline">Registre-se</Text>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </View>
  )
}
