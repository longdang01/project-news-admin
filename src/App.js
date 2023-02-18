import logo from "./logo.svg";
import "./App.css";

import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Layout from "./features/layout/Layout";
import Dashboard from "./features/dashboard/Dashboard";
import Category from "./features/category/Category";
import Post from "./features/post/Post";
import Tag from "./features/tag/Tag";
import Test from "./features/test/Test";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* <Route path="/" element={<Navigate to="/dashboard" />}></Route> */}
            <Route index element={<Dashboard />}></Route>
            <Route path="dashboard" element={<Dashboard />}></Route>
            <Route path="category" element={<Category />}></Route>
            <Route path="post" element={<Post />}></Route>
            <Route path="tag" element={<Tag />}></Route>
            <Route path="test" element={<Test />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
