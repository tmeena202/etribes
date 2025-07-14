// src/components/Dashboard/Dashboard.jsx
import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import StatsCard from "./StatsCard";
import UserChart from "./SalesChart";
import "./Dashboard.css";
import { FiBell, FiCalendar, FiUser, FiSearch } from "react-icons/fi";

const Dashboard = () => {
  const [dateTime, setDateTime] = useState(dayjs());

  // Panel data in the required order
  const userStats = [
    { title: "Members Approved", value: "0", icon: "✅", color: "#10b981" },
    { title: "Total Members", value: "0", icon: "👥", color: "#3b82f6" },
    { title: "Active Members", value: "0", icon: "🟢", color: "#22c55e" },
    { title: "Members Expired", value: "0", icon: "❌", color: "#ef4444" },
  ];

  // Example data for the single graph
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
    <div className="dashboard">
      {/* Header */}
      <div className="dashboard-header">
        {/* Logo */}
        <div className="header-logo" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <img src="https://etribes.ezcrm.site/assets/img/logo.png" alt="Logo" style={{ height: 48, marginRight: 8 }} />
          <span style={{ fontWeight: 700, fontSize: 18, color: '#1a4d3a' }}>Days Technologies</span>
        </div>
        {/* Search Bar */}
        <div className="header-search" style={{ flex: 1, margin: '0 24px', maxWidth: 320, display: 'flex', alignItems: 'center', background: '#f8fafc', borderRadius: 8, border: '1px solid #e2e8f0', padding: '6px 12px' }}>
          <FiSearch style={{ color: '#64748b', fontSize: 18, marginRight: 8 }} />
          <input type="text" placeholder="Search..." style={{ border: 'none', outline: 'none', background: 'transparent', flex: 1, fontSize: 15 }} />
        </div>
        {/* Actions & User Info */}
        <div className="header-actions" style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <FiCalendar style={{ fontSize: 20, color: '#2563eb' }} />
            <div style={{ fontWeight: 500, fontSize: 15, color: '#334155', minWidth: 120 }}>
              {dateTime.format("MM/DD/YYYY  hh:mm:ss A")}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ position: 'relative' }}>
              <FiBell style={{ fontSize: 22, color: '#2563eb' }} />
              <span style={{ position: 'absolute', top: -6, right: -6, background: '#ef4444', color: '#fff', borderRadius: '50%', fontSize: 11, width: 18, height: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>3</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <img src="https://i.pravatar.cc/40" alt="User" style={{ width: 40, height: 40, borderRadius: '50%', border: '2px solid #10b981', objectFit: 'cover' }} />
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <span style={{ fontWeight: 600, fontSize: 15, color: '#1a4d3a' }}>Rohit Arya</span>
                <span style={{ fontSize: 13, color: '#64748b' }}>Admin</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        {userStats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Single Chart Section */}
      <div className="charts-section">
        <UserChart data={userData} />
      </div>
    </div>
  );
};

export default Dashboard;
