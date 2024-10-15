
import { useNavigate } from "react-router-dom";
import { deletePost } from "../services/api";
import PropTypes from 'prop-types';

const PostList = ({ posts, auth }) => {
  const navigate = useNavigate();

  const handleDelete = async (postId) => {
    const token = localStorage.getItem("token");
    try {
      await deletePost(postId, token);
      window.location.reload(); // Refresh to reflect deletion
    } catch (error) {
      console.error(error.response.data);
    }
  };

  return (
    <div>
      {posts.map((post) => (
        <div key={post._id}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <p>By: {post.author.username}</p>
          {auth && (
            <>
              <button onClick={() => navigate(`/edit/${post._id}`)}>
                Edit Post
              </button>
              <button onClick={() => handleDelete(post._id)}>Delete</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};
PostList.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      author: PropTypes.shape({
        username: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
  auth: PropTypes.bool.isRequired,
};

export default PostList;

