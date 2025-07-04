import React, { useState } from "react";
import DropzoneUpload from "./DropzoneUpload";

function PdfToDocx() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const convert = async () => {
    if (!file) return alert("📄 Please select a PDF to convert.");

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", "pdf-to-docx");

      const res = await fetch("http://localhost:5001/convert", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText || "Conversion failed");
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = file.name.replace(/\.pdf$/i, ".docx");
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("❌ Conversion Error:", err);
      alert("❌ Failed to convert PDF to DOCX: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        padding: "1rem",
        border: "1px solid rgba(237, 212, 165, 0.2)",
        borderRadius: "12px",
        maxWidth: "450px",
        margin: "1rem auto",
        background: "#191818",
        textAlign: "center",
        color: "#ffffff",
        boxShadow: "0 0 15px rgba(243, 206, 162, 0.3)",
      }}
    >
      <h3 style={{ color: "#ffd700", marginBottom: "12px" }}>
        📄 Convert PDF ➡️ DOCX
      </h3>

      <DropzoneUpload
        onFilesSelected={(f) => setFile(f)}
        accept="application/pdf"
      />

      {file && (
        <p style={{ color: "#fefefe", fontSize: "14px" }}>
          ✅ Selected: {file.name}
        </p>
      )}

      <button
        onClick={convert}
        disabled={loading}
        style={{
          marginTop: "10px",
          padding: "8px 16px",
          backgroundColor: "#ff8c00",
          color: "#ffffff",
          border: "none",
          borderRadius: "6px",
          cursor: loading ? "not-allowed" : "pointer",
          fontSize: "14px",
          fontWeight: 500,
          transition: "background-color 0.2s ease",
        }}
      >
        {loading ? "⏳ Converting..." : "📄 Convert to DOCX"}
      </button>
    </div>
  );

}

export default PdfToDocx;
