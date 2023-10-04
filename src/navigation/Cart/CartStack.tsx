import {
  StackNavigationProp,
  createStackNavigator,
} from "@react-navigation/stack";
import { Cart } from "@screens/Cart";
import { Checkout } from "@screens/Checkout";

export type StackRoutes = {
  cart: undefined;
  checkout: undefined;
};

export type AppCartStackNavigatorProps = StackNavigationProp<StackRoutes>;

const CartStack = createStackNavigator<StackRoutes>();

export function CartStackScreen() {
  return (
    <CartStack.Navigator
      screenOptions={{
        headerTitle: "",
        cardStyle: {
          backgroundColor: "white",
        },
      }}
    >
      <CartStack.Screen name="cart" component={Cart} />
      <CartStack.Screen name="checkout" component={Checkout} />
      {/* ... outros screens relacionados ao carrinho */}
    </CartStack.Navigator>
  );
}
