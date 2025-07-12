import React from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import Dashboard from "./components/Dashboard/Dashboard";

function App() {
  return (
    <div>
      <Sidebar />
      <div style={{ marginLeft: "260px", padding: "24px" }}>
        <Dashboard />
      </div>
    </div>
  );
}

export default App;
