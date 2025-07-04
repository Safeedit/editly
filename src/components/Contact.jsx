import React from "react";

function Contact() {
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
        <h3 style={{ color: "#ffd700", marginBottom: "1rem" }}>Editly Support</h3>
        <p style={{ fontSize: "14px", lineHeight: "1.6" }}>
          Need assistance? We’re here to help with your PDF editing, conversion, or privacy concerns.
        </p>
        <p style={{ fontSize: "13px", marginTop: "1rem", color: "#ccc" }}>
          Business Hours: <br />
          Mon–Fri: 10 AM – 6 PM <br />
          IST (GMT +5:30)
        </p>
      </div>

      {/* Main Content */}
      <div style={{ padding: "2rem", maxWidth: "600px", margin: "auto" }}>
        <h2 style={{ color: "#ffd700" }}>Contact Us</h2>
        <p style={{ marginBottom: "1rem" }}>
          If you have any questions, feedback, or need help using <strong>Editly</strong>, feel free to reach out.
        </p>
        <p>Email: <a href="mailto:safeeditpdf@gmail.com" style={{ color: "#00bfff" }}>safeeditpdf@gmail.com</a></p>
        <p style={{ marginTop: "2rem" }}>
          We value your privacy. No file is ever stored on our servers — all processing is done securely on your device.
        </p>
      </div>
    </div>
  );
}

export default Contact;
