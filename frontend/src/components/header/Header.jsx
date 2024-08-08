import React from "react";
import "./header.scss";
import { RiLogoutBoxFill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../context/slices/authSlice";

const Header = () => {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let handleLogOut = () => {
    dispatch(logout());
    navigate("/login");
  };
  return (
    <header className="header">
      <button onClick={handleLogOut}>
        <span>Log out</span><RiLogoutBoxFill />
      </button>
    </header>
  );
};

export default Header;
