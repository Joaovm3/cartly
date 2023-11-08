import { ParamListBase, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  Button,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import Feather from "@expo/vector-icons/Feather";
import { useState } from "react";

export function Login() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  const handleSignIn = () => {
    console.log("logado");
    navigation.navigate("home");
  };

  const handleFacebook = () => {
    handleSignIn(); // TODO: Implementar login social
  };

  const handleGoogle = () => {
    handleSignIn(); // TODO: Implementar login social
  };

  const handleRegister = () => {
    navigation.navigate("create-account");
  };

  const handleForgotPassword = () => {
    navigation.navigate("forgot-password");
  };

  const onKeyPress = (data: any) => {
    if (data.nativeEvent.key === "Backspace") {
      setPassword(password.slice(0, -1));
      return;
    }

    if (data.nativeEvent.key === "Enter") {
      // On Enter handle here
      return;
    }

    if (data.nativeEvent.key === " ") {
      setPassword(password + " ");
      return;
    }

    if (data.nativeEvent.key === "Tab") {
      // On Tab handle here
      return;
    }

    setPassword(password + data.nativeEvent.key);
  };

  return (
    <View className="h-screen items-center justify-end py-11 bg-white">
      <View className="w-full px-4">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View>
              <Text className="text-3xl text-gray-900">Login</Text>

              <Text className="text-lg text-gray-600">Entre na sua conta</Text>
            </View>

            <View className="mt-10 mb-8">
              <View className="space-y-4">
                <View>
                  <TextInput
                    className="h-14 bg-gray-200 rounded-md pl-4 placeholder:text-gray-600 placeholder:text-base"
                    placeholder="Email"
                    cursorColor="#4CB944"
                  />
                </View>

                <View>
                  <TextInput
                    className="h-14 bg-gray-200 rounded-md pl-4 placeholder:text-gray-600 placeholder:text-base"
                    placeholder="Senha"
                    secureTextEntry
                    autoCorrect={false}
                    cursorColor="#4CB944"
                    value={"*".repeat(password.length)} // This is important.
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
                className="bg-green-500 rounded-md"
                onPress={handleSignIn}
                activeOpacity={0.7}
              >
                <Text className="text-center text-gray-100 p-4 text-lg">
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
          <Text className="text-center font-semi  bold"> Ou entre com </Text>
          <View className="flex-row justify-between my-3">
            {/* <Button title="Facebook" onPress={handleFacebook} />
            <Button title="Google" onPress={handleGoogle} /> */}

            <TouchableOpacity
              onPress={handleFacebook}
              className="w-16 h-16 bg-gray-200 items-center justify-center rounded-lg"
            >
              <Feather name="shopping-cart" size={18} color="#737380" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleGoogle}
              className="w-16 h-16 bg-gray-200 items-center justify-center rounded-lg"
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
  );
}
