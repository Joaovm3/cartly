import { currencyFormatter } from '@utils/formatter'
import { createContext, useMemo, useState } from 'react'

export type CartProduct = {
  id: string
  product: {
    id: string
    name: string
    brand: string
    category: string
    price: number
  }
  amount: number
  productTotalPrice: number
}

type Cart = {
  products: CartProduct[]
  totalItems: number
  totalPrice: number
  totalPriceFormatted: string
  addProductToCart: (product: CartProduct) => void
  removeProductFromCart: (productId: string) => void
  increaseProductAmount: (cartProductId: string) => void
  decreaseProductAmount: (cartProductId: string) => void
}

interface CartContextProvderProps {
  children: React.ReactNode
}

export const CartContext = createContext({} as Cart)

export function CartContextProvider({ children }: CartContextProvderProps) {
  const [products, setProducts] = useState<CartProduct[]>(productsMock)

  const totalPrice = useMemo(() => {
    return products.reduce(
      (accumulatedPrice, currentProduct) =>
        accumulatedPrice + currentProduct.productTotalPrice,
      0,
    )
  }, [products])

  const totalPriceFormatted = useMemo(() => {
    return currencyFormatter(totalPrice)
  }, [totalPrice])

  const totalItems = useMemo(() => {
    return products.reduce((sum, product) => (sum += product.amount), 0)
  }, [products])

  function addProductToCart(product: CartProduct) {
    const newProductList = [...products, product]
    setProducts(newProductList)
  }

  function removeProductFromCart(productId: string) {
    const cartWithoutProductToBeRemoved = products.filter(
      (product) => product.id !== productId,
    )
    setProducts(cartWithoutProductToBeRemoved)
  }

  function increaseProductAmount(cartProductId: string) {
    const productsArray = [...products]
    const cartProductIndex = productsArray.findIndex(
      (product) => product.id === cartProductId,
    )

    const product = productsArray[cartProductIndex]

    product.amount += 1
    product.productTotalPrice = product.amount * product.product.price

    setProducts(productsArray)
  }

  function decreaseProductAmount(cartProductId: string) {
    const productsArray = [...products]
    const cartProductIndex = productsArray.findIndex(
      (product) => product.id === cartProductId,
    )

    const product = productsArray[cartProductIndex]

    if (product.amount <= 1) {
      return
    }

    product.amount -= 1
    product.productTotalPrice = product.amount * product.product.price

    setProducts(productsArray)
  }

  return (
    <CartContext.Provider
      value={{
        products,
        totalPrice,
        totalPriceFormatted,
        totalItems,
        addProductToCart,
        removeProductFromCart,
        increaseProductAmount,
        decreaseProductAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

const productsMock: CartProduct[] = [
  {
    id: '1',
    product: {
      id: '1',
      name: 'Leite condensado',
      brand: 'Moça',
      category: 'Lacticínios',
      price: 39.99,
    },
    amount: 2,
    productTotalPrice: 79.99,
  },
  {
    id: '2',
    product: {
      id: '2',
      name: 'Leite condensado',
      brand: 'Moça',
      category: 'Bebidas',
      price: 39.99,
    },
    amount: 2,
    productTotalPrice: 79.99,
  },
  {
    id: '3',
    product: {
      id: '3',
      name: 'Queijo Prato',
      brand: 'Danúbio',
      category: 'Lacticínios',
      price: 49.99,
    },
    amount: 3,
    productTotalPrice: 149.97,
  },
  {
    id: '4',
    product: {
      id: '4',
      name: 'Refrigerante',
      brand: 'Coca-Cola',
      category: 'Bebidas',
      price: 4.5,
    },
    amount: 5,
    productTotalPrice: 22.5,
  },
  {
    id: '5',
    product: {
      id: '5',
      name: 'Iogurte',
      brand: 'Nestlé',
      category: 'Lacticínios',
      price: 3.2,
    },
    amount: 10,
    productTotalPrice: 32.0,
  },
  {
    id: '6',
    product: {
      id: '6',
      name: 'Água Mineral',
      brand: 'Crystal',
      category: 'Bebidas',
      price: 1.2,
    },
    amount: 6,
    productTotalPrice: 7.2,
  },
  {
    id: '7',
    product: {
      id: '7',
      name: 'Pasta de Amendoim',
      brand: 'Mandioca',
      category: 'Mercearia',
      price: 14.99,
    },
    amount: 2,
    productTotalPrice: 29.98,
  },
  {
    id: '8',
    product: {
      id: '8',
      name: 'Shampoo',
      brand: 'Pantene',
      category: 'Higiene Pessoal',
      price: 19.5,
    },
    amount: 1,
    productTotalPrice: 19.5,
  },
  {
    id: '9',
    product: {
      id: '9',
      name: 'Sabão em Pó',
      brand: 'OMO',
      category: 'Limpeza',
      price: 12.0,
    },
    amount: 3,
    productTotalPrice: 36.0,
  },
  {
    id: '10',
    product: {
      id: '10',
      name: 'Chocolate ao Leite',
      brand: 'Lacta',
      category: 'Doces e Sobremesas',
      price: 4.99,
    },
    amount: 10,
    productTotalPrice: 49.9,
  },
  {
    id: '11',
    product: {
      id: '11',
      name: 'Pneu Aro 15',
      brand: 'Michelin',
      category: 'Automotivo',
      price: 299.0,
    },
    amount: 4,
    productTotalPrice: 1196.0,
  },
  {
    id: '12',
    product: {
      id: '12',
      name: 'Camiseta Polo',
      brand: 'Lacoste',
      category: 'Vestuário',
      price: 139.99,
    },
    amount: 2,
    productTotalPrice: 279.98,
  },
]
