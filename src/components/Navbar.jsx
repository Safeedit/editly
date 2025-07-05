import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      style={{
        background: "#DC143C",
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
          color: "#1a1a1a",
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
          onMouseOver={(e) => (e.target.style.color = "#ff8c00")}
          onMouseOut={(e) => (e.target.style.color = "#1a1a1a")}
        >
          Home
        </Link>
        <Link
          to="/about"
          style={navLinkStyle}
          onMouseOver={(e) => (e.target.style.color = "#ff8c00")}
          onMouseOut={(e) => (e.target.style.color = "#1a1a1a")}
        >
          About
        </Link>
        <Link
          to="/contact"
          style={navLinkStyle}
          onMouseOver={(e) => (e.target.style.color = "#ff8c00")}
          onMouseOut={(e) => (e.target.style.color = "#1a1a1a")}
        >
          Contact
        </Link>
      </div>
    </nav>
  );
}

const navLinkStyle = {
  color: "#1a1a1a",
  textDecoration: "none",
  fontSize: "16px",
  transition: "color 0.2s ease-in-out",
};

export default Navbar;
