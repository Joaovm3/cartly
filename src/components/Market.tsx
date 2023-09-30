import { View, Text, Image } from "react-native";

export function Market() {
  return (
    <View className="flex-row space-x-3 px-4 py-3 bg-gray-200 rounded-md">
      <View className="w-16 h-16 rounded-sm overflow-hidden">
        <Image
          source={{ uri: "https://github.com/gabrielvbauer.png" }}
          className="w-full h-full"
          resizeMode="cover"
        />
      </View>
      <View>
        <Text className="text-base text-gray-700 leading-relaxed">
          Mercado xpto
        </Text>
        <Text className="text-sm text-gray-400 leading-relaxed">
          2.48km de você
        </Text>
      </View>
    </View>
  );
}
