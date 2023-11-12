import { useQuery } from '@tanstack/react-query'
import { api } from '@lib/api'

export type ProductResponse = {
  id: number
  name: string
  brand: string
  price: number
  category: string
  previewURL: string
}

export function useFetchProduct(productId: string) {
  const { data, isLoading, remove } = useQuery<ProductResponse[]>({
    queryKey: ['product', productId],
    queryFn: () => fetchProductById(productId),
  })

  const responseData: ProductResponse[] = data!

  return {
    isLoadingProduct: isLoading,
    product: responseData,
    remove,
  }
}

async function fetchProductById(productId: string) {
  const response = await api.get(`/products?id=${productId}`)
  return response.data
}
