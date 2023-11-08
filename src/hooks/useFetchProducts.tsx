import { useQuery } from '@tanstack/react-query'
import { api } from '@lib/api'

type ProductResponse = {
  id: number
  name: string
  brand: string
  price: number
  category: string
  previewURL: string
}

export function useFetchProduct(productId: string) {
  const { data, isLoading } = useQuery<ProductResponse>({
    queryKey: ['product'],
    queryFn: () => fetchProductById(productId),
  })

  return {
    isLoadingProduct: isLoading,
    product: data,
  }
}

async function fetchProductById(productId: string) {
  const response = await api.get(`/products?id=${productId}`)
  return response.data
}
