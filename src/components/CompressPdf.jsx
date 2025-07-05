import React, { useState } from "react";
import DropzoneUpload from "./DropzoneUpload";

function CompressPdf() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [quality, setQuality] = useState("/screen"); // Default level

  const handleCompress = async () => {
    if (!file) return alert("📄 Please select a PDF to compress.");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", "compress-pdf");
    formData.append("quality", quality); // ✅ Pass quality level

    const beforeSizeKB = file.size / 1024;

    setLoading(true);
    try {
      const res = await fetch("https://editly-compressor-service.onrender.com/compress", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error(await res.text());

      const blob = await res.blob();
      const afterSizeKB = blob.size / 1024;

      console.log(`📄 Original: ${beforeSizeKB.toFixed(2)} KB`);
      console.log(`📉 Compressed: ${afterSizeKB.toFixed(2)} KB`);

      alert(
        `✅ PDF Compressed!\n\nOriginal size: ${beforeSizeKB.toFixed(2)} KB\nCompressed size: ${afterSizeKB.toFixed(2)} KB\nSaved: ${(beforeSizeKB - afterSizeKB).toFixed(2)} KB`
      );

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = file.name.replace(/\.pdf$/, "_compressed.pdf");
      link.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("❌ Compression Error:", err);
      alert("Compression failed: " + err.message);
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
      <h3 style={{ color: "#ffd700", marginBottom: "12px" }}>🗜 Compress PDF</h3>

      <DropzoneUpload
        onFilesSelected={(f) => setFile(f)}
        accept="application/pdf"
        multiple={false}
      />

      {file && (
        <p style={{ color: "#fefefe", fontSize: "14px" }}>
          ✅ Selected: {file.name}
        </p>
      )}

      {/* 📉 Compression Level Selector */}
      <div style={{ margin: "10px 0" }}>
        <label style={{ marginRight: "8px" }}>Compression level:</label>
        <select
          value={quality}
          onChange={(e) => setQuality(e.target.value)}
          style={{
            padding: "4px 8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            fontSize: "14px",
          }}
        >
          <option value="/screen">🖥️ Low (/screen)</option>
          <option value="/ebook">📖 Medium (/ebook)</option>
          <option value="/printer">🖨️ High (/printer)</option>
          <option value="/prepress">🎨 Very High (/prepress)</option>
        </select>
      </div>

      <button
        onClick={handleCompress}
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
        {loading ? "🗜 Compressing..." : "🗜 Compress PDF"}
      </button>
    </div>
  );
}

export default CompressPdf;
