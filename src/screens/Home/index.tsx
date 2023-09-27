import { Header } from "@components/Header";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export function Home() {
  return (
    <SafeAreaView className="h-screen bg-gray-100">
      <View className="pt-4">
        <Header />
      </View>
    </SafeAreaView>
  );
}
