import type { SearchState } from "@/pages/SearchPage";
import type { Restaurant, RestaurantSearchResponse } from "@/types/type";
import { useQuery } from "@tanstack/react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useSearchRequest = (searchState: SearchState, city?: string) => {
  const params = new URLSearchParams();
  params.set("searchQuery", searchState.searchQuery);
  params.set("page", searchState.page.toString());
  params.set("selectedCuisines", searchState.selectedCuisines.join(",")); //This is array that's why write comma in multiple data
  params.set("sortOption", searchState.sortOption);

  const createSearchRequest = async (): Promise<RestaurantSearchResponse> => {
    const response = await fetch(
      `${API_BASE_URL}/api/restaurant/search/${city}?${params.toString()}`
    );

    if (!response.ok) {
      throw new Error("Failed to get restaurant");
    }

    return response.json();
  };

  const { data: results, isLoading } = useQuery({
    queryKey: ["searchRestaurants", searchState],
    queryFn: createSearchRequest,
    enabled: !!city,
  });

  return {
    results,
    isLoading,
  };
  
};

export const useGetRestaurantById = (restaurantId?: string) => {
  const getRestaurantByIdRequest = async ():Promise<Restaurant> => {
    const response = await fetch(`${API_BASE_URL}/api/restaurant/${restaurantId}`);
 
    if(!response.ok){
      throw new Error("Failed to get restaurant");
    }

    return response.json()
 
  }

  const {data: restaurant, isLoading} = useQuery({queryKey:["fetchRestaurant"], enabled: !!restaurantId, queryFn: getRestaurantByIdRequest});

  return {
    restaurant,
    isLoading
  }
}

