import React, { useState } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import Dashboard from "./components/Dashboard/Dashboard";
import { Routes, Route } from "react-router-dom";
import ImportantContacts from "./pages/ImportantContacts";
import Logout from "./pages/Logout";
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
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/contacts" element={<ImportantContacts />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
