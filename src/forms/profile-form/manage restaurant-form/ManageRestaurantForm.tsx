import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import DetailSection from "./DetailSection";
import { Separator } from "@radix-ui/react-separator";
import CuisinesSection from "./CuisinesSection";
import MenuSection from "./MenuSection";
import ImageSection from "./ImageSection";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import type { Restaurant } from "@/types/type";
import { useEffect } from "react";

const formSchema = z
  .object({
    restaurantName: z.string({
      required_error: "restaurant name is required",
    }),
    city: z.string({
      required_error: "city name is required",
    }),
    country: z.string({
      required_error: "country name is required",
    }),
    deliveryPrice: z.coerce.number({
      required_error: "delivery price name is required",
      invalid_type_error: "must be a valid number",
    }),
    estimatedDeliveryTime: z.coerce.number({
      required_error: "Estimated delivery time is required",
      invalid_type_error: "must be a valid number",
    }),
    cuisines: z.array(z.string()).nonempty({
      message: "Please select at least one item",
    }),
    menuItems: z.array(
      z.object({
        name: z.string().min(1, "name is required"),
        price: z.coerce.number().min(1, "price is required"),
      })
    ),
    imageUrl: z.string().optional(),
    imageFile: z.instanceof(File, { message: "image is required" }).optional(),
  })
  .refine((data) => data.imageUrl || data.imageFile, {
    message: "Either image URL or image File must be provided",
    path: ["imageFile"],
  });

type RestaurantFormData = z.infer<typeof formSchema>;

type Props = {
  onSave: (restaurantFormData: FormData) => void;
  isLoading: boolean;
  restaurant?: Restaurant;
};

const ManageRestaurantForm = ({ restaurant, onSave, isLoading }: Props) => {
  const form = useForm<RestaurantFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cuisines: [],
      menuItems: [{ name: "", price: 0 }],
    },
  });

  useEffect(() => {
    if (!restaurant) {
      return;
    }

    // price lowest domination of 100 = 100pence == 1GBP
    const deliveryPriceFormatted = parseInt(
      (restaurant.deliveryPrice / 100).toFixed(2)
    );
    const menuItemsFormatted = restaurant.menuItems.map((menuItem) => ({
      ...menuItem,
      price: parseInt((menuItem.price / 100).toFixed(2)),
    }));

    const updatedRestaurant = {
      ...restaurant,
      deliveryPrice: deliveryPriceFormatted,
      menuItems: menuItemsFormatted,
    };

    form.reset(updatedRestaurant);
  }, [form, restaurant]);

  const onSubmit = (formDatajson: RestaurantFormData) => {
    const formData = new FormData();

    formData.append("restaurantName", formDatajson.restaurantName);
    formData.append("city", formDatajson.city);
    formData.append("country", formDatajson.country);
    formData.append(
      "deliveryPrice",
      (formDatajson.deliveryPrice * 100).toString()
    );
    formData.append(
      "estimatedDeliveryTime",
      formDatajson.estimatedDeliveryTime.toString()
    );

    formDatajson.cuisines.forEach((cuisine, index) => {
      formData.append(`cuisines[${index}]`, cuisine);
    });

    formDatajson.menuItems.forEach((menuItem, index) => {
      formData.append(`menuItems[${index}][name]`, menuItem.name);
      formData.append(
        `menuItems[${index}][price]`,
        (menuItem.price * 100).toString()
      );
    });

    if (formDatajson.imageFile) {
      formData.append("imageFile", formDatajson.imageFile);
    }

    onSave(formData);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 bg-gray-50 p-10 rounded-lg"
      >
        <DetailSection />
        <Separator />
        <CuisinesSection />
        <Separator />
        <MenuSection />
        <Separator />
        <ImageSection />
        {isLoading ? <LoadingButton /> : <Button type="submit">Submit</Button>}
      </form>
    </Form>
  );
};

export default ManageRestaurantForm;
