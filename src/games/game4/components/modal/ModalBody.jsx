import React, { useState } from "react";

const ModalBody = ({ points, handleRestart }) => {
  //   const [openModal, setOpenModal] = useState(false);

  return (
    <div id="exampleModal" className="gamemodal-container">
      <div className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title text-uppercase" id="exampleModalLabel">
              Game Result
            </h5>
          </div>
          <div className="modal-body text-center py-4" id="res-modal">
            {points < 6 ? (
              <p className="text-danger">
                Your final points is {points}. Sorry, you lose. 😫😥
              </p>
            ) : (
              <p className="text-success">
                Your final points is {points}. Excellent, you win. 😊🎉🎊
              </p>
            )}
          </div>
          <div className="modal-footer">
            <button type="button" lassName="close">
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleRestart}
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalBody;

// onclick="handleRestart();" on retry
