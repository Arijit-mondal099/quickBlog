import { assets } from "../assets/assets.js";
import { motion } from "motion/react";
import { useAppContext } from "../context/AppContext.js";

const Header = () => {
  const { input, setInput } = useAppContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    setInput(input);
  };

  return (
    <motion.div
      className="mx-8 sm:mx-16 xl:mx-24 relative"
      initial={{ y: 15, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "linear" }}
    >
      <div className="text-center mt-20 mb-8">
        <div className="inline-flex items-center justify-center gap-4 px-6 py-1.5 mb-4 border border-primary/40 bg-primary/10 rounded-full text-sm text-primary">
          New: AI Feature Integrated
          <img src={assets.star_icon} alt="star-icon" className="w-3" />
        </div>

        <div className="flex flex-col gap-6 sm:gap-8 text-center mb-8">
          <h1 className="text-3xl sm:text-6xl font-semibold sm:leading-16 text-gray-700">
            Your own{" "}
            <span className="relative text-primary">
              blogging
              <img
                src={assets.curve}
                alt="curve"
                className="absolute w-[100%] left-0 bottom-0 -z-1"
              />
            </span>
            <br />
            platform.
          </h1>

          <p className="text-gray-500 max-w-2xl max-sm:text-xs m-auto">
            This is your space to think out loud, to share what matters, and to
            write without filters. Whether it's one word or a thousand, your
            story starts right here.
          </p>
        </div>

        <form
          className="flex justify-between max-w-lg mx-auto border border-gray-300 bg-white rounded overflow-hidden"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Search for blogs"
            required
            className="w-full pl-4 outline-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="submit"
            className="bg-primary text-white px-8 py-2 m-1.5 rounded hover:scale-105 transition-all cursor-pointer"
          >
            Search
          </button>
        </form>
      </div>

      {input && (
        <div className="text-center">
          <button
            onClick={() => setInput("")}
            className="border font-light text-xs py-1 px-3 rounded-sm shadow-custom-sm cursor-pointer"
          >
            clear search
          </button>
        </div>
      )}

      <img
        src={assets.gradientBackground}
        alt="gb-image"
        className="absolute -top-50 -z-1 opacity-70"
      />
    </motion.div>
  );
};

export default Header;
