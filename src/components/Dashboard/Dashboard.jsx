// src/components/Dashboard/Dashboard.jsx
import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import StatsCard from "./StatsCard";
import UserChart from "./SalesChart";
import { FiBell, FiCalendar, FiUser, FiSearch } from "react-icons/fi";

const Dashboard = () => {
  const [dateTime, setDateTime] = useState(dayjs());

  const userStats = [
    { title: "Members Approved", value: "0", icon: "✅", color: "#10b981" },
    { title: "Total Members", value: "0", icon: "👥", color: "#3b82f6" },
    { title: "Active Members", value: "0", icon: "🟢", color: "#22c55e" },
    { title: "Members Expired", value: "0", icon: "❌", color: "#ef4444" },
  ];

  const userData = [
    { month: "Jan", total: 0 },
    { month: "Feb", total: 0 },
    { month: "Mar", total: 0 },
    { month: "Apr", total: 0 },
    { month: "May", total: 0 },
    { month: "Jun", total: 0 },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(dayjs());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <div className="flex justify-between items-center p-5 bg-white border-b border-gray-300 shadow-md w-full box-border flex-shrink-0">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img
            src="https://etribes.ezcrm.site/assets/img/logo.png"
            alt="Logo"
            className="h-12"
          />
          <span className="font-bold text-lg text-green-800">
            Days Technologies
          </span>
        </div>
        {/* Search Bar */}
        <div className="flex items-center bg-gray-200 rounded-lg border border-gray-300 px-3 py-2">
          <FiSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none flex-1 text-sm"
          />
        </div>
        {/* Actions & User Info */}
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-3">
            <FiCalendar className="text-xl text-blue-600" />
            <div
              className="font-medium text-sm text-gray-700 min-w-[120px]"
            >
              {dateTime.format("MM/DD/YYYY  hh:mm:ss A")}
            </div>
          </div>
          <div className="relative flex items-center">
            <FiBell className="text-xl text-blue-600" />
            <span className="absolute top-0 right-0 transform -translate-y-1/2 translate-x-1/2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center font-bold">
              3
            </span>
          </div>
          <div className="flex items-center gap-2">
            <img
              src="https://i.pravatar.cc/40"
              alt="User"
              className="w-10 h-10 rounded-full border-2 border-green-600 object-cover"
            />
            <div className="flex flex-col items-start">
              <span className="font-semibold text-sm text-green-800">
                Rohit Arya
              </span>
              <span className="text-xs text-gray-500">Admin</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {userStats.map((stat, index) => (
            <StatsCard
              key={index}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              color={stat.color}
            />
          ))}
        </div>
        {/* Chart */}
        <div className="mt-10">
          <UserChart data={userData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
