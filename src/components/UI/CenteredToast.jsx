import React from 'react';
import {Toast, ToastContainer} from "react-bootstrap";

const CenteredToast = ({showToast, setShowToast, text}) => {

  return (
    <ToastContainer className="position-fixed bottom-0 start-50 translate-middle-x mb-2">
      <Toast onClose={() => setShowToast(false)} show={showToast} delay={2000} autohide bg="dark">
        <Toast.Body className="text-white">{text}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default CenteredToast;