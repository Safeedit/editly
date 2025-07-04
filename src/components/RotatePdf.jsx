import React, { useState } from "react";
import { Document, Page } from "react-pdf";
import { PDFDocument, degrees } from "pdf-lib";

function RotatePdf() {
  const [file, setFile] = useState(null);
  const [rotations, setRotations] = useState([]);
  const [numPages, setNumPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [blob, setBlob] = useState(null);

  const onFileChange = (e) => {
    const selected = e.target.files[0];
    setFile(selected);
    setRotations([]);
    setBlob(null);
  };

  const onDocLoad = ({ numPages }) => {
    setNumPages(numPages);
    setRotations(new Array(numPages).fill(0));
  };

  const rotate = (index, direction) => {
    const newRotations = [...rotations];
    newRotations[index] = (newRotations[index] + (direction === "right" ? 90 : -90) + 360) % 360;
    setRotations(newRotations);
  };

  const handleDownload = async () => {
    if (!file) return;
    setLoading(true);
    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer);

    pdfDoc.getPages().forEach((page, i) => {
      if (rotations[i]) {
        page.setRotation(degrees(rotations[i]));
      }
    });

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    setBlob(blob);
    setLoading(false);
  };

  const download = () => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "rotated.pdf";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="tool-box">
      <h3>🔁 Rotate PDF Pages</h3>
      <input type="file" accept="application/pdf" onChange={onFileChange} />

      {file && (
        <Document file={file} onLoadSuccess={onDocLoad}>
          {Array.from(new Array(numPages), (_, index) => (
            <div key={index} style={{ margin: "10px 0", textAlign: "center" }}>
              <Page pageNumber={index + 1} width={150} />
              <div style={{ marginTop: "5px" }}>
                <button onClick={() => rotate(index, "left")}>⟲ Left</button>{" "}
                <button onClick={() => rotate(index, "right")}>⟳ Right</button>
              </div>
              <small>Current Rotation: {rotations[index]}°</small>
            </div>
          ))}
        </Document>
      )}

      {file && (
        <button className="btn" onClick={handleDownload} disabled={loading}>
          {loading ? "⏳ Rotating..." : "🔁 Apply Rotation"}
        </button>
      )}

      {blob && (
        <button className="btn" onClick={download} style={{ marginTop: "10px" }}>
          ⬇️ Download Rotated PDF
        </button>
      )}
    </div>
  );
}

export default RotatePdf;
