export type User = {
  _id: string;
  auth0Id: string;
  email: string;
  name: string;
  addressLine1: string;
  city: string;
  country: string;
};

type menuItems = {
  _id: string;
  name: string;
  price: number;
};

export type Restaurant = {
  _id: string;
  user: string;
  restaurantName: string;
  city: string;
  country: string;
  deliveryPrice: number;
  estimatedDeliverTime: number;
  cuisines: string[];
  menuItems: menuItems[];
  imageUrl: string;
};
