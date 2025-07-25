import { NavLink } from "react-router-dom";
import { assets } from "../../assets/assets.js";

const Sidebar = () => {
  return (
    <div className="flex flex-col border-r border-gray-200 min-h-full pt-6">
      <NavLink end={true} to={"/admin"} className={({ isActive }) => (`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive && "bg-primary/10 border-r-4 border-primary"}`)}>
        <img src={assets.home_icon} alt="dashbord home" className="min-w-4 w-5" />
        <p className="hidden md:inline-block text-base text-gray-900 font-medium">Dashboard</p>
      </NavLink>

      <NavLink to={"/admin/add-blogs"} className={({ isActive }) => (`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive && "bg-primary/10 border-r-4 border-primary"}`)}>
        <img src={assets.add_icon} alt="add icon" className="min-w-4 w-5" />
        <p className="hidden md:inline-block text-base text-gray-900 font-medium">Add blogs</p>
      </NavLink>

      <NavLink to={"/admin/list-blogs"} className={({ isActive }) => (`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive && "bg-primary/10 border-r-4 border-primary"}`)}>
        <img src={assets.list_icon} alt="list_icon" className="min-w-4 w-5" />
        <p className="hidden md:inline-block text-base text-gray-900 font-medium">Blog lists</p>
      </NavLink>

      <NavLink end={true} to={"/admin/comments"} className={({ isActive }) => (`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive && "bg-primary/10 border-r-4 border-primary"}`)}>
        <img src={assets.comment_icon} alt="comment_icon" className="min-w-4 w-5" />
        <p className="hidden md:inline-block text-base text-gray-900 font-medium">Comments</p>
      </NavLink>
    </div>
  )
}

export default Sidebar;
