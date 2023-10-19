import { useQuery } from '@tanstack/react-query'
import { api } from '@lib/api'

type NearbyMarketsResponse = {
  id: number
  name: string
  distanceFormatted: string
  previewURL: string
}

export function useFetchNearbyMarkets() {
  const { isLoading, data } = useQuery<NearbyMarketsResponse[]>({
    queryKey: ['nearby-markets'],
    queryFn: fetchNearbyMarkets,
  })

  return {
    isNearbyMarketsLoading: isLoading,
    nearbyMarkets: data,
  }
}

async function fetchNearbyMarkets() {
  const response = await api.get('/nearby-markets')
  return response.data
}
