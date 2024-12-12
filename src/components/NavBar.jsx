import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "./Provider";
import { toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Track mobile menu state

  const { user, signOuts } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOuts()
      .then(() => {
        toast.success("Sign-out Successful!",{
          position: "top-center",
        });
        navigate("/login");
      })
      .catch((error) => {
        //
      });
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-3">
      <div className="container mx-auto flex items-center justify-between">
        {/* Website Logo/Name */}
        <div className="text-2xl font-bold">
          <Link>Crowdcube</Link>
        </div>

        {/* Desktop Links */}
        <ul className="hidden lg:flex space-x-6 font-medium">
          <li>
            <Link to="/" className="hover:text-yellow-300 transition">
              Home
            </Link>
          </li>
          <li>
            <Link to="/allcampaign" className="hover:text-yellow-300 transition">
              All Campaigns
            </Link>
          </li>
          <li>
                <Link to="/addnewcampaign" className="hover:text-yellow-300 transition">
                  Add New Campaign
                </Link>
              </li>
              <li>
                <Link to="/myCampaigns" className="hover:text-yellow-300 transition">
                  My Campaigns
                </Link>
              </li>
              <li>
                <Link to="/myDonation" className="hover:text-yellow-300 transition">
                  My Donations
                </Link>
              </li>

          
        </ul>

        {/* Auth Buttons / Avatar for logged-in user */}
        <div className="flex items-center space-x-4">
          {!user ? (
            <>
              <Link
                to="/login"
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md transition"
              >
                Register
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-5">
              <div className="relative group flex items-center gap-3">
                <img
                  src={user.photoURL || "/default-avatar.png"}
                  alt="User Avatar"
                  className="w-9 h-9 rounded-full cursor-pointer"
                />
                <div className="absolute hidden group-hover:block bg-white text-black rounded-lg shadow-lg py-2 px-4 top-12 left-0 transition">
                  <p>{user.displayName}</p>
                </div>
              </div>
              <button
                onClick={handleSignOut}
                className="text-white hover:text-yellow-500 font-bold transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
            aria-label="Toggle navigation"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden ${isMenuOpen ? "block" : "hidden"}`}>
        <ul className="space-y-2 font-medium mt-4">
          <li>
            <Link to="/" className="hover:text-yellow-300 block transition">
              Home
            </Link>
          </li>
          <li>
            <Link to="/allcampaign" className="hover:text-yellow-300 block transition">
              All Campaigns
            </Link>
          </li>
          <li>
                <Link to="/addnewcampaign" className="hover:text-yellow-300 block transition">
                  Add New Campaign
                </Link>
              </li>
              <li>
                <Link to="/myCampaigns" className="hover:text-yellow-300 block transition">
                  My Campaigns
                </Link>
              </li>
              <li>
                <Link to="/myDonation" className="hover:text-yellow-300 block transition">
                  My Donations
                </Link>
              </li>
          
    
          {!user ? (
            <>
              <li>
                <Link
                  to="/login"
                  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md block transition"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md block transition"
                >
                  Register
                </Link>
              </li>
            </>
          ) : (
            <li>
              <button
                onClick={handleSignOut}
                className="text-red-500 hover:text-red-600 block transition"
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
