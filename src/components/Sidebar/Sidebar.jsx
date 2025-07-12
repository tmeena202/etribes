// src/components/Sidebar.jsx
import React, { useState } from "react";
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
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

const Sidebar = ({ onToggle }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    const newCollapsedState = !isCollapsed;
    setIsCollapsed(newCollapsedState);
    if (onToggle) {
      onToggle(newCollapsedState);
    }
  };

  return (
    <aside className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header">
        <div className="logo">{!isCollapsed && "E-Tribes"}</div>
        <button className="toggle-btn" onClick={toggleSidebar}>
          {isCollapsed ? <FiChevronRight /> : <FiChevronLeft />}
        </button>
      </div>

      <nav className="menu">
        <ul>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <FiHome />
              {!isCollapsed && <span>Dashboard</span>}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/User"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <FiUser />
              {!isCollapsed && <span>User Management</span>}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/events"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <FiCalendar />
              {!isCollapsed && <span>Events Management</span>}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contacts"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <FiPhone />
              {!isCollapsed && <span>Important Contacts</span>}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/logout"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <FiLogOut />
              {!isCollapsed && <span>Logout</span>}
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
        {!isCollapsed && (
          <div className="user-info">
            <div className="name">Fandawu Punx</div>
            <div className="email">fandawu88@gmail.com</div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;