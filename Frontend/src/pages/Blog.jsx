import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "motion/react";
import moment from 'moment';
import toast from "react-hot-toast";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Comment from "../components/Comment";
import CommentForm from "../components/CommentForm";
import Loader from "../components/Loader";

import { assets } from "../assets/assets.js";
import { useAppContext } from "../context/AppContext.js";

const Blog = () => {
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const { id } = useParams();
  const { axios } = useAppContext();

  const fetchBogData = async () => {
    try {
      const { data } = await axios.get(`/api/v1/blogs/${id}`);
      data?.success ? setBlog(data?.blog) : toast.error(data?.message);
    } catch (error) {
      toast.error(error?.message);
    }
  };

  const fetchBlogComments = async () => {
    try {
      const { data } = await axios.post("/api/v1/comments", { blogId: id });
      data?.success ? setComments(data?.comments) : toast.error(data?.message);
    } catch (error) {
      toast.error(error?.message);
    }
  };

  const addComment = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/comments/add-comment", { blogId: id, name, content });
      data?.success ? toast.success("Comment added for review") : toast.error(data?.message);
      setName("");
      setContent("");
    } catch (error) {
      toast.error(error?.message);
    }
  }

  useEffect(() => {
    fetchBogData();
    fetchBlogComments();
  }, []);

  return blog ? (
    <div className="relative">
      <Navbar />

      {/* Blog header*/}
      <motion.div 
        className="text-center mt-15 sm:mt-20 text-gray-600"
        initial={{ y: 15, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "linear" }}
      >
        <p className="text-primary py-4 font-medium">Published on {moment(blog?.createdAt).format("MMMM Do YYYY")}</p>
        <h1 className="text-gray-800 text-2xl sm:text-5xl font-semibold max-w-2xl mx-auto">{blog?.title}</h1>
        <h2 className="px-3 my-5 max-w-lg truncate mx-auto">{blog?.subTitle}</h2>
        <p className="inline-block py-1 px-4 rounded-full mb-6 border border-primary/35 text-sm bg-primary/5 font-medium text-primary">Arijit Mondal</p>
      </motion.div>

      {/* Blog content */}
      <div className="mx-5 max-w-5xl md:mx-auto my-10 mt-6">
        <motion.img src={blog?.image} alt="blog-image" className="rounded-3xl mb-5 w-full" 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5, ease: "linear" }}
        />

        <motion.div className="rich-text max-w-3xl mx-auto" dangerouslySetInnerHTML={{ __html: blog?.discription}} 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5, ease: "linear" }}
        />

        {/* Comments section */}
        <div className="mt-14 mb-10 max-w-3xl mx-auto">
          <p className="text-base text-gray-800 mb-4 font-semibold">Comments ({comments.length})</p>

          <div className="flex flex-col gap-4">
            {comments.map((item) => <Comment key={item._id} comment={item} />)}
          </div>     

          {/* Add comments section */}
          <CommentForm name={name} setName={setName} content={content} setContent={setContent} onSubmit={addComment} />

          {/* Share links */}
          <div className="my-24 max-w-3xl mx-auto">
            <p className="font-semibold my-4">Share this article on social media</p>
            <div className="flex">
              <img src={assets.facebook_icon} width={50} alt="facebook" />
              <img src={assets.twitter_icon} width={50} alt="twitter" />
              <img src={assets.googleplus_icon} width={50} alt="googleplus" />
            </div>
          </div>
        </div>
      </div>

      <Footer />

      <img src={assets.gradientBackground} alt="gradientBackground" className="absolute -top-50 -z-1 opacity-70" />
    </div>
  ) : (
    <Loader />
  );
};

export default Blog;
