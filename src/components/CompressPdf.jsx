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
        "https://editlybackend.onrender.com/convert", // ✅ updated URL
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          responseType: "blob",
        }
      );
      setConvertedBlob(response.data);
    } catch (err) {
      console.error("❌ Conversion Error:", err);
      alert("Conversion failed: " + (err.response?.data || err.message));
    } finally {
      setLoading(false);
    }
  };


  const handleDownload = () => {
    if (!convertedBlob) return;

    const url = URL.createObjectURL(convertedBlob);
    const a = document.createElement("a");
    const baseName = file.name.split(".")[0];
    const extension = extMap[conversionType] || "converted";

    a.href = url;
    a.download = ${baseName}-converted.${extension};
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="converter-box">
      <h3>📝 SafeEditPDF</h3>
      <h4>📄 Universal Converter</h4>

      <DropzoneUpload
        onFilesSelected={(file) => {
          setFile(file);
          setConvertedBlob(null);
        }}
        accept={{
          "application/pdf": [".pdf"],
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
          "image/*": [".jpg", ".jpeg", ".png", ".bmp"],
          "application/zip": [".zip"],
        }}
      />

      {file && <p>✅ Selected: {file.name}</p>}

      <select
        value={conversionType}
        onChange={(e) => setConversionType(e.target.value)}
      >
        <option value="pdf-to-docx">PDF ➡ DOCX</option>
        <option value="docx-to-pdf">DOCX ➡ PDF</option>
        <option value="img-to-pdf">IMG ➡ PDF</option>
        <option value="merge-pdf">Merge PDFs (ZIP)</option>
        <option value="split-pdf">Split PDF</option>
      </select>

      <br />
      <button onClick={handleConvert} disabled={loading || !file}>
        {loading ? "⏳ Converting..." : "🔁 Convert"}
      </button>

      {convertedBlob && (
        <button onClick={handleDownload} style={{ marginLeft: "10px" }}>
          ⬇️ Download
        </button>
      )}
    </div>
  );
}

export default Converter; 
