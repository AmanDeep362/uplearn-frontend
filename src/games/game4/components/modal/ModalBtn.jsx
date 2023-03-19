import React from "react";

const ModalBtn = () => {
  return (
    <p className="gameModalBtn">
      <button
        type="button"
        // className="btn btn-primary"
        data-bs-toggle="modal"
        // data-bs-target="#exampleModal"
        id="trigger-btn"
      >
        Show Result
      </button>
    </p>
  );
};

export default ModalBtn;
