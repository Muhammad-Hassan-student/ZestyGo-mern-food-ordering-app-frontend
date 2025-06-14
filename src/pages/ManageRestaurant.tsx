import {
  useGetRestaurantRequest,
  useCreateRestaurantRequest,
  useUpdateRestaurant,
} from "@/api/MyRestaurantApi";
import ManageRestaurantForm from "@/forms/profile-form/manage restaurant-form/ManageRestaurantForm";

const ManageRestaurant = () => {
  const { createRestaurant, isLoading: isCreateLoading } = useCreateRestaurantRequest();
  const { restaurant } = useGetRestaurantRequest();
  const { updateRestaurant, isLoading: isUpdateLoading } = useUpdateRestaurant();
 
  const isEditing = !!restaurant;

  return (
    <div>
      <ManageRestaurantForm
        restaurant={restaurant}
        onSave={isEditing ? updateRestaurant : createRestaurant}
        isLoading={isCreateLoading || isUpdateLoading}
      />
    </div>
  );
};

export default ManageRestaurant;
