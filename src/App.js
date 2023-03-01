import logo from "./logo.svg";
import "./App.css";

import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Dashboard from "./components/dashboard/Dashboard";
import Category from "./components/category/Category";
import SubCategory from "./components/subCategory/SubCategory";
import Post from "./components/post/Post";
import PostForm from "./components/post/PostForm";
import Tag from "./components/tag/Tag";
import Slide from "./components/slide/Slide";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import AuthGuard from "./guard/AuthGuard";
// import Test from "./components/test/Test";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <AuthGuard>
                <Layout />
              </AuthGuard>
            }
          >
            {/* <Route path="/" element={<Navigate to="/dashboard" />}></Route> */}
            <Route index element={<Dashboard />}></Route>
            <Route path="dashboard" element={<Dashboard />}></Route>
            <Route path="category" element={<Category />}></Route>
            <Route path="subCategory" element={<SubCategory />}></Route>
            <Route path="post" element={<Post />}></Route>
            <Route path="post/add" element={<PostForm />}></Route>
            <Route path="post/edit/:id" element={<PostForm />}></Route>
            <Route path="tag" element={<Tag />}></Route>
            <Route path="slide" element={<Slide />}></Route>
            {/* <Route path="test" element={<Test />}></Route> */}
          </Route>

          <Route path="login" element={<Login />}></Route>
          <Route path="register" element={<Register />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
