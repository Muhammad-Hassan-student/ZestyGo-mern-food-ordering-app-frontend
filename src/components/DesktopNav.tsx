import { appTextHoverColor } from "@/app/const";
import { Button } from "./ui/button";
import { useAuth0 } from "@auth0/auth0-react";
import UsernameMenu from "./UsernameMenu";

export default function DesktopNav() {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  return (
    <span className="flex  space-x-2 items-center">
      {isAuthenticated ? (
        <UsernameMenu />
      ) : (
        <Button
          variant={"ghost"}
          onClick={async () => await loginWithRedirect()}
          className={`font-bold ${appTextHoverColor} hover:bg-white cursor-pointer`}
        >
          Login
        </Button>
      )}
    </span>
  );
}
