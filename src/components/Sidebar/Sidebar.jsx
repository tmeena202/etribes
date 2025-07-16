import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FiUser,
  FiCalendar,
  FiLogOut,
  FiSettings,
  FiHome,
  FiChevronRight,
} from "react-icons/fi";

const navLinkBase = `flex items-center gap-2 no-underline text-[#a3d9cc] text-[0.97rem] font-medium px-4 py-2 rounded-lg transition-all duration-200 relative group`;
const navLinkActive = `bg-gradient-to-r from-emerald-400/20 to-emerald-600/10 text-emerald-400 font-semibold shadow-inner before:content-[''] before:absolute before:left-0 before:top-1 before:bottom-1 before:w-1 before:rounded-full before:bg-emerald-400`;
const navLinkHover = `hover:bg-emerald-700/30 hover:text-white hover:scale-[1.03] hover:shadow-lg`;

const dropdownLinkBase = `text-[#b6e2d3] text-[0.95rem] px-4 py-2 pl-8 rounded transition-all duration-200 block group relative`;
const dropdownLinkActive = `bg-[#e6f4ef] text-[#1a4d3a] font-semibold before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-2 before:w-1 before:rounded-full before:bg-emerald-400`;
const dropdownLinkHover = `hover:bg-emerald-700/30 hover:text-white hover:scale-[1.03] hover:shadow`;

const Sidebar = () => {
  const [dropdowns, setDropdowns] = useState({
    eventMgmt: true,
    userMgmt: true,
  });

  const toggleDropdown = (key) => {
    setDropdowns((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const DropdownSection = ({ title, icon: Icon, openKey, links }) => {
    const isOpen = dropdowns[openKey];

    return (
      <li className="mb-1">
        <div
          className="flex items-center justify-between cursor-pointer px-4 py-2 rounded-lg gap-2 text-[#a3d9cc] text-[0.97rem] font-medium transition-all duration-200 hover:bg-emerald-700/30 hover:text-white hover:scale-[1.03] hover:shadow-lg group select-none"
          onClick={() => toggleDropdown(openKey)}
        >
          <span className="flex items-center gap-2">
            <Icon className="w-[20px] h-[20px] group-hover:text-emerald-300 transition-colors duration-200" />
            {title}
          </span>
          <span className={`transition-transform duration-200 ml-2 ${isOpen ? "rotate-90" : "rotate-0"}`}>
            <FiChevronRight />
          </span>
        </div>
        <ul
          className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 pointer-events-none"} p-0 m-0`}
        >
          {links.map(({ to, label }) => (
            <li key={to} className="mb-0.5">
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `${dropdownLinkBase} ${dropdownLinkHover} ${isActive ? dropdownLinkActive : ""}`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </li>
    );
  };

  return (
    <aside className="w-[270px] h-screen bg-gradient-to-b from-[#1a4d3a]/90 via-[#174c3a]/95 to-[#1a4d3a]/90 text-white p-3 flex flex-col fixed top-0 left-0 border-r border-[#2d6b4f] z-[1000] overflow-y-auto transition-all duration-350 backdrop-blur-md shadow-2xl scrollbar-none scrollbar-hide hide-scrollbar">
      <div className="flex items-center justify-between mb-6 px-4">
        <div className="font-bold text-xl flex items-center gap-2 relative drop-shadow">
          <span className="text-emerald-400 text-2xl animate-pulse">✦</span>
          <span className="tracking-wide">E-Tribes</span>
        </div>
      </div>

      <nav>
        <ul className="list-none p-0 m-0">
          <li className="mb-1">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${navLinkBase} ${navLinkHover} ${isActive ? navLinkActive : ""}`
              }
            >
              <FiHome className="w-[20px] h-[20px]" />
              <span>Dashboard</span>
            </NavLink>
          </li>

          <li className="mb-1">
            <NavLink
              to="/register"
              className={({ isActive }) =>
                `${navLinkBase} ${navLinkHover} ${isActive ? navLinkActive : ""}`
              }
            >
              <FiUser className="w-[20px] h-[20px]" />
              <span>New Registration</span>
            </NavLink>
          </li>

          <DropdownSection
            title="Event Management"
            icon={FiCalendar}
            openKey="eventMgmt"
            links={[
              { to: "/events/calendar", label: "Calendar" },
              { to: "/events/today", label: "Today's Events" },
              { to: "/events/upcoming", label: "Upcoming Event" },
              { to: "/events/past", label: "Past Event" },
              { to: "/events/all", label: "All Event" },
            ]}
          />

          <DropdownSection
            title="User Management"
            icon={FiUser}
            openKey="userMgmt"
            links={[
              { to: "/user-management/admin-accounts", label: "Admin Accounts" },
              { to: "/user-management/roles", label: "User Roles" },
              { to: "/user-management/role-management", label: "Role Management" },
            ]}
          />

          <li className="mb-1">
            <NavLink
              to="/logout"
              className={({ isActive }) =>
                `${navLinkBase} ${navLinkHover} ${isActive ? navLinkActive : ""}`
              }
            >
              <FiLogOut className="w-[20px] h-[20px]" />
              <span>Logout</span>
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className="mt-auto flex items-center gap-3 px-3 py-3 border-t border-[#2d6b4f] rounded-xl bg-white/10 min-h-[56px] shadow-lg transition-all duration-200 hover:bg-white/20 hover:shadow-2xl backdrop-blur-md">
        <img
          src="https://i.pravatar.cc/50"
          alt="User avatar"
          className="w-10 h-10 rounded-full object-cover border-2 border-emerald-400 shadow-md"
        />
        <div className="flex-1 flex items-center justify-between">
          <span className="text-[1rem] font-semibold text-white drop-shadow">
            Fandawu Punx
          </span>
          <button className="text-[#b6e2d3] text-xl hover:text-emerald-400 transition-colors duration-200">
            <FiSettings />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
