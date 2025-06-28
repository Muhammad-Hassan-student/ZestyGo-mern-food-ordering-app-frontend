import { appTextColor } from "@/app/const";
import landingImage from "../assets/images/landing.png";
import appDonloadImage from "../assets/images/appDownload.png";
import SearchBar, { type SearchForm } from "@/components/SearchBar";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const handleSeachSubmit = (searchFormValues: SearchForm) => {
    navigate({
      pathname: `/search/${searchFormValues.searchQuery}`,
    });
  };
  return (
    <div className="flex flex-col gap-12">
      <div className="md:px-32 bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16">
        <h1
          className={`text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight ${appTextColor}`}
        >
          Tuck into a takeaway today
        </h1>
        <span className="text-xl">Food is just a click away!</span>
        <SearchBar
          placeholder="Search by City or Town"
          onSubmit={handleSeachSubmit}
        />
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
