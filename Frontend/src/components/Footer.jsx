import { assets, footer_data } from "../assets/assets.js";
import { Link } from "react-router-dom"; 

const Footer = () => {
  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 bg-primary/2">
      <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-gray-300">
        <div>
          <img src={assets.logo} alt="logo" className="w-32 sm:w-44" />
          <p className="max-w-md mt-6 text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi
            dolorem aspernatur molestiae facilis. Aspernatur repellendus aliquid
            perferendis.
          </p>
        </div>

        <div className="flex flex-wrap justify-between w-full md:w-[45%] gap-5">
          {footer_data.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold text-base text-gray-900 md:mb-5 mb-2">{section.title}</h3>
              <ul className="text-sm space-y-1">
                {section.links.map((item, index) => (
                  <li key={index}>
                    <Link to={"/"} className="hover:underline transition-all text-gray-500">{item}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="py-4 text-center text-sm md:text-base text-gray-500">
        Copyright 2025 © QuickBlog Arijit Mondal - All Right Reserved.
      </div>
    </div>
  );
};

export default Footer;
