import { createStackNavigator } from '@react-navigation/stack';
import { Cart } from '@screens/Cart';

const CartStack = createStackNavigator();

export function CartStackScreen () {
  return (
    <CartStack.Navigator
      screenOptions={{
        headerTitle: '',
        cardStyle: {
          backgroundColor: "white"
        }
      }}
    >
      <CartStack.Screen name="cart" component={Cart}/>
      {/* <CartStack.Screen name="Checkout" component={CheckoutScreen} /> */}
      {/* ... outros screens relacionados ao carrinho */}
    </CartStack.Navigator>
  );
}
