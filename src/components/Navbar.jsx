import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      style={{
        background: "#003366", // Deep Blue background for the nav bar
        padding: "12px 24px",
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
          gap: "10px",
          color: "#FFFFFF", // White text for the logo
          fontSize: "22px",
          textDecoration: "none",
          fontWeight: "bold",
        }}
      >
        <img
          src="/favicon.png"
          alt="Editly Logo"
          style={{ width: "85px", height: "65px", objectFit: "contain" }}
        />
        Editly
      </Link>

      <div style={{ display: "flex", gap: "20px" }}>
        <Link
          to="/"
          style={navLinkStyle}
          onMouseOver={(e) => (e.target.style.color = "#FF8C00")} // Orange hover color
          onMouseOut={(e) => (e.target.style.color = "#FFFFFF")} // White text on mouse out
        >
          Home
        </Link>
        <Link
          to="/about"
          style={navLinkStyle}
          onMouseOver={(e) => (e.target.style.color = "#FF8C00")}
          onMouseOut={(e) => (e.target.style.color = "#FFFFFF")}
        >
          About
        </Link>
        <Link
          to="/contact"
          style={navLinkStyle}
          onMouseOver={(e) => (e.target.style.color = "#FF8C00")}
          onMouseOut={(e) => (e.target.style.color = "#FFFFFF")}
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
  fontSize: "16px",
  transition: "color 0.2s ease-in-out",
};

export default Navbar;
