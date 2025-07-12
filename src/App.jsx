// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
// import Overview from "./pages/Overview";
// import Statistics from "./pages/Statistics";
// import Customers from "./pages/Customers";
// import Product from "./pages/Product";
// import Messages from "./pages/Messages";
// import Transactions from "./pages/Transactions";
// import Settings from "./pages/Settings";
// import Security from "./pages/Security";

function App() {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ padding: "20px", flex: 1 }}>
        {/* <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/product" element={<Product />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/security" element={<Security />} />
        </Routes> */}
      </div>
    </div>
  );
}

export default App;
