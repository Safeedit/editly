// Home.jsx
import React, { useState, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

import PdfToDocx from "./PdfToDocx";
import DocxToPdf from "./DocxToPdf";
import ImageToPdf from "./ImageToPdf";
import MergePdf from "./MergePdf";
import SplitPdf from "./SplitPdf";
import CompressPdf from "./CompressPdf";
import OcrPdf from "./OcrPdf";
import PasswordProtect from "./PasswordProtect";
import ReorderPdf from "./ReorderPdf";
import ImageEditor from "./ImageEditor";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function Home() {
  const [pdfFile, setPdfFile] = useState(null);
  const [textElements, setTextElements] = useState([]);
  const [selectedTextId, setSelectedTextId] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const [fontSize] = useState(12);
  const [fontColor] = useState("#000000");
  const [fontFamily] = useState("Arial");

  const fileInputRef = useRef();

  const startDrag = (e, id) => {
    e.stopPropagation();
    const el = textElements.find((t) => t.id === id);
    setSelectedTextId(id);
    setDragOffset({ x: e.clientX - el.x, y: e.clientY - el.y });
  };

  const onDrag = (e) => {
    if (!selectedTextId) return;
    setTextElements((prev) =>
      prev.map((t) =>
        t.id === selectedTextId
          ? { ...t, x: e.clientX - dragOffset.x, y: e.clientY - dragOffset.y }
          : t
      )
    );
  };

  const stopDrag = () => setSelectedTextId(null);

  return (
    <div
      className="container"
      onMouseMove={onDrag}
      onMouseUp={stopDrag}
      onClick={() => setSelectedTextId(null)}
    >
      <h1></h1>

      <div className="tools-group">
        <div className="tool-box"><PdfToDocx /></div>
        <div className="tool-box"><DocxToPdf /></div>
        <div className="tool-box"><ImageToPdf /></div>
        <div className="tool-box"><MergePdf /></div>
        <div className="tool-box"><SplitPdf /></div>
        <div className="tool-box"><CompressPdf /></div>
        <div className="tool-box"><OcrPdf /></div>
        <div className="tool-box"><PasswordProtect /></div>
        <div className="tool-box"><ReorderPdf /></div>
        <div className="tool-box"><ImageEditor /></div>
      </div>
    </div>
  );
}

export default Home;
