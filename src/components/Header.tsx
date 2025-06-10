import { appBorderColor, appTextColor } from "@/app/const";
import { Link } from "react-router-dom";
import MobileNav from "./MobileNav";
import DesktopNav from "./DesktopNav";

export default function Header() {
  return (
    <div className={`border-b-2 ${appBorderColor} py-6`}>
      <div className="container mx-auto flex justify-between items-center px-6 ">
        <Link
          to={""}
          className={`text-3xl font-bold tracking-tight ${appTextColor}`}
        >
          ZestyGo.com
        </Link>
        <div className="md:hidden">
          <MobileNav />
        </div>
        <div className="hidden md:block">
          <DesktopNav />
        </div>
      </div>
    </div>
  );
}
