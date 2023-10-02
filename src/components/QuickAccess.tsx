import Feather from "@expo/vector-icons/Feather";
import { View, Text } from "react-native";

interface QuickAccessProps {
  title: string;
  icon?: string;
}

export function QuickAccess({ title, icon }: QuickAccessProps) {
  return (
    <View className="w-20 items-center space-y-1">
      <View className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center">
        <Feather name="activity" size={18} color="#FFF" />
      </View>
      <Text className="text-center text-gray-700 text-sm leading-snug">
        {title}
      </Text>
    </View>
  );
}
