import { api } from "@lib/api";

interface MainCategories {
  id: number;
  description: string;
}

export function useMainCategories() {
  const mainCategories = [{} as MainCategories];

  const response = api
    .get("/main-categories")
    .then((response) => response.data);
  console.log(response);

  return { mainCategories };
}
