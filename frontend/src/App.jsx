import useSelection from "antd/es/table/hooks/useSelection.js";
import React, { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
const Home = lazy(() => import("./pages/Home/Home.jsx"));
const Admin = lazy(() => import("./pages/Admin/Admin.jsx"));
const Login = lazy(() => import("./pages/Login/Login.jsx"));

const Auth = lazy(() => import("./auth/Auth.jsx"));
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BlogCreate from "./pages/Admin/blogCreate/BlogCreate.jsx";
import BlogManage from "./pages/Admin/blogManage/BlogManage.jsx";
import Profile from "./pages/Admin/profile/Profile.jsx";

const App = () => {
  let isLogin = useSelection(state => state.auth.token);
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<Navigate to={isLogin ? "/admin" : "/login"} replace />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Auth />}>
          <Route path="admin" element={<Admin />}>
            <Route path="blogCreate" element={<BlogCreate />} />
            <Route path="blogManage" element={<BlogManage />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
};

export default App;
