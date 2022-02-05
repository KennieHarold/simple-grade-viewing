import React from "react";
import { Toast } from "react-bootstrap";

const SimpleAlert = ({ show, message, onClose }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 25,
        right: 25,
        zIndex: 1,
      }}
    >
      <Toast show={show} onClose={onClose}>
        <Toast.Header>
          <strong className="me-auto">Alert</strong>
        </Toast.Header>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </div>
  );
};

export default SimpleAlert;
