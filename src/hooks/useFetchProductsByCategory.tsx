import { useQuery } from '@tanstack/react-query'
import { api } from '@lib/api'

type ProductsResponse = {
  id: number
  name: string
  brand: string
  price: number
  category: string
  previewURL: string
}

export function useFetchProductsByCategory(categoryName: string) {
  const { data, isLoading } = useQuery<ProductsResponse[]>({
    queryKey: ['productsByCategory', categoryName],
    queryFn: () => fetchProductsByCategory(categoryName),
  })

  return {
    isLoadingProducts: isLoading,
    products: data,
  }
}

async function fetchProductsByCategory(categoryName: string) {
  const response = await api.get(`/products?category=${categoryName}`)
  return response.data
}
