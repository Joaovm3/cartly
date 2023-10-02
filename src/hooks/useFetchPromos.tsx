import { useQuery } from "@tanstack/react-query";
import { api } from "@lib/api";

type PromosResponse = {
  id: number;
};

export function useFetchPromos() {
  const { isLoading, data } = useQuery<PromosResponse[]>({
    queryKey: ["promos"],
    queryFn: fetchPromos,
  });

  return {
    isPromosLoading: isLoading,
    promos: data,
  };
}

async function fetchPromos() {
  const response = await api.get("/promos");
  return response.data;
}
