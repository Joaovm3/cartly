import { useQuery } from '@tanstack/react-query'
import { api } from '@lib/api'

type OffersDataResponse = {
  id: string
  name: string
  brand: string
  price: number
  previewURL: string
}

export function useFetchOffers() {
  const { isLoading, data } = useQuery<OffersDataResponse[]>({
    queryKey: ['offers'],
    queryFn: fetchOffers,
  })
  return {
    isOffersLoading: isLoading,
    offers: data,
  }
}

async function fetchOffers() {
  const response = await api.get('/offers')
  return response.data
}
