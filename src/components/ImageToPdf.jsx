import React, { useState } from "react";
import DropzoneUpload from "./DropzoneUpload";

function ImageToPdf() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [blob, setBlob] = useState(null);

  const handleDrop = (newFiles) => {
    setFiles((prev) => [...prev, ...newFiles]);
    setBlob(null);
  };

  const handleDelete = (index) => {
    const updated = [...files];
    updated.splice(index, 1);
    setFiles(updated);
  };

  const moveItem = (fromIndex, toIndex) => {
    const updated = [...files];
    const [moved] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, moved);
    setFiles(updated);
  };

  const handleConvert = async () => {
    if (files.length === 0) return alert("❗ Please select at least one image");

    const formData = new FormData();
    files.forEach((file) => formData.append("file", file));  
    formData.append("type", "img-to-pdf");

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5001/convert", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error(await res.text());

      const pdfBlob = await res.blob();
      setBlob(pdfBlob);
    } catch (err) {
      console.error("❌ Error:", err);
      alert("Image to PDF failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const download = () => {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "merged.pdf";
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
        textAlign: "center",
        color: "#ffffff",
        boxShadow: "0 0 15px rgba(243, 206, 162, 0.3)",
      }}
    >
      <h3 style={{ color: "#ffd700", marginBottom: "12px" }}>🖼️ Image ➡️ PDF</h3>

      <DropzoneUpload
        onFilesSelected={handleDrop}
        accept="image/*"
        multiple={true}
      />

      {files.length > 0 && (
        <div style={{ marginTop: "10px", fontSize: "14px" }}>
          <p>✅ {files.length} image(s) selected:</p>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {files.map((file, index) => (
              <li
                key={index}
                style={{
                  marginBottom: "10px",
                  background: "#2a2a2a",
                  padding: "10px",
                  borderRadius: "6px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  {/* ✅ Image Thumbnail */}
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Preview ${index}`}
                    style={{
                      width: "60px",
                      height: "60px",
                      objectFit: "cover",
                      borderRadius: "4px",
                      border: "1px solid #555",
                    }}
                  />
                  <span style={{ fontSize: "14px", color: "#eee" }}>{file.name}</span>
                </div>

                {/* Action buttons */}
                <div>
                  <button
                    onClick={() => moveItem(index, index - 1)}
                    disabled={index === 0}
                    style={{
                      margin: "0 4px",
                      padding: "2px 6px",
                      cursor: "pointer",
                      fontSize: "12px",
                    }}
                  >
                    🔼
                  </button>
                  <button
                    onClick={() => moveItem(index, index + 1)}
                    disabled={index === files.length - 1}
                    style={{
                      margin: "0 4px",
                      padding: "2px 6px",
                      cursor: "pointer",
                      fontSize: "12px",
                    }}
                  >
                    🔽
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    style={{
                      margin: "0 4px",
                      padding: "2px 6px",
                      background: "#ff4d4f",
                      color: "#fff",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontSize: "12px",
                    }}
                  >
                    ❌
                  </button>
                </div>
              </li>
            ))}
          </ul>

        </div>
      )}

      <button
        onClick={handleConvert}
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
        }}
      >
        {loading ? "⏳ Converting..." : "📄 Convert to PDF"}
      </button>

      {blob && (
        <button
          onClick={download}
          style={{
            marginLeft: "10px",
            marginTop: "10px",
            padding: "8px 16px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: 500,
          }}
        >
          ⬇️ Download PDF
        </button>
      )}
    </div>
  );
}

export default ImageToPdf;
