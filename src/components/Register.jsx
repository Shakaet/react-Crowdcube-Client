import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./Provider";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const { createRegistered, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photoURL = form.photoURL.value;
    const password = form.password.value;

    // Password validation
    const uppercaseRegex = /[A-Z]/; // At least one uppercase letter
    const lowercaseRegex = /[a-z]/; // At least one lowercase letter
    const lengthRegex = /^.{6,}$/; // At least 6 characters

    if (!uppercaseRegex.test(password)) {
      toast.error("Password must have at least one uppercase letter.", {
        position: "top-center",
      });
      return;
    }
    if (!lowercaseRegex.test(password)) {
      toast.error("Password must have at least one lowercase letter.", {
        position: "top-center",
      });
      return;
    }
    if (!lengthRegex.test(password)) {
      toast.error("Password must be at least 6 characters long.", {
        position: "top-center",
      });
      return;
    }

    const profileUpdates = {
      displayName: name,
      photoURL: photoURL,
    };

    createRegistered(email, password)
      .then((result) => {
        updateUserProfile(result.user, profileUpdates)
          .then(() => {
            toast.success("Profile updated successfully!", {
              position: "top-center",
            });
            navigate("/"); // Redirect to home page after successful registration
          })
          .catch((error) => {
            console.error("Error updating profile:", error);
            toast.error("Failed to update profile. Please try again.", {
              position: "top-center",
            });
          });
        form.reset();
      })
      .catch((error) => {
        console.error("Error registering user:", error);
        toast.error("Failed to register. Please try again.", {
          position: "top-center",
        });
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 to-pink-500">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-700 mb-4">Register</h1>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="block w-full px-4 py-2 border rounded-md mb-4"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="block w-full px-4 py-2 border rounded-md mb-4"
          />
          <input
            type="text"
            name="photoURL"
            placeholder="Photo URL"
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
            className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition"
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
