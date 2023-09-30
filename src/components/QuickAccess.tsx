import { View, Text } from "react-native";

interface QuickAccessProps {
  title: string;
}

export function QuickAccess({ title }: QuickAccessProps) {
  return (
    <View className="w-20 items-center space-y-1">
      <View className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center"></View>
      <Text className="text-center text-gray-700 text-sm leading-snug">
        {title}
      </Text>
    </View>
  );
}
