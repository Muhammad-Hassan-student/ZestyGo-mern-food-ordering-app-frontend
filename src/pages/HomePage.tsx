import { appTextColor } from "@/app/const";
import landingImage from "../assets/images/landing.png";
import appDonloadImage from "../assets/images/appDownload.png";

const HomePage = () => {
  return (
    <div className="flex flex-col gap-12 px-6">
      <div className="bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16">
        <h1
          className={`text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight ${appTextColor}`}
        >
          Tuck into a takeaway today
        </h1>
        <span className="text-xl">Food is just a click away!</span>
      </div>
      <div className="grid md:grid-cols-2 gap-5 ">
        <img src={landingImage} alt="" />
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <span className="font-bold text-3xl tracking-tighter">
            Order takeaway even faster
          </span>
          <span>
            Dowload the ZestyGo App for faster orderin and personalised
            recommendations
          </span>
          <img src={appDonloadImage} alt="" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
