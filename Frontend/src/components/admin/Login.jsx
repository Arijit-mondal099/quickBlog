import { useState } from "react";
import { motion } from "motion/react";
import { useAppContext } from "../../context/AppContext.js";
import toast from "react-hot-toast";

const Login = () => {
  const { axios, setToken } = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/admin/login", { email, password });

      if ( data?.token ) { // check that token is present or not
        setToken(data?.token); // set the tokrn
        localStorage.setItem("token", data?.token); // set token also at the localstorage
        axios.defaults.headers.common["Authorization"] = `${data?.token}`; // and set token for all api request
        toast.success("Admin login successfully.")
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      toast.error(error?.message)
    }
  };

  return (
    <div className="flex items-center justify-center h-screen w-full">
      <motion.div 
        className="w-full max-w-sm p-6 max-md:m-6 border border-primary/30 shadow-xl shadow-primary/15 rounded-lg"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "linear" }}
      >
        <div className="text-center w-full py-6">
          <h1 className="text-3xl font-bold">
            <span className="text-primary">Admin</span> Login
          </h1>

          <p className="font-light">
            Enter your credentials to access the admin panel
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-2 mt-5">
          <div className="flex flex-col">
            <label htmlFor="email" className="text-gray-500 ml-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Your email id"
              required
              className="border-b-2 border-gray-300 p-2 outline-none mb-6"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="text-gray-500 ml-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Your password"
              required
              className="border-b-2 border-gray-300 p-2 outline-none mb-6"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="bg-primary text-white py-3 rounded-md font-medium hover:scale-102 transition-all cursor-pointer"
          >
            Login
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
