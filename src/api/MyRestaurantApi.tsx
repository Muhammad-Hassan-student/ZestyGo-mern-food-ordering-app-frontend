import type { Restaurant } from "@/types/type";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useCreateRestaurantRequest = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createMyRestaurantRequest = async (
    restaurantFormData: FormData
  ): Promise<Restaurant> => {
    const acccessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${acccessToken}`,
      },
      body: restaurantFormData,
    });

    if (!response.ok) {
      throw new Error("Failed to create restaurant request");
    }

    return response.json();
  };

  const {
    mutateAsync: createRestaurant,
    isSuccess,
    isPending,
    error,
  } = useMutation({ mutationFn: createMyRestaurantRequest });

  if (isSuccess) {
    toast.success("Restaurant created");
  }

  if (error) {
    toast.error("Unable to create restaurant");
  }

  return {
    createRestaurant,
    isLoading: isPending,
  };
};

export const useGetRestaurantRequest = () => {
  const { getAccessTokenSilently } = useAuth0();
  const getMyRestaurantRequest = async (): Promise<Restaurant> => {
    const acccessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${acccessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch restaurant");
    }

    return response.json();
  };

  const { data: restaurant, isLoading } = useQuery({
    queryKey: ["fetchRestaurant"],
    queryFn: getMyRestaurantRequest,
  });

  return {
    restaurant,
    isLoading,
  };
};

export const useUpdateRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();
  const updateMyRestaurantRequest = async (
    restaurantFormData: FormData
  ): Promise<Restaurant> => {
    const acccessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${acccessToken}`,
      },
      body: restaurantFormData,
    });

    if (!response.ok) {
      throw new Error("Failed to update restaurant");
    }

    return response.json();
  };
  const {
    mutateAsync: updateRestaurant,
    isSuccess,
    isPending,
    error,
  } = useMutation({ mutationFn: updateMyRestaurantRequest });

  if (isSuccess) {
    toast.success("Restaurant updated");
  }

  if (error) {
    toast.error("Unabled to update restaurant");
  }

  return {
    updateRestaurant,
    isLoading: isPending,
  };
};
