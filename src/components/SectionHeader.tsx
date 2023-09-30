import React from "react";
import { View, Pressable, Text } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { Heading } from "./Heading";

interface SectionHeaderProps {
  title: string;
}

export function SectionHeader({ title }: SectionHeaderProps) {
  return (
    <View className="flex-row justify-between px-6">
      <Heading>{title}</Heading>
      <Pressable className="flex-row items-center space-x-1">
        <Text className="text-gray-600">Ver mais</Text>
        <Feather name="arrow-right" size={20} color="#737380" />
      </Pressable>
    </View>
  );
}
