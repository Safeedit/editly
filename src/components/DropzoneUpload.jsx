// File: src/components/DropzoneUpload.jsx
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import "./DropzoneUpload.css";

function DropzoneUpload({ onFilesSelected, accept, multiple = false }) {
  const [selectedName, setSelectedName] = useState("");

  const onDrop = useCallback(
    (acceptedFiles) => {
      if (!acceptedFiles || acceptedFiles.length === 0) return;

      // Determine what to send based on `multiple` flag
      const fileData = multiple ? acceptedFiles : acceptedFiles[0];

      // ✅ Store displayed file name or count
      const nameDisplay = multiple
        ? `${acceptedFiles.length} files selected`
        : fileData.name;

      setSelectedName(nameDisplay);
      onFilesSelected(fileData);
    },
    [onFilesSelected, multiple]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    multiple,
  });

  return (
    <div>
      <div {...getRootProps()} className={`dropzone ${isDragActive ? "active" : ""}`}>
        <input {...getInputProps()} />
        {isDragActive ? (
          "📂 Drop the file(s) here..."
        ) : (
          `📂 Drag & Drop your file${multiple ? "s" : ""} here or click to browse`
        )}
      </div>

      {/* Show file name confirmation */}
      {selectedName && (
        <p style={{ marginTop: "6px", fontSize: "13px", color: "#ffd700", textAlign: "center" }}>
          ✅ Selected: {selectedName}
        </p>
      )}
    </div>
  );
}

export default DropzoneUpload;
