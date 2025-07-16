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
import UserRoles from "./pages/UserManagement/UserRoles";
import AdminAccounts from "./pages/UserManagement/AdminAccounts";
import RoleManagement from "./pages/UserManagement/RoleManagement";

function App() {
  // If you want to support sidebar collapse, you can manage state here
  // const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 min-h-screen transition-all duration-300 ml-[270px] md:ml-[270px] p-0">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/register" element={<NewRegistration />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/events/calendar" element={<CalendarPage />} />
          <Route path="/events/today" element={<TodaysEvents />} />
          <Route path="/events/upcoming" element={<UpcomingEvent />} />
          <Route path="/events/past" element={<PastEvent />} />
          <Route path="/events/all" element={<AllEvent />} />
          <Route path="/user-management/roles" element={<UserRoles />} />
          <Route path="/user-management/admin-accounts" element={<AdminAccounts />} />
          <Route path="/user-management/role-management" element={<RoleManagement />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
