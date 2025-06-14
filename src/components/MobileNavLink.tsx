import { appTextHoverColor } from "@/app/const";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const MobileNavLink = () => {
  const { logout } = useAuth0();
  return (
    <>
      <Link
        to="/manage-restaurant"
        className={`font-bold ${appTextHoverColor}`}
      >
        Manage Restaurant
      </Link>
      <Link
        to={"/user-profile"}
        className={`flex bg-white items-center font-bold ${appTextHoverColor}`}
      >
        User Profile
      </Link>
      <Button
        onClick={() => logout()}
        className={`flex items-center py-3 font-bold hover:bg-gray-500`}
      >
        Log Out
      </Button>
    </>
  );
};

export default MobileNavLink;
