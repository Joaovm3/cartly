import { useQuery } from '@tanstack/react-query'
import { api } from '@lib/api'
import Feather from '@expo/vector-icons/Feather'

type CategoriesResponse = {
  id: number
  description: string
  icon: keyof typeof Feather.glyphMap
}

export function useFetchCategories() {
  const { isLoading, data } = useQuery<CategoriesResponse[]>({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  })

  return {
    isCategoriesLoading: isLoading,
    categories: data,
  }
}

async function fetchCategories() {
  const response = await api.get('/categories')
  return response.data
}
