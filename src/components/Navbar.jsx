import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      style={{
        background: "#003366", // Deep Blue background for the nav bar
        padding: "8px 16px", // Reduced padding for compactness
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid #ccc",
        position: "sticky",
        top: 0,
        zIndex: 999,
        boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
      }}
    >
      <Link
        to="/"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px", // Reduced gap
          color: "#FFFFFF", // White text for the logo
          fontSize: "20px", // Smaller font size
          textDecoration: "none",
          fontWeight: "bold",
        }}
      >
        <img
          src="/favicon.png"
          alt="Editly Logo"
          style={{ width: "70px", height: "50px", objectFit: "contain" }} // Smaller logo
        />
        Editly
      </Link>

      <div style={{ display: "flex", gap: "16px" }}>
        <Link
          to="/"
          style={navLinkStyle}
          onMouseOver={(e) => {
            e.target.style.color = "#FFB74D"; // Light orange color on hover
            e.target.style.textShadow = "0 0 5px #FF8C00"; // Fire-like glow effect
          }}
          onMouseOut={(e) => {
            e.target.style.color = "#FFFFFF"; // White text on mouse out
            e.target.style.textShadow = "none"; // Remove glow effect
          }}
        >
          Home
        </Link>
        <Link
          to="/about"
          style={navLinkStyle}
          onMouseOver={(e) => {
            e.target.style.color = "#FFB74D";
            e.target.style.textShadow = "0 0 5px #FF8C00";
          }}
          onMouseOut={(e) => {
            e.target.style.color = "#FFFFFF";
            e.target.style.textShadow = "none";
          }}
        >
          About
        </Link>
        <Link
          to="/contact"
          style={navLinkStyle}
          onMouseOver={(e) => {
            e.target.style.color = "#FFB74D";
            e.target.style.textShadow = "0 0 5px #FF8C00";
          }}
          onMouseOut={(e) => {
            e.target.style.color = "#FFFFFF";
            e.target.style.textShadow = "none";
          }}
        >
          Contact
        </Link>
      </div>
    </nav>
  );
}

const navLinkStyle = {
  color: "#FFFFFF", // White text for links
  textDecoration: "none",
  fontSize: "14px", // Smaller font size for links
  transition: "color 0.2s ease-in-out, text-shadow 0.2s ease-in-out", // Smooth transition for effects
};

export default Navbar;
