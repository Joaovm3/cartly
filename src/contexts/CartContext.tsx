import { api } from '@lib/api'
import { currencyFormatter } from '@utils/formatter'
import { createContext, useMemo, useState } from 'react'
import { randomUUID } from 'expo-crypto'

type ProductAPIResponse = {
  id: string
  name: string
  brand: string
  price: number
  category: string
}

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
  addProductToCart: (productId: string) => void
  removeProductFromCart: (productId: string) => void
  increaseProductAmount: (cartProductId: string) => void
  decreaseProductAmount: (cartProductId: string) => void
}

interface CartContextProvderProps {
  children: React.ReactNode
}

export const CartContext = createContext({} as Cart)

export function CartContextProvider({ children }: CartContextProvderProps) {
  const [products, setProducts] = useState<CartProduct[]>([])

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

  async function addProductToCart(productId: string) {
    const productAlreadyAdded = products.find(
      (product) => product.product.id === productId,
    )

    if (productAlreadyAdded) {
      increaseProductAmount(productAlreadyAdded.id)
      return
    }

    const { data } = await api.get<ProductAPIResponse>(`/products/${productId}`)

    const cardProduct: CartProduct = {
      id: randomUUID(),
      amount: 1,
      product: data,
      productTotalPrice: data.price,
    }

    const newProductList = [...products, cardProduct]
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
