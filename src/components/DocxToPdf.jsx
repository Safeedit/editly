import React, { useState } from "react";
import DropzoneUpload from "./DropzoneUpload";

function DocxToPdf() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [blob, setBlob] = useState(null);

  const handleUpload = async () => {
    if (!file) return alert("❗ Please select a DOCX file");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", "docx-to-pdf");

    setLoading(true);
    try {
      const res = await fetch("https://editlybackend.onrender.com/convert", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error(await res.text());

      const blobData = await res.blob();
      setBlob(blobData);
    } catch (err) {
      console.error("❌ Conversion failed:", err);
      alert("Conversion failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = file.name.replace(/\.docx$/, ".pdf");
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      style={{
        padding: "1rem",
        border: "1px solid rgba(237, 212, 165, 0.2)",
        borderRadius: "12px",
        maxWidth: "500px",
        margin: "1rem auto",
        background: "#191818",
        color: "#ffffff",
        boxShadow: "0 0 15px rgba(243, 206, 162, 0.3)",
        textAlign: "center",
      }}
    >
      <h3 style={{ color: "#ffd700", marginBottom: "12px" }}>📄 DOCX ➡️ PDF</h3>

      <DropzoneUpload
        onFilesSelected={(f) => {
          setFile(f);
          setBlob(null);
        }}
        accept=".docx"
      />

      {file && (
        <p style={{ fontSize: "14px", marginTop: "8px", color: "#fefefe" }}>
          ✅ Selected: {file.name}
        </p>
      )}

      <button
        onClick={handleUpload}
        disabled={loading}
        style={{
          marginTop: "10px",
          padding: "8px 16px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: loading ? "not-allowed" : "pointer",
          fontSize: "14px",
          fontWeight: 500,
        }}
      >
        {loading ? "⏳ Converting..." : "🔁 Convert"}
      </button>

      {blob && (
        <button
          onClick={handleDownload}
          style={{
            marginLeft: "10px",
            marginTop: "10px",
            padding: "8px 16px",
            backgroundColor: "#28a745",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: 500,
          }}
        >
          ⬇️ Download
        </button>
      )}
    </div>
  );
}

export default DocxToPdf;
