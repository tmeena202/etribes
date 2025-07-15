// src/components/Sidebar.jsx
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";
import {
  FiUser,
  FiCalendar,
  FiLogOut,
  FiSettings,
  FiHome,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

const Sidebar = () => {
  const [eventMgmtOpen, setEventMgmtOpen] = useState(true);
  const [userMgmtOpen, setUserMgmtOpen] = useState(true);
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo">E-Tribes</div>
      </div>
      <nav className="menu">
        <ul>
          <li>
            <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
              <FiHome />
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/register" className={({ isActive }) => (isActive ? "active" : "")}>
              <FiUser />
              <span>New Registration</span>
            </NavLink>
          </li>

          {/* Event Management */}
          <li>
            <div className="sidebar-dropdown-toggle" onClick={() => setEventMgmtOpen((open) => !open)} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <FiCalendar />
                <span>Event Management</span>
              </span>
              <span style={{ transition: 'transform 0.2s', display: 'flex', alignItems: 'center', marginLeft: 8, transform: eventMgmtOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}>
                <FiChevronRight />
              </span>
            </div>
            {eventMgmtOpen && (
              <ul className="sidebar-dropdown">
                <li>
                  <NavLink to="/events/calendar" className={({ isActive }) => (isActive ? "active" : "")}>
                    Calendar
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/events/today" className={({ isActive }) => (isActive ? "active" : "")}>
                    Today's Events
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/events/upcoming" className={({ isActive }) => (isActive ? "active" : "")}>
                    Upcoming Event
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/events/past" className={({ isActive }) => (isActive ? "active" : "")}>
                    Past Event
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/events/all" className={({ isActive }) => (isActive ? "active" : "")}>
                    All Event
                  </NavLink>
                </li>
              </ul>
            )}
          </li>

          {/* User Management */}
          <li>
            <div className="sidebar-dropdown-toggle" onClick={() => setUserMgmtOpen((open) => !open)} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <FiUser />
                <span>User Management</span>
              </span>
              <span style={{ transition: 'transform 0.2s', display: 'flex', alignItems: 'center', marginLeft: 8, transform: userMgmtOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}>
                <FiChevronRight />
              </span>
            </div>
            {userMgmtOpen && (
              <ul className="sidebar-dropdown">
                <li>
                  <NavLink to="/user-management/admin-accounts" className={({ isActive }) => (isActive ? "active" : "")}>
                    Admin Accounts
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/user-management/roles" className={({ isActive }) => (isActive ? "active" : "")}>
                    User Roles
                  </NavLink>
                </li>
              </ul>
            )}
          </li>

          <li>
            <NavLink to="/logout" className={({ isActive }) => (isActive ? "active" : "")}>
              <FiLogOut />
              <span>Logout</span>
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className="user-card">
        <img src="https://i.pravatar.cc/50" alt="User avatar" className="avatar" />
        <div className="user-info">
          <span className="name">Fandawu Punx</span>
          <button className="user-settings-btn">
            <FiSettings />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
