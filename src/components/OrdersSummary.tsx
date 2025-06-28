import type { CartItems } from "@/pages/DetailPage";
import type { MenuItems, Restaurant } from "@/types/type";
import { CardContent, CardHeader, CardTitle } from "./ui/card";
import { Item, Separator } from "@radix-ui/react-dropdown-menu";
import { Badge } from "./ui/badge";
import { Trash } from "lucide-react";

type Props = {
  restaurant: Restaurant;
  cartItems: CartItems[];
  removeFromCart: (menuItems: MenuItems) => void;
};

const OrdersSummary = ({ restaurant, cartItems, removeFromCart }: Props) => {
  const getTotalPrice = () => {
    const totalInPance = cartItems.reduce(
      (total, cartItem) => total + cartItem.price * cartItem.quantity,
      0
    );

    const totalWithDelivery = totalInPance + restaurant.deliveryPrice;

    return (totalWithDelivery / 100).toFixed(2);
  };
  return (
    <>
      <CardHeader>
        <CardTitle className="text-2xl font-bold tracking-tight flex justify-between">
          <span>Your Order</span>
          <span>£{getTotalPrice()}</span>
        </CardTitle>
      </CardHeader>

        <CardContent className="flex flex-col gap-5">
          {cartItems.map((item) => (
            <div className="flex justify-between">
              <span>
                <Badge variant={"outline"} className="mr-2">
                  {item.quantity}
                </Badge>
                {item.name}
              </span>
              <span className="flex items-center  gap-2">
                £{((item.price * item.quantity) / 100).toFixed(2)}
                <Trash className="cursor-pointer" color="red" size={20} onClick={() => removeFromCart(item)}/> 
              </span>
            </div>
          ))}
          <Separator />
          <div className="flex justify-between">
            <span>Delivery</span>
            <span>£{(restaurant.deliveryPrice / 100).toFixed(2)}</span>
          </div>
        <Separator />
        </CardContent>
    </>
  );
};

export default OrdersSummary;
