import hero from "../assets/images/hero1.png";

const Hero = () => {
  return (
    <div>
      <img src={hero} alt="" className="w-full max-h-[500px] object-cover" />
    </div>
  );
};

export default Hero;
