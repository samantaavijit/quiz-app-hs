import React from "react";
import "./loader.css";

export default function Loader() {
  return (
    <div className="fullscreen_loader">
      <div className="cube-loader">
        <div className="side front" />
        <div className="side back" />
        <div className="side right" />
        <div className="side left" />
        <div className="side top" />
        <div className="side bottom" />
      </div>
    </div>
  );
}
