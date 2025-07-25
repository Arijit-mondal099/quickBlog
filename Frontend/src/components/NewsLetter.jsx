import { motion } from "motion/react";

const NewsLetter = () => {
  return (
    <motion.div
      className="px-3 flex flex-col items-center justify-center text-center space-y-2 my-32"
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "linear" }}
    >
      <h1 className="md:text-4xl text-2xl font-semibold">Never Miss a Blog!</h1>
      <p className="md:text-lg text-gray-500/70 pb-8">
        Subscribe to get the latest blog, new tech, and exclusive news.
      </p>

      <form className="flex items-center justify-between max-w-2xl w-full md:h-13 h-12">
        <input
          type="text"
          placeholder="Enter your email id"
          required
          className="border border-gray-300 rounded-md w-full h-full border-r-0 outline-none rounded-r-none px-3 text-gray-500"
        />

        <button
          type="submit"
          className="px-8 md:px-12 h-full text-white bg-primary/80 hover:bg-primary transition-all duration-300 cursor-pointer rounded-md rounded-l-none"
        >
          Subscribe
        </button>
      </form>
    </motion.div>
  );
};

export default NewsLetter;
