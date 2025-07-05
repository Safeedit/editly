import React, { useState } from "react";
import DropzoneUpload from "./DropzoneUpload";

function MergePdf() {
  const [files, setFiles] = useState([]);
  const [merging, setMerging] = useState(false);

  const handleUpload = async () => {
    if (files.length < 2) {
      alert("❗ Please select at least 2 PDF files to merge.");
      return;
    }

    setMerging(true);
    const formData = new FormData();
    files.forEach((file) => formData.append("file", file));
    formData.append("type", "merge-pdf");

    try {
      const res = await fetch("https://editlybackend.onrender.com/convert", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error(await res.text());

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "merged.pdf";
      link.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      alert("❌ Merging failed. Please check the files or try again.");
      console.error(err);
    } finally {
      setMerging(false);
    }
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
      <h3 style={{ color: "#ffd700", marginBottom: "12px" }}>🔗 Merge PDFs</h3>

      <DropzoneUpload
        onFilesSelected={(f) => setFiles(Array.isArray(f) ? f : [f])}
        accept="application/pdf"
        multiple={true}
      />

      {files.length > 0 && (
        <>
          <p style={{ marginTop: "10px", fontSize: "14px", color: "#fefefe" }}>
            ✅ {files.length} PDF file{files.length > 1 ? "s" : ""} selected:
          </p>
          <ul style={{ textAlign: "left", paddingLeft: "20px", fontSize: "13px", color: "#ddd" }}>
            {files.map((file, idx) => (
              <li key={idx}>📄 {file.name}</li>
            ))}
          </ul>
        </>
      )}

      <button
        onClick={handleUpload}
        disabled={merging}
        style={{
          marginTop: "10px",
          padding: "8px 16px",
          backgroundColor: "#ff8c00",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: merging ? "not-allowed" : "pointer",
          fontSize: "14px",
          fontWeight: 500,
        }}
      >
        {merging ? "🔄 Merging..." : "🔗 Merge PDFs"}
      </button>
    </div>
  );
}

export default MergePdf;
