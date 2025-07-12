import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

const UserStatusChart = ({ data }) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="chart-card">
      <h3>User Status Trends</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis dataKey="month" stroke="#64748b" />
          <YAxis stroke="#64748b" />
          <Tooltip content={<CustomTooltip />} />
          <Line 
            type="monotone" 
            dataKey="active" 
            stroke="#10b981" 
            strokeWidth={3}
            dot={{ fill: "#10b981", strokeWidth: 2, r: 6 }}
            name="Active Users"
          />
          <Line 
            type="monotone" 
            dataKey="inactive" 
            stroke="#f59e0b" 
            strokeWidth={3}
            dot={{ fill: "#f59e0b", strokeWidth: 2, r: 6 }}
            name="Inactive Users"
          />
          <Line 
            type="monotone" 
            dataKey="expired" 
            stroke="#ef4444" 
            strokeWidth={3}
            dot={{ fill: "#ef4444", strokeWidth: 2, r: 6 }}
            name="Expired Users"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserStatusChart; 