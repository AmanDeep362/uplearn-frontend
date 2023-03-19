import React, { useContext, useState } from "react";
// import ModalBody from "./ModalBody";
// import ModalBtn from "./ModalBtn";
import FlagsContext from "../../contexts/FlagsContext";

const Modal = ({ handleRestart }) => {
  const [openModal, setOpenModal] = useState(false);
  const flag = useContext(FlagsContext);
  return (
    <>
      {/* <ModalBtn /> */}
      <button
        type="button"
        className="gameModalBtn"
        onClick={() => {
          setOpenModal(true);
        }}
      >
        Show results
      </button>
      {openModal && (
        <div id="exampleModal" className="gamemodalContainer">
          <div className="modal">
            <h2 style={{ textTransform: "uppercase" }} id="exampleModalLabel">
              Game Result
            </h2>
            <div id="res-modal">
              {flag.points < 6 ? (
                <p style={{ color: "red", padding: "1rem 0" }}>
                  Your final points is {flag.points}. Sorry, you lose. 😫😥
                </p>
              ) : (
                <p className="text-success">
                  Your final points is {flag.points}. Excellent, you win. 😊🎉🎊
                </p>
              )}
            </div>
            <div className="modalFooterBtn">
              <button
                type="button"
                className="modalClose"
                onClick={() => {
                  setOpenModal(false);
                }}
              >
                Close
              </button>
              <button
                type="button"
                className="gameRetry"
                onClick={handleRestart}
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
