import React, { useState } from "react";
import DropzoneUpload from "./DropzoneUpload";

function OcrPdf() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [extractedText, setExtractedText] = useState("");

  const handleOCR = async () => {
    if (!file) return alert("📄 Please select a scanned PDF");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", "ocr-pdf");

    setLoading(true);
    try {
      const res = await fetch("https://editly-ocr-service.onrender.com/ocr", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText || "OCR failed");
      }

      const blob = await res.blob();
      const text = await blob.text(); // ✅ Extract text from blob

      // Show preview and allow download
      setExtractedText(text);

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = file.name.replace(/\.\w+$/, ".txt");
      link.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("❌ OCR Error:", err);
      alert("OCR failed: " + err.message);
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
        maxWidth: "550px",
        margin: "1rem auto",
        background: "#191818",
        color: "#ffffff",
        boxShadow: "0 0 15px rgba(243, 206, 162, 0.3)",
      }}
    >
      <h3 style={{ color: "#ffd700", marginBottom: "12px" }}>🔍 OCR PDF</h3>

      <DropzoneUpload
        onFilesSelected={(f) => {
          setFile(f);
          setExtractedText(""); // Clear preview when new file selected
        }}
        accept="application/pdf"
      />

      {file && (
        <p style={{ fontSize: "14px", marginTop: "8px", color: "#fefefe" }}>
          ✅ Selected: {file.name}
        </p>
      )}

      <button
        onClick={handleOCR}
        disabled={loading}
        style={{
          marginTop: "10px",
          padding: "8px 16px",
          backgroundColor: "#28a745",
          color: "#ffffff",
          border: "none",
          borderRadius: "6px",
          cursor: loading ? "not-allowed" : "pointer",
          fontSize: "14px",
          fontWeight: 500,
        }}
      >
        {loading ? "🔍 Extracting..." : "🔍 OCR PDF"}
      </button>

      {extractedText && (
        <div
          style={{
            marginTop: "1rem",
            padding: "10px",
            backgroundColor: "#262626",
            border: "1px solid #444",
            borderRadius: "6px",
            maxHeight: "300px",
            overflowY: "auto",
            whiteSpace: "pre-wrap",
            fontSize: "14px",
            color: "#e6e6e6",
          }}
        >
          <strong style={{ display: "block", marginBottom: "6px", color: "#ffd700" }}>
            📝 Extracted Text Preview:
          </strong>
          <p>{extractedText}</p>
        </div>
      )}
    </div>
  );

}

export default OcrPdf;
