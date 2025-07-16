import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

const UserChart = ({ data }) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-black bg-opacity-90 text-white p-3 rounded-md shadow-lg">
          <p className="font-semibold mb-1 text-slate-100">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }} className="text-sm mb-0.5">
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-slate-100 w-full overflow-hidden animate-fadeInUp">
      <h3 className="text-lg font-semibold text-slate-800 mb-4">User Growth</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis dataKey="month" stroke="#64748b" />
          <YAxis stroke="#64748b" />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="total" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Total Users" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserChart; 