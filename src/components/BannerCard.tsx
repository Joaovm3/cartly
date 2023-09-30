import { View, Image } from "react-native";
import PromotionImage from "@assets/promotion.png";

export function BannerCard() {
  return (
    <View className="bg-gray-400 rounded-md h-40 w-72 overflow-hidden">
      <Image
        source={PromotionImage}
        resizeMode="cover"
        className="w-full h-full"
      />
    </View>
  );
}
