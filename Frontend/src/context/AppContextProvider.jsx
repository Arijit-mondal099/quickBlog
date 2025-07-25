import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "./AppContext";
import axios from "axios";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const AppContextProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get("/api/v1/blogs");
      data.success
        ? setBlogs(data.blogs)
        : toast.error(data?.message || "Something went wrong!");
    } catch (error) {
      toast.error(error?.message);
    }
  };

  useEffect(() => {
    fetchBlogs(); // fetcah blogs

    // fetch token from localstorage, because we set the token when user war login
    const token = localStorage.getItem("token");

    // if token exist then set it into token state & set all api request header
    if ( token ) {
      setToken(token);
      axios.defaults.headers.common["Authorization"] = `${token}`;
    }
  }, []);

  const VALUE = {
    axios, navigate, token, setToken, blogs, setBlogs, input, setInput, isLoading, setIsLoading, fetchBlogs,
  };

  return <AppContext.Provider value={VALUE}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
