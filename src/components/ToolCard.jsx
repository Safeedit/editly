// src/components/ToolCard.jsx
import React from "react";
import DropzoneUpload from "./DropzoneUpload";
import "../styles/ToolCard.css"; // Ensure this path is correct

function ToolCard({
  title,
  onFileChange,
  onAction,
  file,
  loading,
  actionLabel,
  accept = "application/pdf", // Default to PDFs
  children, // Extra custom UI
}) {
  return (
    <div className="tool-card">
      <h3>{title}</h3>

      <DropzoneUpload onFilesSelected={onFileChange} accept={accept} />

      {file && (
        <p style={{ color: "#aaa", fontSize: "0.9rem", marginTop: "8px" }}>
          ✅ Selected: <strong>{file.name}</strong>
        </p>
      )}

      <button onClick={onAction} disabled={loading}>
        {loading ? "⏳ Working..." : actionLabel}
      </button>

      {children && <div style={{ marginTop: "10px" }}>{children}</div>}
    </div>
  );
}

export default ToolCard;
