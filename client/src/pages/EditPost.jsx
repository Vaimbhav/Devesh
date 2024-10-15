import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchPosts, editPost } from "../services/api";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ title: "", content: "" });

  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await fetchPosts(); // Fetch all posts
        const post = response.data.find((post) => post._id === id);
        setFormData(post);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };
    getPost();
  }, [id]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      await editPost(id, formData, token);
      navigate("/");
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-300 via-indigo-300 to-purple-200 flex items-center justify-center">
      <div className="bg-slate-300/90 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Edit Post
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
              value={formData.title}
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
              value={formData.content}
              onChange={handleInputChange}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-indigo-700 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Update Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPost;
