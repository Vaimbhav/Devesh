import { useState } from "react";
import { createPost } from "../services/api";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [formData, setFormData] = useState({ title: "", content: "" });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      await createPost(formData, token);
      // Redirect or reload posts
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      console.error(error.response.data);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-300 via-indigo-300 to-purple-200 flex items-center justify-center">
      <div className="bg-slate-300/90 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Create Post
        </h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Title Input */}
          <div>
            <label
              className="block text-lg font-medium text-gray-700 mb-2"
              htmlFor="title"
            >
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Enter title"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              onChange={handleInputChange}
            />
          </div>

          {/* Content Textarea */}
          <div>
            <label
              className="block text-lg font-medium text-gray-700 mb-2"
              htmlFor="content"
            >
              Content
            </label>
            <textarea
              name="content"
              id="content"
              placeholder="Write your content"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 h-32"
              onChange={handleInputChange}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-indigo-700 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Create Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
