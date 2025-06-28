import type { Restaurant } from "@/types/type";
import { Link } from "react-router-dom";
import { AspectRatio } from "./ui/aspect-ratio";
import { Banknote, Clock, Dot } from "lucide-react";

type Props = {
  restaurant: Restaurant;
};

const SearchResultsCard = ({ restaurant }: Props) => {
  return (
    <Link
      to={`/detail/${restaurant._id}`}
      className="grid lg:grid-cols-[2fr_3fr] gap-5 group"
    >
      {/* Image  */}
      <AspectRatio ratio={16 / 6}>
        <img
          src={restaurant.imageUrl}
          alt={restaurant.restaurantName}
          className="rounded-md h-full w-full object-cover"
        />
      </AspectRatio>

      <div>
        {/* Title  */}
        <h3 className="text-2xl font-bold tracking-tight mb-2 group-hover:underline">
          {restaurant.restaurantName}
        </h3>

        {/* CARD CONTENT  */}
        <div id="card-content" className="grid md:grid-cols-2 gap-2">
          {/* CUISINES  */}
          <div className="flex flex-row flex-wrap">
            {restaurant.cuisines.map((item, index) => (
              <span key={index} className="flex">
                <span>{item}</span>
                {index < restaurant.cuisines.length - 1 && <Dot />}
              </span>
            ))}
          </div>

          {/* ESTIMATED DELIVERY TIME & DELIVERY PRICE  */}
          <div className="flex flex-col gap-2 ">
            {/* ESTIMATED DELIVERY TIME  */}
            <div className="flex items-center gap-1 text-green-500">
              <Clock />
              {restaurant.estimatedDeliveryTime} mins
            </div>

            {/* DELIVERY PRICE  */}
            <div className="flex item-center gap-1">
              <Banknote />
              Delivery from £{(restaurant.deliveryPrice / 100).toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SearchResultsCard;
