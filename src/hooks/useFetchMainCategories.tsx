import { useQuery } from "@tanstack/react-query";
import { api } from "@lib/api";

type MainCategoriesResponse = {
  id: number;
  description: string;
};

export function useFetchMainCategories() {
  const { isLoading, data } = useQuery<MainCategoriesResponse[]>({
    queryKey: ["main-categories"],
    queryFn: fetchMainCategories,
  });

  return {
    isMainCategoriesLoading: isLoading,
    mainCategories: data,
  };
}

async function fetchMainCategories() {
  const response = await api.get("/main-categories");
  return response.data;
}
