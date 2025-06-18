import { cuisineList } from "@/config/restaurant-options-config";
import { Check } from "lucide-react";
import type { ChangeEvent } from "react";
import { Button } from "./ui/button";

type Props = {
  selectedCusinies: string[];
  onChange: (cuisines: string[]) => void;
  isExpanded: boolean;
  onExpandedClick: () => void;
};

const CuisineFilter = ({
  selectedCusinies,
  onChange,
  isExpanded,
  onExpandedClick,
}: Props) => {
  const handleCuisinesChange = (event: ChangeEvent<HTMLInputElement>) => {
    const clickedCuisine = event.target.value;
    const isChecked = event.target.checked;

    const newCuisineList = isChecked
      ? [...selectedCusinies, clickedCuisine]
      : selectedCusinies.filter((cuisine) => cuisine !== clickedCuisine);
    onChange(newCuisineList);
  };

  const handleCuisineReset = () => onChange([]);

  return (
    <>
      <div className="flex justify-between items-center px-4">
        <div className="text-md font-semibold mb-2 ">Filter By Cuisine</div>
        <div
          onClick={handleCuisineReset}
          className="text-sm font-semibold mb-2 underline cursor-pointer text-blue-500"
        >
          Reset Filters
        </div>
      </div>

      <div className="space-y-2 flex flex-col">
        {cuisineList
          .slice(0, isExpanded ? cuisineList.length : 7)
          .map((cuisine) => {
            const isSelectedCuisine = selectedCusinies.includes(cuisine);
            return (
              <div className="flex">
                <input
                  id={`cuisine_${cuisine}`}
                  type="checkbox"
                  className="hidden"
                  value={cuisine}
                  checked={isSelectedCuisine}
                  onChange={handleCuisinesChange}
                />
                <label
                  htmlFor={`cuisine_${cuisine}`}
                  className={`flex flex-1 items-center cursor-pointer text-sm rounded-full px-4 py-2 font-semibold ${
                    isSelectedCuisine
                      ? "border border-green-600 text-green-600"
                      : "border-slate-300"
                  } `}
                >
                  {isSelectedCuisine && <Check size={20} strokeWidth={3} />}
                  {cuisine}
                </label>
              </div>
            );
          })}
        <Button
          variant={"link"}
          className="mt-4 flex-1 cursor-pointer"
          onClick={onExpandedClick}
        >
          {isExpanded ? <span>View less</span> : <span>View more</span>}
        </Button>
      </div>
    </>
  );
};

export default CuisineFilter;
