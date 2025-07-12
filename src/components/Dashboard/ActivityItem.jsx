import React from 'react';

const ActivityItem = ({ customer, action, amount, time }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return '#10b981';
      case 'Inactive':
        return '#f59e0b';
      case 'Expired':
        return '#ef4444';
      default:
        return '#64748b';
    }
  };

  const getStatusBackground = (status) => {
    switch (status) {
      case 'Active':
        return '#f0fdf4';
      case 'Inactive':
        return '#fffbeb';
      case 'Expired':
        return '#fef2f2';
      default:
        return '#f1f5f9';
    }
  };

  return (
    <div className="activity-item">
      <div className="activity-icon">👤</div>
      <div className="activity-content">
        <p><strong>{customer}</strong> {action}</p>
        <span className="activity-time">{time}</span>
      </div>
      <div 
        className="activity-amount"
        style={{
          color: getStatusColor(amount),
          backgroundColor: getStatusBackground(amount),
          borderColor: getStatusColor(amount)
        }}
      >
        {amount}
      </div>
    </div>
  );
};

export default ActivityItem; 