import { appColor } from "@/app/const";

const Footer = () => {
  return (
    <div className={` py-6`}>
      <div
        className={`container ${appColor} mx-auto flex flex-col md:flex-row justify-between items-center px-6 py-8`}
      >
        <span className="text-3xl text-white font-bold tracking-tight">
          ZestyGo.com
        </span>
        <span className="text-white font-bold tracking-tight flex gap-4">
          <span>Privacy Policy</span>
          <span>Terms of service</span>
        </span>
      </div>
    </div>
  );
};

export default Footer;
