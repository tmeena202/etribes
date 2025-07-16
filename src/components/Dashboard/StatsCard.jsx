import React from 'react';

const StatsCard = ({ title, value, icon, color }) => {
  return (
    <div className="flex items-center gap-4 bg-white p-5 rounded-xl shadow-md border border-slate-100 w-full overflow-hidden animate-fadeInUp">
      <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl font-bold" style={{ backgroundColor: color }}>
        {icon}
      </div>
      <div className="flex flex-col">
        <h3 className="text-xs text-slate-400 font-semibold uppercase tracking-wide mb-1">{title}</h3>
        <p className="text-2xl font-bold text-slate-800 leading-none">{value}</p>
      </div>
    </div>
  );
};

export default StatsCard; 