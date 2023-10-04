import { useContext, useMemo } from "react";
import { ScrollView, SectionList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native-gesture-handler";

import BottomSheet from "@gorhom/bottom-sheet";

import { CartItem } from "@components/CartItem";
import { useNavigation } from "@react-navigation/native";

import Feather from "@expo/vector-icons/Feather";
import { CartContext, CartProduct } from "@contexts/CartContext";
import { AppCartStackNavigatorProps } from "@navigation/Cart/CartStack";

type SectionListDataType = {
  title: string;
  data: CartProduct[];
};

export function Cart() {
  const {
    products,
    removeProductFromCart,
    totalPriceFormatted,
    totalItems,
    increaseProductAmount,
    decreaseProductAmount,
  } = useContext(CartContext);

  const navigation = useNavigation<AppCartStackNavigatorProps>();
  const snapPoints = useMemo(() => [80, "22%"], []);

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

  function handleGoBack() {
    navigation.goBack();
  }

  function handleFinishBuying() {
    navigation.navigate("checkout");
  }

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
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView className="px-6">
        <TouchableOpacity className="p-2" onPress={handleGoBack}>
          <Feather name="arrow-left" size={24} color={"#29292E"} />
        </TouchableOpacity>

        <Text className="text-2xl font-medium leading-relaxed">Carrinho</Text>

        <View className="mt-5">
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
            contentContainerStyle={{
              paddingBottom: 200,
            }}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>

      <BottomSheet
        snapPoints={snapPoints}
        index={1}
        backgroundStyle={{
          backgroundColor: "#f8f8f8",
        }}
      >
        <View className="px-6 pb-8 justify-between h-full">
          <View className="flex-row items-center justify-between">
            <View className="flex-row space-x-4 items-center">
              <Text className="text-lg text-gray-900 font-medium">Total</Text>
              <Text className="text-sm text-gray-600">{totalItems} itens</Text>
            </View>

            <Text className="text-2xl text-gray-900 font-medium">
              R$ {totalPriceFormatted}
            </Text>
          </View>

          <TouchableOpacity
            className="h-14 w-full bg-green-500 rounded-md items-center justify-center"
            onPress={handleFinishBuying}
          >
            <Text className="text-base text-gray-100 font-medium">
              Finalizar compra
            </Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </SafeAreaView>
  );
}
