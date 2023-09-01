import React from "react";
import Modal from "react-modal";
const customStyles = {
  overlay: {
    backgroundColor: "rgba(0,0,0,0.8)",
    zIndex: "300",
  },
};
const MainModal = ({ open, closeModal, children }) => {
  return (
    open && (
      <Modal
        isOpen={open}
        style={customStyles}
        contentLabel="login Modal"
        className="modal-dialog"
        overlayClassName="d-flex align-items-center justify-content-center"
        id="login-modal"
      >
        <div className="modal-content" style={{ borderRadius: 10 }}>
          <div className="modal-body">
            <button type="button" className="close" onClick={closeModal}>
              <span aria-hidden="true">
                <i className="icon-close"></i>
              </span>
            </button>
            <div className="form-box">{children}</div>
          </div>
        </div>
      </Modal>
    )
  );
};

export default MainModal;
