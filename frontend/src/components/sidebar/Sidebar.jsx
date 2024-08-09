import React, { memo } from "react";
import { FaArrowAltCircleLeft, FaUserCircle } from "react-icons/fa";
import { IoCreateOutline } from "react-icons/io5";
import { AiOutlineProduct } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./sidebar.scss";
import { useDispatch, useSelector } from "react-redux";
import { RiLogoutBoxLine } from "react-icons/ri";
import { logout } from "../../context/slices/authSlice";
import { useGetProfileQuery } from "../../context/api/userApi";
import { Avatar } from "antd";

const Sidebar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  let { data } = useGetProfileQuery();
  let uCase = data?.payload?.fname.slice(0, 1).toUpperCase();
  console.log(data);

  return (
    <div className="sidebar">
      <h2 className="sidebar__logo">
        <Link to={"/profile"}>
          <Avatar
            style={{
              backgroundColor: "white",
              verticalAlign: "middle",
              fontSize: "22px",
              color: "black",
            }}
            size="large"
          >
            {uCase}
          </Avatar>
        </Link>
        <span>{data?.payload?.fname}</span>
      </h2>
      <ul className="sidebar__collection">
        <li className="sidebar__item">
          <Link
            className={`sidebar__link ${
              isActive("/admin/blogCreate") ? "active" : ""
            }`}
            to={"/admin/blogCreate"}
          >
            <IoCreateOutline />
            <span>Create blog</span>
          </Link>
        </li>
        <li className="sidebar__item">
          <Link
            className={`sidebar__link ${
              isActive("/admin/blogManage") ? "active" : ""
            }`}
            to={"/admin/blogManage"}
          >
            <AiOutlineProduct />
            <span>Manage Blog</span>
          </Link>
        </li>
        {data?.payload?.role === "owner" ? (
          <li className="sidebar__item">
            <Link
              className={`sidebar__link ${
                isActive("/admin/userManage") ? "active" : ""
              }`}
              to={"/admin/userManage"}
            >
              <AiOutlineProduct />
              <span>Manage users</span>
            </Link>
          </li>
        ) : (
          <></>
        )}
        {data?.payload?.role === "owner" ? (
          <li className="sidebar__item">
            <Link
              className={`sidebar__link ${
                isActive("/admin/createUser") ? "active" : ""
              }`}
              to={"/admin/createUser"}
            >
              <AiOutlineProduct />
              <span>Create user</span>
            </Link>
          </li>
        ) : (
          <></>
        )}

        <li className="sidebar__item">
          <Link
            className={`sidebar__link ${
              isActive("/admin/profile") ? "active" : ""
            }`}
            to={"/admin/profile"}
          >
            <FaUserCircle />
            <span>Profile</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default memo(Sidebar);
