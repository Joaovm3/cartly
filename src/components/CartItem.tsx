import { Text, View, Image, TouchableOpacity } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { useMemo } from "react";
import { currencyFormatter } from "@utils/formatter";

export interface CartItemProps {
  data: {
    id: string;
    product: {
      name: string;
      brand: string;
      category: string;
      price: number;
    };
    amount: number;
  };
  onRemoveProduct: (cartProductId: string) => void;
  onIncreaseProductAmount: (cartProductId: string) => void;
  onDecreaseProductAmount: (cartProductId: string) => void;
}

export function CartItem({
  data: { product, amount, id },
  onRemoveProduct,
  onIncreaseProductAmount,
  onDecreaseProductAmount,
}: CartItemProps) {
  const priceFormatted = useMemo(
    () => currencyFormatter(product.price),
    [product]
  );

  const isProductAmountLessOrEqualToOne = amount <= 1;

  function handleRemoveProduct() {
    onRemoveProduct(id);
  }

  function handleIncreaseAmount() {
    onIncreaseProductAmount(id);
  }

  function handleDecreaseAmount() {
    onDecreaseProductAmount(id);
  }

  return (
    <View className="flex-row space-x-4">
      <View className="w-24 h-24 rounded-md overflow-hidden">
        <Image
          source={{ uri: "http://github.com/gabrielvbauer.png" }}
          className="w-full h-full"
        />
      </View>

      <View className="flex-1 justify-between">
        <View className="flex-row items-start justify-between">
          <View>
            <Text className="text-lg text-gray-900 font-medium">
              {product.name}
            </Text>
            <Text className="text-sm text-gray-600">{product.brand}</Text>
          </View>
          <TouchableOpacity onPress={handleRemoveProduct}>
            <Feather name="trash-2" size={22} color={"#DB2B39"} />
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center justify-between">
          <Text className="text-xl text-gray-900 font-medium">
            R$ {priceFormatted}
          </Text>
          <View className="flex-row items-center border-2 rounded-md border-gray-400 space-x-2">
            <TouchableOpacity
              className="w-9 h-9 items-center justify-center"
              onPress={handleDecreaseAmount}
              disabled={isProductAmountLessOrEqualToOne}
            >
              <Feather name="minus" size={18} />
            </TouchableOpacity>
            <Text className="text-base text-gray-900 font-medium">
              {amount}
            </Text>
            <TouchableOpacity
              className="w-9 h-9 items-center justify-center"
              onPress={handleIncreaseAmount}
            >
              <Feather name="plus" size={18} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
