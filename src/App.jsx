import React, { useState } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import Dashboard from "./components/Dashboard/Dashboard";
import { Routes, Route } from "react-router-dom";
import NewRegistration from "./pages/NewRegistration";
import Logout from "./pages/Logout";
import CalendarPage from "./pages/EventManagement/Calendar";
import TodaysEvents from "./pages/EventManagement/TodaysEvents";
import UpcomingEvent from "./pages/EventManagement/UpcomingEvent";
import PastEvent from "./pages/EventManagement/PastEvent";
import AllEvent from "./pages/EventManagement/AllEvent";
import EventManagement from "./pages/EventManagement/EventManagement";
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
          <Route path="/register" element={<NewRegistration />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/events/calendar" element={<CalendarPage />} />
          <Route path="/events/today" element={<TodaysEvents />} />
          <Route path="/events/upcoming" element={<UpcomingEvent />} />
          <Route path="/events/past" element={<PastEvent />} />
          <Route path="/events/all" element={<AllEvent />} />
          <Route path="/events" element={<EventManagement />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
