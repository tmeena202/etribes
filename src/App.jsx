import React, { useState } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import Dashboard from "./components/Dashboard/Dashboard";
import "./App.css";

function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleSidebarToggle = (collapsed) => {
    setIsSidebarCollapsed(collapsed);
  };

  return (
    <div className="app-container">
      <Sidebar onToggle={handleSidebarToggle} />
      <div 
        className={`main-content ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}
      >
        <Dashboard />
      </div>
    </div>
  );
}

export default App;
