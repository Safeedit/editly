import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      style={{
        background: "#D3D3D3", // Light gray background for the nav bar
        padding: "8px 16px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid #ccc",
        position: "sticky",
        top: 0,
        zIndex: 999,
        boxShadow: "0 0 10px rgba(255, 140, 0, 0.7)", // Orange glow effect
      }}
    >
      <Link
        to="/"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          color: "#333333", // Dark text for better contrast
          fontSize: "20px",
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
            e.target.style.color = "#333333"; // Dark text on mouse out
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
            e.target.style.color = "#333333";
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
            e.target.style.color = "#333333";
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
  color: "#333333", // Dark text for links
  textDecoration: "none",
  fontSize: "14px", // Smaller font size for links
  transition: "color 0.2s ease-in-out, text-shadow 0.2s ease-in-out", // Smooth transition for effects
};

export default Navbar;
