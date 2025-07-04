import React, { useState } from "react";
import { PDFDocument, degrees } from "pdf-lib";
import { Document, Page, pdfjs } from "react-pdf";
import "./ReorderPdf.css"; // optional: style this file if needed

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function ReorderPdf() {
  const [file, setFile] = useState(null);
  const [pages, setPages] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [blob, setBlob] = useState(null);
  const [numPages, setNumPages] = useState(null);

  const handleFile = (f) => {
    setFile(f);
    setPages([]);
    setBlob(null);
    setNumPages(null);
    setSelectedIndex(null);
  };

  const onDocLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    const pageList = Array.from({ length: numPages }, (_, i) => ({
      index: i,
      rotation: 0,
    }));
    setPages(pageList);
  };

  const movePage = (direction) => {
    if (selectedIndex === null) return;

    const newPages = [...pages];
    const targetIndex = direction === "left" ? selectedIndex - 1 : selectedIndex + 1;

    if (targetIndex < 0 || targetIndex >= newPages.length) return;

    const temp = newPages[selectedIndex];
    newPages[selectedIndex] = newPages[targetIndex];
    newPages[targetIndex] = temp;

    setPages(newPages);
    setSelectedIndex(targetIndex);
  };

  const rotatePage = (idx, direction) => {
    const updated = [...pages];
    updated[idx].rotation = (updated[idx].rotation + (direction === "left" ? -90 : 90) + 360) % 360;
    setPages(updated);
  };

  const deletePage = (idx) => {
    const updated = [...pages];
    updated.splice(idx, 1);
    setPages(updated);
    if (selectedIndex === idx) setSelectedIndex(null);
  };

  const handleReorder = async () => {
    const origPdf = await PDFDocument.load(await file.arrayBuffer());
    const newPdf = await PDFDocument.create();

    for (const page of pages) {
      const [copied] = await newPdf.copyPages(origPdf, [page.index]);
      copied.setRotation(degrees(page.rotation));
      newPdf.addPage(copied);
    }

    const pdfBytes = await newPdf.save();
    const newBlob = new Blob([pdfBytes], { type: "application/pdf" });
    setBlob(newBlob);
  };

  return (
    <div className="tool-box">
      <h3>📄 Reorder PDF Pages & Rotate</h3>

      <input type="file" accept="application/pdf" onChange={(e) => handleFile(e.target.files[0])} />

      {file && (
        <Document file={file} onLoadSuccess={onDocLoadSuccess}>
          <div className="reorder-preview">
            {pages.map((page, idx) => (
              <div
                key={idx}
                className={`page-thumbnail ${selectedIndex === idx ? "selected" : ""}`}
                onClick={() => setSelectedIndex(idx)}
              >
                <Page
                  pageNumber={page.index + 1}
                  width={120}
                  rotate={page.rotation}
                  renderAnnotationLayer={false}
                  renderTextLayer={false}
                />
                <p style={{ fontSize: "12px", textAlign: "center" }}>
                  Page {page.index + 1}
                </p>
                <div className="button-group">
                  <button onClick={() => rotatePage(idx, "left")}>⏪</button>
                  <button onClick={() => rotatePage(idx, "right")}>⏩</button>
                  <button onClick={() => deletePage(idx)}>❌</button>
                </div>
              </div>
            ))}
          </div>
        </Document>
      )}

      {pages.length > 0 && (
        <>
          <div style={{ display: "flex", justifyContent: "center", gap: "10px", margin: "10px 0" }}>
            <button onClick={() => movePage("left")} disabled={selectedIndex === null || selectedIndex === 0}>
              ⬅️ Move Left
            </button>
            <button onClick={() => movePage("right")} disabled={selectedIndex === null || selectedIndex === pages.length - 1}>
              ➡️ Move Right
            </button>
          </div>

          <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
            <button onClick={handleReorder}>📄 Generate</button>
            <button onClick={() => handleFile(null)}>🔁 Reset</button>
          </div>
        </>
      )}

      {blob && (
        <button
          style={{ marginTop: "10px" }}
          onClick={() => {
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = "reordered.pdf";
            link.click();
          }}
        >
          ⬇️ Download
        </button>
      )}
    </div>
  );
}

export default ReorderPdf;
