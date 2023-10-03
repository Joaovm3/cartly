import { createContext, useMemo, useState } from "react";

type CartProduct = {
  id: string;
  product: {
    id: string;
    name: string;
    brand: string;
    price: string;
  };
  amount: number;
  productTotalPrice: number;
};

type Cart = {
  products: CartProduct[];
  totalPrice: number;
  addProductToCart: (product: CartProduct) => void;
  removeProductFromCart: (productId: string) => void;
};

interface CartContextProvderProps {
  children: React.ReactNode;
}

export const CartContext = createContext({} as Cart);

export function CartContextProvider({ children }: CartContextProvderProps) {
  const [products, setProducts] = useState<CartProduct[]>([]);

  const totalPrice = useMemo(() => {
    return products.reduce(
      (accumulatedPrice, currentProduct) =>
        accumulatedPrice + currentProduct.productTotalPrice,
      0
    );
  }, [products]);

  function addProductToCart(product: CartProduct) {
    const newProductList = [...products, product];
    setProducts(newProductList);
  }

  function removeProductFromCart(productId: string) {
    const cartWithoutProductToBeRemoved = products.filter(
      (product) => product.id !== productId
    );
    setProducts(cartWithoutProductToBeRemoved);
  }

  return (
    <CartContext.Provider
      value={{
        products,
        totalPrice,
        addProductToCart,
        removeProductFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
