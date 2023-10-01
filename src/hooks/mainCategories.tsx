import { api } from "@lib/api";

interface MainCategories {
  id: number;
  description: string;
}

export function useMainCategories() {
  let mainCategories = [{} as MainCategories];

  const response = api
    .get("/main-categories")
    .then((response) => response.data);

  return { mainCategories };
}
