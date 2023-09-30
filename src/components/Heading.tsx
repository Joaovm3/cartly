import { Text } from "react-native";

interface HeadingProps {
  children: React.ReactNode;
}

export function Heading({ children }: HeadingProps) {
  return (
    <Text className="text-base text-gray-900 leading-relaxed font-medium">
      {children}
    </Text>
  );
}
