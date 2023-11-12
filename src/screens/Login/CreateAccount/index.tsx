import { Text, TextInput, TouchableOpacity, View } from 'react-native'

export function CreateAccount() {
  const handleCreateAccount = () => {
    console.log('criar minha conta')
  }

  return (
    <View className="h-screen items-center justify-end">
      <View className="w-full px-4">
        <View>
          <Text className="text-3xl text-gray-900">Criar conta</Text>
        </View>

        <View className="mb-8 mt-10">
          <View className="space-y-4">
            <TextInput
              className="h-14 rounded-md bg-gray-200 pl-4 placeholder:text-base placeholder:text-gray-600"
              placeholder="Nome"
              cursorColor="#4CB944"
            />

            <TextInput
              className="h-14 rounded-md bg-gray-200 pl-4 placeholder:text-base placeholder:text-gray-600"
              placeholder="Email"
              secureTextEntry
              autoCorrect={false}
              cursorColor="#4CB944"
            />

            <TextInput
              className="h-14 rounded-md bg-gray-200 pl-4 placeholder:text-base placeholder:text-gray-600"
              placeholder="Senha"
              secureTextEntry
              autoCorrect={false}
              cursorColor="#4CB944"
            />

            <TextInput
              className="h-14 rounded-md bg-gray-200 pl-4 placeholder:text-base placeholder:text-gray-600"
              placeholder="Confirme sua senha"
              cursorColor="#4CB944"
            />
          </View>

          <TouchableOpacity
            className="mt-16 rounded-md bg-green-500"
            onPress={handleCreateAccount}
            activeOpacity={0.7}
          >
            <Text className="p-4 text-center text-lg text-gray-100">
              Criar minha conta
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
