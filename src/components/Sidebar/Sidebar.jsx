// src/components/Sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";
import {
  FiUser,
  FiCalendar,
  FiLogOut,
  FiSettings,
  FiShield,
  FiHome,
  FiPhone,
} from "react-icons/fi";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo">E-Tribes</div>
      </div>

      <nav className="menu">
        <ul>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <FiHome />
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/User"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <FiUser />
              <span>User Management</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/events"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <FiCalendar />
              <span>Events Management</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contacts"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <FiPhone />
              <span>Important Contacts</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/logout"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <FiLogOut />
              <span>Logout</span>
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className="user-card">
        <img
          src="https://i.pravatar.cc/50"
          alt="User avatar"
          className="avatar"
        />
        <div className="user-info">
          <div className="name">Fandawu Punx</div>
          <div className="email">fandawu88@gmail.com</div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
