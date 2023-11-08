import { View, Text } from "react-native";

interface TitleProps {
  text: string;
}

function Title({ text }: TitleProps) {
  return (
    <View>
      <Text className="text-3xl text-gray-900">{text}</Text>
    </View>
  );
}

export default Title;
