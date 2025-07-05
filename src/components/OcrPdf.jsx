import React, { useState } from "react";
import DropzoneUpload from "./DropzoneUpload";

function OcrPdf() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [extractedText, setExtractedText] = useState("");
  const [lang, setLang] = useState("eng");         // 🌐 Language selector
  const [maxPages, setMaxPages] = useState(5);      // 📄 Max pages

  const handleOCR = async () => {
    if (!file) return alert("📄 Please select a file (PDF or Image)");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("lang", lang);
    formData.append("max_pages", maxPages);

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

      const json = await res.json();
      setExtractedText(json.text || "No text extracted.");
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
      <h3 style={{ color: "#ffd700", marginBottom: "12px" }}>🔍 OCR PDF / Image</h3>

      <DropzoneUpload
        onFilesSelected={(f) => {
          setFile(f);
          setExtractedText("");
        }}
        accept=".pdf,.jpg,.jpeg,.png"  // ✅ Accept both PDF and images
      />

      {file && (
        <p style={{ fontSize: "14px", marginTop: "8px", color: "#fefefe" }}>
          ✅ Selected: {file.name}
        </p>
      )}

      {/* 🌐 Language Selector */}
      <div style={{ marginTop: "10px", fontSize: "14px" }}>
        <label style={{ marginRight: "8px" }}>Language:</label>
        <select
          value={lang}
          onChange={(e) => setLang(e.target.value)}
          style={{ padding: "4px 8px", borderRadius: "6px" }}
        >
          <option value="eng">🇺🇸 English</option>
          <option value="hin">🇮🇳 Hindi</option>
          <option value="mar">🇮🇳 Marathi</option>
          <option value="fra">🇫🇷 French</option>
          <option value="deu">🇩🇪 German</option>
          <option value="spa">🇪🇸 Spanish</option>
          {/* Add more languages supported by your Tesseract instance */}
        </select>
      </div>

      {/* 📄 Max Page Input */}
      <div style={{ marginTop: "10px", fontSize: "14px" }}>
        <label style={{ marginRight: "8px" }}>Max pages (PDF):</label>
        <input
          type="number"
          value={maxPages}
          onChange={(e) => setMaxPages(e.target.value)}
          min="1"
          max="30"
          style={{ padding: "4px 8px", borderRadius: "6px", width: "60px" }}
        />
      </div>

      <button
        onClick={handleOCR}
        disabled={loading}
        style={{
          marginTop: "15px",
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
        {loading ? "🔍 Extracting..." : "🔍 OCR File"}
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
