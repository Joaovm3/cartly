import { CartContext, CartProduct } from "@contexts/CartContext";
import { useContext } from "react";
import { SectionList, View, Text } from "react-native";
import { CartItem } from "./CartItem";

type SectionListDataType = {
  title: string;
  data: CartProduct[];
};

export function CartProductList() {
  const {
    products,
    removeProductFromCart,
    increaseProductAmount,
    decreaseProductAmount,
  } = useContext(CartContext);

  const productsCategories = [
    ...new Set(products.map((product) => product.product.category)),
  ].sort();
  const cartData = productsCategories.reduce((arr, category) => {
    const categoryProducts = products.filter(
      (product) => product.product.category === category
    );

    return [
      ...arr,
      {
        title: category,
        data: categoryProducts,
      },
    ];
  }, [] as SectionListDataType[]);

  function handleRemoveProductFromCart(cartProductId: string) {
    removeProductFromCart(cartProductId);
  }

  function handleIncreaseProductAmount(cartProductId: string) {
    increaseProductAmount(cartProductId);
  }

  function handleDecreaseProductAmount(cartProductId: string) {
    decreaseProductAmount(cartProductId);
  }

  return (
    <SectionList
      sections={cartData}
      keyExtractor={(item) => item.id}
      renderSectionHeader={({ section }) => (
        <Text className="text-base text-gray-900 font-medium -mb-3">
          {section.title}
        </Text>
      )}
      renderItem={({ item }) => (
        <CartItem
          data={item}
          onRemoveProduct={handleRemoveProductFromCart}
          onIncreaseProductAmount={handleIncreaseProductAmount}
          onDecreaseProductAmount={handleDecreaseProductAmount}
        />
      )}
      SectionSeparatorComponent={() => <View className="mb-6"></View>}
      ItemSeparatorComponent={() => <View className="mt-2 mb-2" />}
      scrollEnabled={false}
    />
  );
}
