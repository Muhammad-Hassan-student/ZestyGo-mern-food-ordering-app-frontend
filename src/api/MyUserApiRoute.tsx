import type { User } from "@/types/type";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

const API_BASE_URI = import.meta.env.VITE_API_BASE_URL;

type CreateUserRequest = {
  auth0Id: string;
  email: string;
};

type CreateUserResponse = {
  _id: string;
  auth0Id: string;
  email: string;
};

export const useCreateUser = () => {
  const { getAccessTokenSilently } = useAuth0();
  const createMyUserRequest = async (user: CreateUserRequest) => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URI}/api/my/user`, {
      method: "POST", // Fixed: "Post" to "POST"
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      }, // Fixed: "josn" to "json"
      body: JSON.stringify(user),
    });
    if (!response.ok) {
      throw new Error("Failed to create user");
    }
    return response.json(); // ✅ Fix: Return parsed response
  };

  const {
    mutateAsync: createUser,
    isPending, // Changed from isLoading to isPending
    isError,
    isSuccess,
  } = useMutation<CreateUserResponse, Error, CreateUserRequest>({
    mutationFn: createMyUserRequest,
  });

  return {
    createUser,
    isLoading: isPending, // Map isPending to isLoading for backward compatibility
    isError,
    isSuccess,
  };
};

//Type Safety for update user data
interface updateMyUser {
  name: string;
  addressLine1: string;
  city: string;
  country: string;
}

export const useUpdateMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateMyUserRequest = async (formData: updateMyUser) => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URI}/api/my/user`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Failed to update user");
    }
  };
  const {
    mutateAsync: updateUser,
    isPending,
    isSuccess,
    isError,
    error,
    reset,
  } = useMutation({ mutationFn: updateMyUserRequest });

  if (isSuccess) {
    toast.success("User profile updated");
  }
  if (error) {
    toast.error(error.toString());
    reset();
  }

  return {
    updateUser,
    isLoading: isPending,
    isSuccess,
    isError,
    reset,
  };
};

//My self added


export const useGetMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getMyUserResquest = async ():Promise<User> => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URI}/api/my/user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch user");
    }
    return response.json();
  };
  //name kch bh likh skty hain lekin recommended meaningful rkho data: ____
  const {
    data: userArahaHai,
    isLoading,
    error,
  } = useQuery({ queryKey: ["fetchCurrentUser"], queryFn: getMyUserResquest });
  if (error) {
    toast.error(error.toString());
  }
  return {
    userArahaHai,
    isLoading,
  };
};
