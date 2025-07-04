import React from "react";
import PdfToDocx from "./PdfToDocx";
import DocxToPdf from "./DocxToPdf";
import ImageToPdf from "./ImageToPdf";
import MergePdf from "./MergePdf";
import SplitPdf from "./SplitPdf";
import CompressPdf from "./CompressPdf";
import OcrPdf from "./OcrPdf";
import PasswordProtect from "./PasswordProtect";
import ReorderPdf from "./ReorderPdf";

import "./Toolbox.css";

const Toolbox = () => {
  return (
    <div className="toolbox-container">
      <h2>📝 Edit & Annotate PDF</h2>
      <div className="tool-grid">
        <div className="tool-item"><PdfToDocx /></div>
        <div className="tool-item"><DocxToPdf /></div>
        <div className="tool-item"><ImageToPdf /></div>
        <div className="tool-item"><MergePdf /></div>
        <div className="tool-item"><SplitPdf /></div>
        <div className="tool-item"><CompressPdf /></div>
        <div className="tool-item"><OcrPdf /></div>
        <div className="tool-item"><PasswordProtect /></div>
        <div className="tool-item"><ReorderPdf /></div>
      </div>
    </div>
  );
};

export default Toolbox;
