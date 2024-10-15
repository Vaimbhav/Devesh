import axios from "axios";

const API_URL = "http://localhost:8080/api";

// Set default headers
const api = axios.create({
  baseURL: API_URL,
});

// User Registration
export const registerUser = async (userData) => {
  return await api.post("/auth/register", userData);
};

// User Login
export const loginUser = async (userData) => {
  return await api.post("/auth/login", userData);
};

// Fetch Posts
export const fetchPosts = async () => {
  return await api.get("/posts");
};
// Fetch a single post by ID
export const fetchPostById = async (postId) => {
  return await api.get(`/posts/${postId}`);
};


// Create Post
export const createPost = async (postData, token) => {
  return await api.post("/posts", postData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Edit Post
export const editPost = async (postId, postData, token) => {
  return await api.put(`/posts/${postId}`, postData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Delete Post
export const deletePost = async (postId, token) => {
  return await api.delete(`/posts/${postId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
