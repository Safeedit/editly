// File: src/components/ImageEditor.jsx
import React, { useState } from "react";
import DropzoneUpload from "./DropzoneUpload";
import axios from "axios";

function ImageEditor() {
  const [file, setFile] = useState(null);
  const [bgMode, setBgMode] = useState("remove");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [bgImage, setBgImage] = useState(null);
  const [enhance, setEnhance] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editedImage, setEditedImage] = useState(null);

  const handleEdit = async () => {
    if (!file) {
      alert("Please select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    if (bgMode === "add-color") {
      formData.append("bg_color", bgColor);
    } else if (bgMode === "add-image" && bgImage) {
      formData.append("bg_image", bgImage);
    }

    const endpoint = enhance ? "/enhance" : "/remove-bg";

    setLoading(true);
    setEditedImage(null);

    try {
      const response = await axios.post(
        `https://image-edit-service.onrender.com${endpoint}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          responseType: "blob",
        }
      );

      const imageBlob = new Blob([response.data], { type: response.data.type });
      const imageUrl = URL.createObjectURL(imageBlob);
      setEditedImage(imageUrl);
    } catch (err) {
      console.error("❌ Upload Error:", err);
      alert("Editing failed: " + (err.response?.data?.error || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: "auto", padding: 20, color: "#fff" }}>
      <DropzoneUpload
        onFilesSelected={(f) => setFile(f)}
        accept="image/*"
        multiple={false}
      />
      {file && <p>✅ Selected: {file.name}</p>}

      <div style={{ margin: "10px 0" }}>
        <label>Background Mode: </label>
        <select value={bgMode} onChange={(e) => setBgMode(e.target.value)}>
          <option value="remove">Remove BG</option>
          <option value="add-color">Add Color BG</option>
          <option value="add-image">Add Image BG</option>
        </select>
      </div>

      {bgMode === "add-color" && (
        <input
          type="color"
          value={bgColor}
          onChange={(e) => setBgColor(e.target.value)}
        />
      )}

      {bgMode === "add-image" && (
        <DropzoneUpload
          onFilesSelected={(f) => setBgImage(f)}
          accept="image/*"
          multiple={false}
        />
      )}

      <div style={{ margin: "10px 0" }}>
        <label>
          <input
            type="checkbox"
            checked={enhance}
            onChange={() => setEnhance((prev) => !prev)}
          />
          Enhance Image
        </label>
      </div>

      <button
        onClick={handleEdit}
        disabled={loading}
        style={{
          padding: "8px 16px",
          backgroundColor: "#ff8c00",
          color: "white",
          border: "none",
          borderRadius: 6,
          cursor: "pointer",
        }}
      >
        {loading ? "Processing..." : "Apply"}
      </button>

      {editedImage && (
        <div style={{ marginTop: 20 }}>
          <img
            src={editedImage}
            alt="Edited Result"
            style={{ maxWidth: "100%", borderRadius: 8 }}
          />
          <br />
          <a href={editedImage} download="edited.png">
            ⬇ Download
          </a>
        </div>
      )}
    </div>
  );
}

export default ImageEditor;
