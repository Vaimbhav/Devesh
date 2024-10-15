import { useState } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ auth, setAuth }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setAuth(false);
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800/90 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo / Home */}
        <Link to="/" className="text-white text-lg font-semibold">
          Home
        </Link>

        {/* Mobile Menu Toggle Button */}
        <button
          className="text-white block md:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            ></path>
          </svg>
        </button>

        {/* Links for Larger Screens */}
        <div className="hidden md:flex space-x-4">
          {auth ? (
            <>
              <Link to="/create" className="text-white">
                Create Post
              </Link>
              <Link to="/my-posts" className="text-white">
                My Posts
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white">
                Login
              </Link>
              <Link to="/register" className="text-white">
                Register
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden ${isOpen ? "block" : "hidden"} bg-gray-800 mt-2`}
      >
        <div className="flex flex-col space-y-4 p-4">
          {auth ? (
            <>
              <Link to="/create" className="text-white">
                Create Post
              </Link>
              <Link to="/my-posts" className="text-white">
                My Posts
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white">
                Login
              </Link>
              <Link to="/register" className="text-white">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
Navbar.propTypes = {
  auth: PropTypes.bool.isRequired,
  setAuth: PropTypes.func.isRequired,
};


export default Navbar;
