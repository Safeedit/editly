// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./App.css";

// Get the root element
const rootElement = document.getElementById("root");

// Create a root and render the App component
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
