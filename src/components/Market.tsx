import { View, Text, Image } from "react-native";

type MarketType = {
  name: string;
  distanceFormatted: string;
  previewURL: string;
};

interface MarketProps {
  data: MarketType;
}

export function Market({ data }: MarketProps) {
  return (
    <View className="flex-row space-x-3 px-4 py-3 bg-gray-200 rounded-md">
      <View className="w-16 h-16 rounded-sm overflow-hidden">
        <Image
          source={{ uri: data.previewURL }}
          className="w-full h-full"
          resizeMode="cover"
        />
      </View>
      <View>
        <Text className="text-base text-gray-700 leading-relaxed">
          {data.name}
        </Text>
        <Text className="text-sm text-gray-400 leading-relaxed">
          {data.distanceFormatted} de você
        </Text>
      </View>
    </View>
  );
}
