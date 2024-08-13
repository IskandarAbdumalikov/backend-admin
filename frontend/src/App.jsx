import useSelection from "antd/es/table/hooks/useSelection.js";
import React, { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Home = lazy(() => import("./pages/Home/Home.jsx"));
const Admin = lazy(() => import("./pages/Admin/Admin.jsx"));
const Login = lazy(() => import("./pages/Login/Login.jsx"));

const Auth = lazy(() => import("./auth/Auth.jsx"));
const BlogCreate = lazy(() =>
  import("./pages/Admin/blogCreate/BlogCreate.jsx")
);
const BlogManage = lazy(() =>
  import("./pages/Admin/blogManage/BlogManage.jsx")
);
const Profile = lazy(() => import("./pages/Admin/profile/Profile.jsx"));
const UserCreate = lazy(() =>
  import("./pages/Admin/userCreate/UserCreate.jsx")
);
const UserManage = lazy(() =>
  import("./pages/Admin/userManage/UserManage.jsx")
);
const ProductsManage = lazy(() =>
  import("./pages/Admin/products/ProductsManage.jsx")
);
const ProductsCreate = lazy(() =>
  import("./pages/Admin/products/ProductsCreate.jsx")
);
const ProductsDetail = lazy(() =>
  import("./pages/Admin/products/ProductsDetail.jsx")
);

const App = () => {
  let isLogin = useSelection((state) => state.auth.token);
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
            <Route path="createUser" element={<UserCreate />} />
            <Route path="userManage" element={<UserManage />} />
            <Route path="blogManage" element={<BlogManage />} />
            <Route path="profile" element={<Profile />} />
            <Route path="productsManage" element={<ProductsManage />} />
            <Route path="productsCreate" element={<ProductsCreate />} />
            <Route path="products/:productId" element={<ProductsDetail />} />
          </Route>
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
};

export default App;
