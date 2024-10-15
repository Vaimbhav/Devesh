// import { useState, useEffect } from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import CreatePost from "./pages/CreatePost";
// import EditPost from "./pages/EditPost";
// import MyPosts from "./components/MyPosts"; // Import MyPosts component

// const App = () => {
//   const [auth, setAuth] = useState(false);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     setAuth(!!token);
//   }, []);

//   return (
//     <Router>
//       <Navbar auth={auth} setAuth={setAuth} />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Login setAuth={setAuth} />} />
//         <Route path="/register" element={<Register />} />

//         {auth && (
//           <>
//             <Route path="/create" element={<CreatePost />} />

//             <Route path="/edit/:id" element={<EditPost />} />
//             <Route path="/my-posts" element={<MyPosts />} />
//             {/* Add MyPosts route */}
//           </>
//         )}
//       </Routes>
//     </Router>
//   );
// };

// export default App;



import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import MyPosts from "./components/MyPosts";

// PrivateRoute component to guard routes
const PrivateRoute = ({ auth, children }) => {
  return auth ? children : <Navigate to="/login" />;
};

const App = () => {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setAuth(!!token);
  }, []);

  return (
    <Router>
      <Navbar auth={auth} setAuth={setAuth} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setAuth={setAuth} />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/create"
          element={
            <PrivateRoute auth={auth}>
              <CreatePost />
            </PrivateRoute>
          }
        />

        <Route
          path="/edit/:id"
          element={
            <PrivateRoute auth={auth}>
              <EditPost />
            </PrivateRoute>
          }
        />

        <Route
          path="/my-posts"
          element={
            <PrivateRoute auth={auth}>
              <MyPosts />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
