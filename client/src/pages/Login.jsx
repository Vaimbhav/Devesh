import { useState } from "react";
import PropTypes from "prop-types";
import { loginUser } from "../services/api";
import BlurBackground from "../components/BlurBackground";
import { useNavigate } from "react-router-dom";

const Login = ({ setAuth }) => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [loginMessage, setLoginMessage] = useState(null); // State for login status
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(formData);
      localStorage.setItem("token", response.data.token);
      setAuth(true);
      setLoginMessage("success");

      // Navigate to home page after 2 seconds
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error(error.response.data);
      setLoginMessage("error");
    }
  };

  return (
    <section className="relative flex flex-wrap lg:h-screen lg:items-center">
      <BlurBackground />
      <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-2xl font-bold sm:text-3xl">Get started </h1>
        </div>

        {/* Conditionally show alerts */}
        {loginMessage === "success" && (
          <div className="flex justify-center items-center">
            <div className=" w-full max-w-sm overflow-hidden bg-slate-600 rounded-lg shadow-md dark:bg-gray-800">
              <div className="flex items-center justify-center w-12 bg-emerald-500">
                <svg
                  className="w-6 h-6 text-white fill-current"
                  viewBox="0 0 40 40"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM16.6667 28.3333L8.33337 20L10.6834 17.65L16.6667 23.6166L29.3167 10.9666L31.6667 13.3333L16.6667 28.3333Z" />
                </svg>
              </div>
              <div className="px-4 py-2 -mx-3">
                <div className="mx-3 ">
                  <span className="font-semibold text-emerald-500 dark:text-emerald-400">
                    Success
                  </span>
                  <p className="text-sm text-gray-600 dark:text-gray-200">
                    You are successfully logged in!
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
        {loginMessage === "error" && (
          <div className="flex justify-center items-center">
            <div className="flex w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800   ">
              <div className="flex items-center justify-center w-12 bg-red-500 ">
                <svg
                  className="w-6 h-6 text-white fill-current "
                  viewBox="0 0 40 40"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M20 3.36667C10.8167 3.36667 3.3667 10.8167 3.3667 20C3.3667 29.1833 10.8167 36.6333 20 36.6333C29.1834 36.6333 36.6334 29.1833 36.6334 20C36.6334 10.8167 29.1834 3.36667 20 3.36667ZM19.1334 33.3333V22.9H13.3334L21.6667 6.66667V17.1H27.25L19.1334 33.3333Z" />
                </svg>
              </div>
              <div className="px-4 py-2 -mx-3 ">
                <div className="mx-3">
                  <span className="font-semibold text-red-500 dark:text-red-400">
                    Error
                  </span>
                  <p className="text-sm text-gray-600 dark:text-gray-200">
                    Wrong Inputs :(
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="mx-auto mb-0 mt-8 max-w-md space-y-4"
        >
          <input
            name="username"
            placeholder="Enter Your Username"
            onChange={handleInputChange}
            className="w-full rounded-lg border-black-200 p-4 pe-12 text-sm shadow-sm"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleInputChange}
            className="w-full rounded-lg border-black-200 p-4 pe-12 text-sm shadow-sm"
          />

          <div className="relative h-64 w-full sm:h-96 lg:h-full lg:w-1/2">
            <button
              type="submit"
              className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-bold text-white"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
Login.propTypes = {
  setAuth: PropTypes.func.isRequired,
};

export default Login;
