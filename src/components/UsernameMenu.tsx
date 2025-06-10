import { appColor, appTextHoverColor } from "@/app/const";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth0 } from "@auth0/auth0-react";
import { Separator } from "@radix-ui/react-separator";
import { CircleUserRound } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const UsernameMenu = () => {
  const { user, logout } = useAuth0();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={`flex items-center p-3 font-bold ${appTextHoverColor} gap-2 `}
      >
        <CircleUserRound className={`${appTextHoverColor}`} />
        {user?.email}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Link to="/user-profile" className={`font-bold ${appTextHoverColor}`}>
            User Profile
          </Link>
        </DropdownMenuItem>
        <Separator />
        <DropdownMenuItem>
          <Button
            onClick={() => logout()}
            className={`flex flex-1 font-bold ${appColor}`}
          >
            Log Out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UsernameMenu;
