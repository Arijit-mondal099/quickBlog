import { useState } from "react";
import { motion } from "motion/react";
import { useAppContext } from "../context/AppContext.js";
import { blogCategories } from "../assets/assets.js";
import BlogCard from "./BlogCard";

const BlogList = () => {
  const [menu, setMenu] = useState("All");
  const { blogs, input } = useAppContext();

  const filterBlogs = () => {
    if (input === "") return blogs;

    return blogs.filter(
      (blog) =>
        blog?.title?.toLowerCase()?.includes(input?.toLowerCase()) ||
        blog?.category?.toLowerCase()?.includes(input?.toLowerCase())
    );
  };

  return (
    <div>
      {/* categories links */}
      <motion.div
        className="flex justify-center gap-4 sm:gap-8 my-10 relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8, ease: "linear" }}
      >
        {blogCategories.map((categorie, index) => (
          <div key={index} className="relative">
            <button
              className={`cursor-pointer ${
                menu === categorie ? "text-white px-4 pt-0.5" : "text-gray-500"
              } ${
                menu !== categorie &&
                "hover:text-gray-900 transition-all duration-300"
              }`}
              onClick={() => setMenu(categorie)}
            >
              {categorie}
            </button>

            {menu === categorie && (
              <motion.div
                className="absolute left-0 right-0 top-0 h-7 -z-1 bg-primary rounded-full"
                layoutId="underline"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </div>
        ))}
      </motion.div>

      {/* blog cards */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mb-24 mx-8 sm:mx-16 xl:mx-40"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5, ease: "linear" }}
      >
        {filterBlogs()
          .filter((blog) => (menu === "All" ? true : blog.category === menu))
          .map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
      </motion.div>
    </div>
  );
};

export default BlogList;
