// File: src/components/DropzoneUpload.jsx
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import "./DropzoneUpload.css";


function DropzoneUpload({ onFilesSelected, accept, multiple = false }) {
  const [selectedName, setSelectedName] = React.useState("");

  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const fileData = multiple ? acceptedFiles : acceptedFiles[0];
        setSelectedName(multiple ? `${acceptedFiles.length} files selected` : fileData.name);
        onFilesSelected(fileData);
      }
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
        {isDragActive
          ? "📂 Drop the file(s) here..."
          : `📂 Drag & Drop your file${multiple ? "s" : ""} here or click to browse`}
      </div>
      {selectedName && (
        <p style={{ marginTop: "6px", fontSize: "13px", color: "#ffd700", textAlign: "center" }}>
          ✅ Selected: {selectedName}
        </p>
      )}
    </div>
  );
}


export default DropzoneUpload;
