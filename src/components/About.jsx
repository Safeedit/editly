import React from "react";

function About() {
  return (
    <div style={{ display: "flex", minHeight: "80vh", backgroundColor: "#121212", color: "#eee" }}>
      
      {/* Left Sidebar Panel */}
      <div style={{
        width: "250px",
        backgroundColor: "#000000",
        padding: "2rem",
        borderTopRightRadius: "12px",
        borderBottomRightRadius: "12px",
        boxShadow: "3px 0 8px rgba(0,0,0,0.4)"
      }}>
        <h3 style={{ color: "#ffd700", marginBottom: "1rem" }}>What is Editly?</h3>
        <p style={{ fontSize: "14px", lineHeight: "1.6" }}>
          A modern privacy-first web app to manage PDFs and images — fast, secure, and completely offline.
        </p>
        <p style={{ fontSize: "13px", marginTop: "1rem", color: "#ccc" }}>
          No sign-up, no tracking. <br />
          Just clean tools for everyday use.
        </p>
      </div>

      {/* Main Content */}
      <div style={{ padding: "2rem", maxWidth: "800px", margin: "auto" }}>
        <h2 style={{ color: "#ffd700" }}>About Editly</h2>

        <p style={{ marginTop: "1rem", fontSize: "16px", lineHeight: "1.6" }}>
          <strong>Editly</strong> is your all-in-one toolkit for PDF and image file management. From converting files and compressing PDFs to merging, splitting, and applying OCR, Editly makes your document workflow effortless.
        </p>

        <p style={{ marginTop: "1rem", fontSize: "16px", lineHeight: "1.6" }}>
          We’re committed to privacy — all processing is done securely, and no files are stored on our servers. Your data is yours.
        </p>

        <p style={{ marginTop: "1rem", fontSize: "16px", lineHeight: "1.6" }}>
          ✉️ For support or feedback, contact us anytime at{" "}
          <a href="mailto:safeeditpdf@gmail.com" style={{ color: "#00bfff" }}>
            safeeditpdf@gmail.com
          </a>.
        </p>
      </div>
    </div>
  );
}

export default About;
