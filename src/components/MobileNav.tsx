import { CircleUserRound, Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { appColor, appTextColor } from "@/app/const";
import { Separator } from "@radix-ui/react-separator";
import { Button } from "./ui/button";
import { useAuth0 } from "@auth0/auth0-react";
import MobileNavLink from "./MobileNavLink";

export default function MobileNav() {
  const { isAuthenticated, loginWithRedirect, user } = useAuth0();
  return (
    <Sheet>
      <SheetTrigger>
        <Menu className={appTextColor} />
      </SheetTrigger>
      <SheetContent className=" px-4">
        <SheetTitle className="flex py-3  items-center ">
          {isAuthenticated ? (
            <span
              className={`flex items-center font-bold gap-2 ${appTextColor}}`}
            >
              {" "}
              <CircleUserRound className={`${appTextColor}`} /> {user?.email}
            </span>
          ) : (
            <span>Welcome to ZestyGo.com</span>
          )}
        </SheetTitle>
        <Separator />
        <SheetDescription className="flex flex-col gap-2">
          {isAuthenticated ? (
            <MobileNavLink />
          ) : (
            <Button
              onClick={async () => loginWithRedirect()}
              className={`flex-1 font-bold ${appColor}`}
            >
              Login
            </Button>
          )}
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
}
