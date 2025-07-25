import toast from "react-hot-toast";
import { assets } from "../../assets/assets.js";
import { useAppContext } from "../../context/AppContext.js";

const CommentTableItem = ({ comment, fetchComments }) => {
  const { blogId, createdAt, _id } = comment;
  const BlogDate = new Date(createdAt);
  const { axios } = useAppContext();

  const approveComment = async () => {
    try {
      const { data } = await axios.post("/api/v1/admin/approve-comment", { id: _id });
      data?.success ? toast.success("Comment approved successfully") : toast.error(data?.message);
      await fetchComments();
    } catch (error) {
      toast.error(error.message);
    }
  }

  const deleteComment = async () => {
    const confirm = window.confirm("Do you want to delete the comment?");
    if ( !confirm ) return;
    try {
      const { data } = await axios.post("/api/v1/admin/delete-comment", { id: _id });
      data?.success ? toast.success("Comment deleted successfully") : toast.error(data?.message);
      await fetchComments();
    } catch (error) {
      toast.error(error.message); 
    }
  }

  return (
    <tr className="order-y border-gray-300">
      <td className="px-6 py-4">
        <b className="font-medium text-gray-600">Blog</b> : {blogId.title}
        <br /> <br />
        <b className="font-medium text-gray-600">Name</b> : {comment.name}
        <br />
        <b className="font-medium text-gray-600">Comment</b> : {comment.content}
      </td>

      <td className="px-6 py-4 max-sm:hidden">{BlogDate.toDateString()}</td>

      <td className="px-6 py-4">
        <div className="inline-flex items-center gap-4">
          {!comment.isApproved ? (
            <img
              onClick={approveComment}
              src={assets.tick_icon}
              alt="tick_icon"
              className="w-5 hover:scale-110 transition-all cursor-pointer"
            />
          ) : (
            <p className="text-xs border border-green-600 bg-green-100 text-green-600 rounded-full px-3 py-1">
              Approved
            </p>
          )}

          <img
            onClick={deleteComment}
            src={assets.bin_icon}
            alt="bin_icon"
            className="w-5 hover:scale-110 transition-all cursor-pointer"
          />
        </div>
      </td>
    </tr>
  );
};

export default CommentTableItem;
