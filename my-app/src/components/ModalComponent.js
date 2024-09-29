import React from 'react';
import { Modal, Button } from 'react-bootstrap';

// Modal bileşeni, hata mesajlarını göstermek için kullanılıyor
const ModalComponent = ({ show, message, onHide }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Error</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalComponent;
