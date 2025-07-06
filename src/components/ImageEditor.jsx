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
    if (!file) return alert("Please select an image.");

    const formData = new FormData();
    formData.append("image", file);

    if (bgMode === "add-color") {
      formData.append("mode", "add-color");
      formData.append("color", bgColor);
    } else if (bgMode === "add-image" && bgImage) {
      formData.append("mode", "add-image");
      formData.append("bg_image", bgImage);
    } else {
      formData.append("mode", "remove");
    }

    if (enhance) formData.append("enhance", "1");

    setLoading(true);
    try {
      const res = await axios.post("https://image-edit-service.onrender.com/edit", formData, {
        responseType: "blob",
      });
      setEditedImage(URL.createObjectURL(res.data));
    } catch (err) {
      alert("Editing failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: "auto", padding: 20, color: "#fff" }}>
      <h3>🖼️ Image Editor (Background & Enhance)</h3>

      <DropzoneUpload
        onFilesSelected={(f) => setFile(f[0])}
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
          onFilesSelected={(f) => setBgImage(f[0])}
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
        style={{ padding: "8px 16px", backgroundColor: "#ff8c00", color: "white" }}
      >
        {loading ? "Processing..." : "Apply"}
      </button>

      {editedImage && (
        <div style={{ marginTop: 20 }}>
          <h4>🎉 Edited Image:</h4>
          <img src={editedImage} alt="Edited Result" style={{ maxWidth: "100%" }} />
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
