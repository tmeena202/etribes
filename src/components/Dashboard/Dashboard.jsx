// src/components/Dashboard/AdvancedDashboard.jsx
import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";
import dayjs from "dayjs";
import "./Dashboard.css";

const AdvancedDashboard = () => {
  const [dateTime, setDateTime] = useState(dayjs());

  const graphData = [
    { month: "Jan", active: 30, inactive: 10 },
    { month: "Feb", active: 40, inactive: 15 },
    { month: "Mar", active: 35, inactive: 12 },
    { month: "Apr", active: 50, inactive: 20 },
    { month: "May", active: 45, inactive: 25 },
    { month: "Jun", active: 60, inactive: 30 },
    { month: "Jul", active: 70, inactive: 40 },
    { month: "Jan", active: 30, inactive: 10 },
    { month: "Feb", active: 40, inactive: 15 },
    { month: "Mar", active: 35, inactive: 12 },
    { month: "Apr", active: 50, inactive: 20 },
    { month: "May", active: 45, inactive: 25 },
    { month: "Jun", active: 60, inactive: 30 },
    { month: "Jul", active: 70, inactive: 40 },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(dayjs());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="advanced-dashboard">
      <header className="dashboard-header">
        <div className="left-section">
          <input type="text" placeholder="Search..." className="search-bar" />
        </div>
        <div className="center-section">
          <p className="date-time">
            {dateTime.format("dddd, MMM D, YYYY - h:mm:ss A")}
          </p>
          <p className="year">Year: {dateTime.format("YYYY")}</p>
        </div>
        <div className="right-section">
          <button className="add-event-btn">+ Add Event</button>
          <img
            src="https://i.pravatar.cc/40"
            alt="Profile"
            className="profile-icon"
          />
        </div>
      </header>

      <section className="graph-section">
        <h2>Membership Summary</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={graphData}
            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend verticalAlign="top" />
            <Bar
              dataKey="active"
              stackId="a"
              fill="#22c55e"
              name="Active Members"
            />
            <Bar
              dataKey="inactive"
              stackId="a"
              fill="#ef4444"
              name="Inactive Members"
            />
          </BarChart>
        </ResponsiveContainer>
      </section>
      <section className="stat-cards">
        <div className="card user-card active">
          <div className="card-content">
            <h4>Active Members</h4>
            <p className="count">12</p>
            <a href="#">View active members</a>
          </div>
          <div className="icon-box">👤</div>
        </div>

        <div className="card user-card inactive">
          <div className="card-content">
            <h4>Inactive Members</h4>
            <p className="count">5</p>
            <a href="#">View inactive members</a>
          </div>
          <div className="icon-box">🚫</div>
        </div>

        <div className="card user-card expired">
          <div className="card-content">
            <h4>Membership Expired</h4>
            <p className="count">3</p>
            <a href="#">View expired</a>
          </div>
          <div className="icon-box">📅</div>
        </div>
      </section>
    </div>
  );
};

export default AdvancedDashboard;
