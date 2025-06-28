import { useCreateCheckoutSession } from "@/api/OrderApi";
import { useGetRestaurantById } from "@/api/RestaurantApi";
import CheckoutButton from "@/components/CheckoutButton";
import MenuItem from "@/components/MenuItem";
import OrdersSummary from "@/components/OrdersSummary";
import RestaurantInfo from "@/components/RestaurantInfo";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardFooter } from "@/components/ui/card";
import type { userFormData } from "@/forms/profile-form/UserProfileForm";
import type { MenuItems } from "@/types/type";
import { useState } from "react";
import { useParams } from "react-router-dom";

export type CartItems = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
};

const DetailPage = () => {
  const { restaurantId } = useParams();
  const { restaurant, isLoading } = useGetRestaurantById(restaurantId);
  const [cartItems, setCartItems] = useState<CartItems[]>(() => {
    const storedCartItems = sessionStorage.getItem(`cartItems-${restaurantId}`);
    return storedCartItems ? JSON.parse(storedCartItems) : []
  });
  const {createCheckoutSession, isLoading: isCheckoutLoading} = useCreateCheckoutSession();

  const onCheckout = async (userFormData: userFormData) => {
    console.log(userFormData);
    if(!restaurant){
      return;
    }
    //Checkout data
    const checkoutData = {
      cartItems: cartItems.map((cartItem) => ({
        menuItemId: cartItem._id,
        name: cartItem.name,
        quantity: cartItem.quantity.toString(),
      })),
      restaurantId: restaurant._id,
      deliveryDetails: {
        name: userFormData.name,
        addressLine1: userFormData.addressLine1,
        city: userFormData.city,
        country: userFormData.country,
        email: userFormData.email as string,
      }
    }

    const data = await createCheckoutSession(checkoutData);
    window.location.href = data.url;

  }

  const addToCart = (menuItem: MenuItems) => {
    setCartItems((prevCartItems) => {

      //check cart items exisit
      const existingCartItem = prevCartItems.find((cartItem) => cartItem._id === menuItem._id);

      //if exist so update the quantinty
      let updatedCartItems;
      if(existingCartItem) {
        updatedCartItems = prevCartItems.map((cartItem) => cartItem._id === menuItem._id ? {...cartItem, quantity: cartItem.quantity + 1} : cartItem)
      }else{
        updatedCartItems = [
          ...prevCartItems,
          {
            _id: menuItem._id,
            name: menuItem.name,
            price: menuItem.price,
            quantity: 1,
          }
        ]
      }
      //save add to cart item in session storage
      sessionStorage.setItem(`cartItems-${restaurantId}`,JSON.stringify(updatedCartItems));
      return updatedCartItems;
    });
  }

  const removeFromCart = (menuItem: MenuItems) => {
    setCartItems((prevCartItems) => {
      const updatedCartItems = prevCartItems.filter((item) => item._id !== menuItem._id);
      sessionStorage.setItem(`cartItems-${restaurantId}`,JSON.stringify(updatedCartItems));
      return updatedCartItems;
    })
  }

  if (isLoading || !restaurant) {
    return <span>Loading...</span>;
  }

  return (
    <div className="flex flex-col gap-10">
      {/* RESTAURANT IMAGE SECTION */}
      <AspectRatio ratio={16 / 5}>
        <img
          src={restaurant.imageUrl}
          alt={restaurant.restaurantName}
          className="w-full h-full rounded-md object-cover"
        />
      </AspectRatio>

      <div className="grid md:grid-cols-[4fr_3fr] gap-5 md:px-32">
        <div className="flex flex-col gap-4">
          <RestaurantInfo restaurant={restaurant} />
          <span className="text-2xl font-bold tracking-tight">Menu</span>
          {restaurant.menuItems.map((item) => (
            <MenuItem menuItem={item} addToCart={() => addToCart(item)} />
          ))}
        </div>

        <div>
          <Card>
            <OrdersSummary restaurant={restaurant} cartItems={cartItems} removeFromCart={removeFromCart} />
            <CardFooter>
              <CheckoutButton onCheckout={onCheckout} isLoading={isCheckoutLoading} disabled={cartItems.length === 0}  />
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
