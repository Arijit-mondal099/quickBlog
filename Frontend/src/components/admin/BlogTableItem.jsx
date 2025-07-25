import toast from "react-hot-toast";
import { assets } from "../../assets/assets.js";
import { useAppContext } from "../../context/AppContext.js";

const BlogTableItem = ({ blog, fetchBlogs, index }) => {
  const { _id, title, createdAt, isPublished } = blog;
  const { axios } = useAppContext();
  const BlogDate = new Date(createdAt);

  const deleteBlog = async () => {
    const confirm = window.confirm("Are you sure you want to delete the blog?");
    if ( !confirm ) return;
    try {
      const { data } = await axios.post("/api/v1/blogs/delete", { id: _id });
      if ( data?.success ) {
        toast.success("Blog deleted successfully");
        await fetchBlogs(); // for refresh data 
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  const handleToggle = async () => {
    try {
      const { data } = await axios.post("/api/v1/blogs/toggle-publish", { id: _id });
      if ( data?.success ) {
        toast.success(`Blog has been ${isPublished}`);
        await fetchBlogs(); // for refresh data 
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <tr className={`border-y border-gray-300 ${index % 2 === 0 ? "bg-primary/4" : "bg-white"}`}>
      <th className="px-2 py-4">
        {index}
      </th>

      <td className="px-2 py-4">
        {title}
      </td>

      <td className="px-2 py-4 max-sm:hidden">
        {BlogDate.toDateString()}
      </td>

      {/* show status */}
      <td className="px-2 py-4 max-sm:hidden">
        <p className={`${isPublished ? "text-green-600" : "text-orange-700"}`}>
          {isPublished ? "Published" : "Unpublished"}
        </p>
      </td>

      <td className="px-2 py-4 flex text-xs gap-3">
        {/* toggle publish or unpublish */}
        <button 
          className="border px-2 py-0.5 mt-1 rounded cursor-pointer"
          onClick={handleToggle}
        >
          {isPublished ? "Unpublish" : "Publish"}
        </button>

        {/* delete blog */}
        <img 
          onClick={deleteBlog}
          src={assets.cross_icon} 
          alt="cross_icon" 
          className="w-8 hover:scale-110 transition-all cursor-pointer" 
        />
      </td>
    </tr>
  );
};

export default BlogTableItem;
