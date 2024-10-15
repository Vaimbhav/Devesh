import { useState, useEffect } from "react";
import { fetchPosts } from "../services/api";
import BlurBackground from "../components/BlurBackground";
import { SocialIcon } from "react-social-icons";
const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const response = await fetchPosts();
      setPosts(response.data);
    };
    getPosts();
  }, []);

  return (
    <div className="relative min-h-screen mt-10">
      <BlurBackground />
      <h1 className=" text-slate-700 text-center text-2xl">
        EchoThoughts
        <div >
          <SocialIcon url="https://www.linkedin.com/in/deveshyadav1/" />
        </div>
      </h1>
      <p className="animate-pulse text-red-700 text-center">
        {" "}
        After registration, please login to create new post
      </p>
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-slate-300/30 p-4 rounded-lg shadow-lg space-y-2"
            >
              <h2 className="text-lg font-semibold">Title: {post.title}</h2>
              <p className="text-gray-700">Content: {post.content}</p>
              <p className="text-gray-500">By: {post.author.username}</p>
            </div>
          ))}
        </div>
      </div>
      {/* ----------FooTer---------- */}
      <footer className="footer footer-center bg-base-300 text-base-content p-4 flex justify-end items-center flex-col ">
        <aside>
          <p>
            Copyright © {new Date().getFullYear()} - All right reserved by{" "}
            {"DEVESH "}
            <div className="gap-4 flex mt-2 items-center">
              <SocialIcon url="https://www.linkedin.com/in/deveshyadav1/" />
              <SocialIcon url="https://github.com/DEVESH-001" />
            </div>
          </p>
        </aside>
      </footer>
    </div>
  );
};

export default Home;
