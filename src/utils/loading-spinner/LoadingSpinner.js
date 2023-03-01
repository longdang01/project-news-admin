import React from "react";
import "./LoadingSpinner.css";
import ReactDOM from "react-dom";

export default function LoadingSpinner() {
  return ReactDOM.createPortal(
    <div className="spinner-container">
      <div className="loading-spinner"></div>
    </div>,
    document.getElementById("root")
  );
}
