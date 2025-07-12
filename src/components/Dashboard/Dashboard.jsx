// src/components/Dashboard/Dashboard.jsx
import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import StatsCard from "./StatsCard";
import ActivityItem from "./ActivityItem";
import UserChart from "./SalesChart";
import UserStatusChart from "./ConversionChart";
import AddEventForm from "./AddEventForm";
import "./Dashboard.css";

const Dashboard = () => {
  const [dateTime, setDateTime] = useState(dayjs());
  const [showAddEvent, setShowAddEvent] = useState(false);

  const userData = [
    { month: "Jan", active: 450, inactive: 120, expired: 30, total: 600 },
    { month: "Feb", active: 520, inactive: 140, expired: 35, total: 695 },
    { month: "Mar", active: 480, inactive: 110, expired: 25, total: 615 },
    { month: "Apr", active: 610, inactive: 160, expired: 40, total: 810 },
    { month: "May", active: 580, inactive: 150, expired: 45, total: 775 },
    { month: "Jun", active: 720, inactive: 180, expired: 50, total: 950 },
  ];

  const userStats = [
    { title: "Total Users", value: "1,247", change: "+12%", icon: "👥", color: "#3b82f6" },
    { title: "Active Users", value: "892", change: "+8%", icon: "✅", color: "#10b981" },
    { title: "Inactive Users", value: "245", change: "-3%", icon: "⏸️", color: "#f59e0b" },
    { title: "Expired Users", value: "110", change: "+5%", icon: "❌", color: "#ef4444" },
  ];

  const recentActivities = [
    { id: 1, customer: "John Smith", action: "Account activated", amount: "Active", time: "2 min ago" },
    { id: 2, customer: "Sarah Johnson", action: "Subscription renewed", amount: "Active", time: "5 min ago" },
    { id: 3, customer: "Mike Wilson", action: "Account expired", amount: "Expired", time: "10 min ago" },
    { id: 4, customer: "Emma Davis", action: "Account deactivated", amount: "Inactive", time: "15 min ago" },
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
        <div className="header-content">
          <h1>User Management Dashboard</h1>
          <div className="time-date-display">
            <div className="current-time">{dateTime.format("HH:mm:ss")}</div>
            <div className="current-date">{dateTime.format("dddd, MMMM D, YYYY")}</div>
          </div>
        </div>
        <div className="header-actions">
          <button className="btn-primary" onClick={() => setShowAddEvent(true)}>+ Add Event</button>
          <button className="btn-primary">+ Add User</button>
          <button className="btn-secondary">Export Users</button>
        </div>
      </div>

      {showAddEvent && <AddEventForm onClose={() => setShowAddEvent(false)} />}

      {/* Stats Cards */}
      <div className="stats-grid">
        {userStats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Charts Section */}
      <div className="charts-section">
        <UserChart data={userData} />
        <UserStatusChart data={userData} />
      </div>

      {/* Recent Activity */}
      <div className="activity-section">
        <div className="activity-card">
          <div className="card-header">
            <h3>Recent User Activities</h3>
            <button className="view-all-btn">View All</button>
          </div>
          <div className="activity-list">
            {recentActivities.map((activity) => (
              <ActivityItem key={activity.id} {...activity} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
