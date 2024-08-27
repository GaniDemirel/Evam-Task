import EvamSVG from "../../assets/evam.svg";
import LogoDesignSVG from "../../assets/logoDesign.svg";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full mb-2 px-10 py-6 max-w-[1280px] m-auto">
      <div className="flex relative">
        <img
          onClick={() => navigate("/")}
          className="logo w-[50px] logo-container cursor-pointer absolute left-0 top-1"
          src={LogoDesignSVG}
        />
        <img
          onClick={() => navigate("/")}
          className=" w-[200px] logo-container cursor-pointer"
          src={EvamSVG}
        />
      </div>
    </div>
  );
};
