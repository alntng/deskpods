import React from "react";
import "./modal.css";

export default function EpisodeModal({ show, handleClose, children }) {
  const showHideClassName = show ? "modal display-block" : "modal display-none";
  console.log("should the modal be open?", show);
  return (
    <div className={showHideClassName}>
      <div className="modal-container">
        {children}
        <a href="javascript:;" className="modal-close" onClick={handleClose}>
          close
        </a>
      </div>
    </div>
  );
}
