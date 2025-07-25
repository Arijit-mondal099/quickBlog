import { useEffect, useRef, useState } from "react";
import Quill from "quill";
import { assets, blogCategories } from "../../assets/assets.js";
import { useAppContext } from "../../context/AppContext.js";
import toast from "react-hot-toast";
import { parse } from "marked";

const AddBlog = () => {
  const [image, setImage] = useState(false);
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [category, setCategory] = useState("Startup");
  const [isPublished, setIsPublished] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false)

  const editorRef = useRef(null);
  const quillRef  = useRef(null);

  const [isAdding, setIsAdding] = useState(false);
  const { axios, fetchBlogs } = useAppContext();

  // Generate content using AI
  const generateContent = async () => {
    if ( !title ) return toast.error("Plase enter the title!");
    setIsGenerating(true);
    try {
      const { data } = await axios.post("/api/v1/blogs/generate", { prompt: title });
      data?.success ? quillRef.current.root.innerHTML = parse(data?.content) : toast.error(data?.message);
    } catch (error) {
      toast.error(error?.message);
    } finally {
      setIsGenerating(false);
    }
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setIsAdding(true);
    try {
      const blog = { 
        title, subTitle, 
        discription: quillRef.current.root.innerHTML, 
        category, isPublished
      };

      const formData = new FormData(); // create form data intance
      formData.append("blog", JSON.stringify(blog)); // set all blog data
      formData.append("imageFile", image); // and files

      const { data } = await axios.post("/api/v1/blogs/add-blog", formData);

      if ( data?.success ) {
        toast.success("Blog added successfully");
        setTitle("");
        setSubTitle("");
        setImage(false);
        setCategory("Startup");
        quillRef.current.root.innerHTML = "";
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      toast.error(error?.message);
    } finally {
      setIsAdding(false);
      await fetchBlogs();
    }
  };

  useEffect(() => {
    // Initiate quill only once
    if ( !quillRef.current && editorRef.current ) {
      quillRef.current = new Quill(editorRef.current, { theme: "snow" });
    }
  }, [])
  
  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex-1 bg-blue-50/50 text-gray-600 h-full overflow-scroll"
    >
      <div className="bg-white w-full max-w-3xl p-4 md:p-10 sm:m-10 shadow rounded">
        <p>Upload Thumbnail</p> 
        <label htmlFor="image">
          <img src={!image ? assets.upload_area : URL.createObjectURL(image)} alt="upload_area" className="mt-2 h-16 rounded cursor-pointer" />
          <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden required />
        </label>

        <p className="mt-4">Blog Title</p>  
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Type here" required className="w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded" />

        <p className="mt-4">Sub Title</p>  
        <input type="text" value={subTitle} onChange={(e) => setSubTitle(e.target.value)} placeholder="Type here" required className="w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded" />

        <p className="mt-4">Blog Description</p>
        <div className="max-w-lg h-74 pb-16 sm:pb-10 pt-2 relative">
          {/* Quill editor container */}
          <div ref={editorRef} />

          {/* generate content with ai button */}
          <button 
            type="button" 
            onClick={generateContent} 
            disabled={isGenerating}
            className="absolute bottom-1 right-2 ml-2 text-xs text-white bg-black/70 px-4 py-1.5 rounded hover:underline cursor-pointer"
          >
            {isGenerating ? "Generating..." : "Generate with AI"}
          </button>
        </div>

        <p className="mt-4">Blog Category</p>
        <select onChange={(e) => setCategory(e.target.value)} name="category" className="mt-2 px-3 py-2 border text-gray-500 border-gray-300 outline-none rounded">
          <option value="">Select category</option>
          {blogCategories.map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
        </select>

        <div className="mt-4 flex items-center gap-2">
          <p>Publish Now</p>
          <input type="checkbox" checked={isPublished} onChange={(e) => setIsPublished(e.target.checked)} className="scale-125 cursor-pointer"/>
        </div>

        <button 
          disabled={isAdding} 
          type="submit" 
          className="mt-8 w-40 h-10 bg-primary text-white rounded cursor-pointer text-sm hover:scale-105 transition-all"
        >
          {isAdding ? "Adding..." : "Add Blog"}
        </button>
      </div>
    </form>
  );
};

export default AddBlog;
