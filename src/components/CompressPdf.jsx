// File: src/components/Converter.jsx
import React, { useState } from "react";
import axios from "axios";
import DropzoneUpload from "./DropzoneUpload";

function Converter() {
  const [file, setFile] = useState(null);
  const [conversionType, setConversionType] = useState("pdf-to-docx");
  const [convertedBlob, setConvertedBlob] = useState(null);
  const [loading, setLoading] = useState(false);

  const extMap = {
    "pdf-to-docx": "docx",
    "docx-to-pdf": "pdf",
    "img-to-pdf": "pdf",
    "split-pdf": "zip",
    "merge-pdf": "pdf",
  };

  const acceptMap = {
    "pdf-to-docx": "application/pdf",
    "docx-to-pdf":
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "img-to-pdf": "image/*",
    "split-pdf": "application/pdf",
    "merge-pdf": "application/zip",
  };

  const handleConvert = async () => {
    if (!file || !conversionType) {
      alert("❗ Please select a file and conversion type.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", conversionType);

    setLoading(true);
    try {
      const response = await axios.post(
        "https://editlybackend.onrender.com/convert",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          responseType: "blob",
        }
      );
      setConvertedBlob(response.data);
    } catch (err) {
      console.error("❌ Conversion Error:", err);
      alert(
        "Conversion failed: " +
          (err.response?.data || err.message || "Unknown error.")
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!convertedBlob) return;

    const url = URL.createObjectURL(convertedBlob);
    const baseName = file.name.split(".")[0];
    const extension = extMap[conversionType] || "converted";

    const a = document.createElement("a");
    a.href = url;
    a.download = `${baseName}-converted.${extension}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      style={{
        padding: "1.2rem",
        border: "1px solid #ffd95a40",
        backgroundColor: "#191818",
        borderRadius: "10px",
        boxShadow: "0 0 20px rgba(255, 217, 90, 0.15)",
        color: "#fff",
        maxWidth: "520px",
        margin: "1.5rem auto",
        textAlign: "center",
      }}
    >
      <h3 style={{ color: "#ffd700", marginBottom: "0.5rem" }}>
        📝 SafeEditPDF
      </h3>
      <h4 style={{ color: "#ffffff" }}>📄 Universal Converter</h4>

      <DropzoneUpload
        onFilesSelected={(file) => {
          setFile(file);
          setConvertedBlob(null);
        }}
        accept={acceptMap[conversionType] || "*/*"}
        multiple={false}
      />

      {file && (
        <p style={{ marginTop: "6px", fontSize: "14px" }}>
          ✅ Selected: {file.name}
        </p>
      )}

      <select
        value={conversionType}
        onChange={(e) => {
          setConversionType(e.target.value);
          setFile(null);
          setConvertedBlob(null);
        }}
        style={{
          padding: "6px",
          marginTop: "10px",
          borderRadius: "5px",
          fontSize: "14px",
        }}
      >
        <option value="pdf-to-docx">📄 PDF ➡ DOCX</option>
        <option value="docx-to-pdf">📝 DOCX ➡ PDF</option>
        <option value="img-to-pdf">🖼️ IMG ➡ PDF</option>
        <option value="merge-pdf">📚 Merge PDFs (ZIP)</option>
        <option value="split-pdf">✂️ Split PDF</option>
      </select>

      <div style={{ marginTop: "12px" }}>
        <button
          onClick={handleConvert}
          disabled={loading || !file}
          style={{
            padding: "8px 16px",
            backgroundColor: "#28a745",
            color: "#ffffff",
            border: "none",
            borderRadius: "6px",
            cursor: loading || !file ? "not-allowed" : "pointer",
            fontSize: "14px",
            fontWeight: 500,
          }}
        >
          {loading ? "⏳ Converting..." : "🔁 Convert"}
        </button>

        {convertedBlob && (
          <button
            onClick={handleDownload}
            style={{
              marginLeft: "10px",
              padding: "8px 16px",
              backgroundColor: "#007bff",
              color: "#ffffff",
              border: "none",
              borderRadius: "6px",
              fontSize: "14px",
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            ⬇️ Download
          </button>
        )}
      </div>
    </div>
  );
}

export default Converter;
