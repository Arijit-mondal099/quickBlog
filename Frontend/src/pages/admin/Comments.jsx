import { useEffect, useState } from "react";
import CommentTableItem from "../../components/admin/CommentTableItem.jsx";
import { useAppContext } from "../../context/AppContext.js";
import toast from "react-hot-toast";

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [filter, setFilter] = useState("Not Approved");
  const { axios } = useAppContext();

  const fetchComments = async () => {
    try {
      const { data } = await axios.get("/api/v1/admin/comments");
      data?.success ? setComments(data?.comments) : toast.error(data?.message);
    } catch (error) {
      toast.error(error?.message);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div className="flex-1 pt-5 px-5 sm:pl-16 sm:pt-12 bg-blue-50/50">
      <div className="flex justify-between items-center max-w-3xl mb-6">
        <h1 className="text-lg text-gray-600 font-semibold">Comments</h1>

        {/* approved and not approved button */}
        <div className="flex gap-2 sm:gap-4 items-center">
          <button
            onClick={() => setFilter("Approved")}
            className={`shadow-custom-sm border rounded-full px-2 sm:px-4 py-1 cursor-pointer text-xs ${filter === "Approved" ? "text-primary" : "text-gray-700"}`}
          >
            Approved
          </button>

          <button
            onClick={() => setFilter("Not Approved")}
            className={`shadow-custom-sm border rounded-full px-2 sm:px-4 py-1 cursor-pointer text-xs ${filter === "Not Approved" ? "text-primary" : "text-gray-700"}`}
          >
            Not Approved
          </button>
        </div>
      </div>

      <div className="relative h-4/5 max-w-3xl overflow-x-auto scrollbar-hide mt-4 bg-white shadow rounded-lg">
        <table className="w-full text-sm text-gray-500">
          <thead className="text-xs text-gray-700 text-left uppercase">
            <tr>
              <th scope="col" className="px-6 py-3">Blog Title & Comment</th>
              <th scope="col" className="px-6 py-3 max-sm:hidden">Date</th>
              <th scope="col" className="px-6 py-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {comments
              .filter((comment) => {
                if ( filter === "Approved" ) return comment.isApproved === true;
                else return comment.isApproved === false;
              })
              .map((comment) => (
                <CommentTableItem key={comment._id} comment={comment} fetchComments={fetchComments} />
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Comments;
