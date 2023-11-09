import { ParamListBase, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import Feather from "@expo/vector-icons/Feather";

export function CreateAccount() {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  const handleCreateAccount = () => {
    console.log("criar minha conta");
  };

  return (
    <View className="h-screen items-center justify-end">
      <View className="w-full px-4">
        <View>
          <Text className="text-3xl text-gray-900">Criar conta</Text>
        </View>

        <View className="mt-10 mb-8">
          <View className="space-y-4">
            <TextInput
              className="h-14 bg-gray-200 rounded-md pl-4 placeholder:text-gray-600 placeholder:text-base"
              placeholder="Nome"
              cursorColor="#4CB944"
            />

            <TextInput
              className="h-14 bg-gray-200 rounded-md pl-4 placeholder:text-gray-600 placeholder:text-base"
              placeholder="Email"
              secureTextEntry
              autoCorrect={false}
              cursorColor="#4CB944"
            />

            <TextInput
              className="h-14 bg-gray-200 rounded-md pl-4 placeholder:text-gray-600 placeholder:text-base"
              placeholder="Senha"
              secureTextEntry
              autoCorrect={false}
              cursorColor="#4CB944"
            />

            <TextInput
              className="h-14 bg-gray-200 rounded-md pl-4 placeholder:text-gray-600 placeholder:text-base"
              placeholder="Confirme sua senha"
              cursorColor="#4CB944"
            />
          </View>

          <TouchableOpacity
            className="bg-green-500 rounded-md mt-16"
            onPress={handleCreateAccount}
            activeOpacity={0.7}
          >
            <Text className="text-center text-gray-100 p-4 text-lg">
              Criar minha conta
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
