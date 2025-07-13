import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Here you would clear auth/session if implemented
    navigate("/", { replace: true });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "80vh" }}>
      <h2>Are you sure you want to logout?</h2>
      <button
        onClick={handleLogout}
        style={{
          marginTop: 24,
          padding: "10px 32px",
          fontSize: 18,
          background: "linear-gradient(90deg, #f39c12 0%, #f7b731 100%)",
          color: "#fff",
          border: "none",
          borderRadius: 6,
          fontWeight: 600,
          cursor: "pointer",
          boxShadow: "0 2px 8px rgba(243,156,18,0.10)",
          transition: "background 0.2s, box-shadow 0.2s, transform 0.1s"
        }}
        onMouseOver={e => e.currentTarget.style.background = "linear-gradient(90deg, #f7b731 0%, #f39c12 100%)"}
        onMouseOut={e => e.currentTarget.style.background = "linear-gradient(90deg, #f39c12 0%, #f7b731 100%)"}
      >
        Logout
      </button>
    </div>
  );
};

export default Logout; 