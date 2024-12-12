import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "./Provider";
import { useContext } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const { loginSetup, googleSign } = useContext(AuthContext);
  const navigate = useNavigate();

  let location= useLocation()
  const redirectPath = location.state?.from || "/";

  const handleGoogle = () => {
    googleSign()
      .then(() => {
        toast.success("Google Sign-In Successful!",{
          position: "top-center",
        });
        navigate(redirectPath)
       
      })
      .catch((error) => {
        toast.error(`Error: ${error.message}`,{
          position: "top-center",
        });
        
      });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    let email = e.target.email.value;
    let password = e.target.password.value;

    loginSetup(email, password)
      .then(() => {
        toast.success("Sign-In Successful!",
          {
            position: "top-center",
          }
        );
        navigate(redirectPath)
        
      })
      .catch((error) => {
        toast.error("Invalid email or password. Please try again.",{
          position: "top-center",
        });
        
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500">
      <ToastContainer /> {/* Added ToastContainer here */}
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-700 mb-4">Login</h1>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="block w-full px-4 py-2 border rounded-md mb-4"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="block w-full px-4 py-2 border rounded-md mb-4"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
          >
            Login
          </button>
        </form>
        <button
          onClick={handleGoogle}
          className="w-full mt-4 bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition"
        >
          Login with Google
        </button>
        <p className="mt-4 text-center text-gray-600">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
