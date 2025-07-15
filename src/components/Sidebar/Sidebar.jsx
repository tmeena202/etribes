// src/components/Sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";
import {
  FiUser,
  FiCalendar,
  FiLogOut,
  FiSettings,
  FiHome,
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
              to="/register"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <FiUser />
              <span>New Registration</span>
            </NavLink>
          </li>
          {/* Event Management Dropdown (always open) */}
          <li>
            <div className="sidebar-dropdown-toggle" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderRadius: 8 }}>
              <FiCalendar />
              <span>Event Management</span>
            </div>
            <ul className="sidebar-dropdown" style={{ listStyle: 'none', paddingLeft: 32, marginTop: 4 }}>
              <li>
                <NavLink to="/events/calendar" className={({ isActive }) => (isActive ? "active" : "")}>Calendar</NavLink>
              </li>
              <li>
                <NavLink to="/events/today" className={({ isActive }) => (isActive ? "active" : "")}>Today's Events</NavLink>
              </li>
              <li>
                <NavLink to="/events/upcoming" className={({ isActive }) => (isActive ? "active" : "")}>Upcoming Event</NavLink>
              </li>
              <li>
                <NavLink to="/events/past" className={({ isActive }) => (isActive ? "active" : "")}>Past Event</NavLink>
              </li>
              <li>
                <NavLink to="/events/all" className={({ isActive }) => (isActive ? "active" : "")}>All Event</NavLink>
              </li>
            </ul>
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
        <div className="user-info" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span className="name" style={{ fontWeight: 600, fontSize: 15, color: '#fff' }}>Fandawu Punx</span>
          <button className="user-settings-btn" style={{ background: 'none', border: 'none', color: '#b6e2d3', cursor: 'pointer', padding: 0, marginLeft: 4, fontSize: 18 }}>
            <FiSettings />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;