import { assets } from "../assets/assets.js";
import { useAppContext } from "../context/AppContext.js";

const Navbar = () => {
  const { navigate, token } = useAppContext();

  return (
    <div className="flex justify-between items-center py-5 mx-8 sm:mx-20 xl:mx-32">
      <img
        src={assets.logo}
        alt="logo"
        className="cursor-pointer w-32 sm:w-44"
        onClick={() => navigate("/")}
      />

      <button
        className="flex items-center gap-2 bg-primary rounded-full cursor-pointer text-sm text-white px-5 sm:px-10 py-1.5 sm:py-2.5 hover:scale-105 transition-all duration-300"
        onClick={() => navigate("/admin")}
      >
        {token ? "Dashboard" : "Admin Login"}
        <img src={assets.arrow} alt="arrow" className="w-3" />
      </button>
    </div>
  );
};

export default Navbar;
