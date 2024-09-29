import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ModalComponent from '../components/ModalComponent';
import { Button, Card, Form, Spinner, Toast, ToastContainer } from 'react-bootstrap';

const Publisher = () => {
  const [publishers, setPublishers] = useState([]);
  const [formData, setFormData] = useState({ name: '' });
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  // Yayımcıları listeleme (GET)
  useEffect(() => {
    axios.get('/api/publishers')
      .then(response => {
        setPublishers(response.data);
        setLoading(false);
      })
      .catch(error => handleModal('Failed to fetch publishers'));
  }, []);

  // Form input değişikliği işleme
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Yayımcı ekleme (POST)
  const handleSubmit = () => {
    axios.post('/api/publishers', formData)
      .then(() => {
        setFormData({ name: '' });
        setShowToast(true);
        return axios.get('/api/publishers');
      })
      .then(response => setPublishers(response.data))
      .catch(() => handleModal('Failed to add publisher'));
  };

  // Yayımcı silme (DELETE)
  const handleDelete = (id) => {
    axios.delete(`/api/publishers/${id}`)
      .then(() => setPublishers(publishers.filter(p => p.id !== id)))
      .catch(() => handleModal('Failed to delete publisher'));
  };

  // Modal kontrolü
  const handleModal = (message) => {
    setModalMessage(message);
    setShowModal(true);
  };

  return (
    <div className="mt-4">
      <h2>Publishers</h2>
      {loading ? (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <div className="row">
          {publishers.map(publisher => (
            <div key={publisher.id} className="col-md-4">
              <Card className="mb-4 shadow-sm">
                <Card.Body>
                  <Card.Title>{publisher.name}</Card.Title>
                  <Button variant="danger" onClick={() => handleDelete(publisher.id)}>Delete</Button>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      )}

      <Card className="mt-4">
        <Card.Body>
          <h4>Add New Publisher</h4>
          <Form>
            <Form.Group controlId="formPublisherName">
              <Form.Label>Publisher Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter Publisher Name"
                required
              />
            </Form.Group>
            <Button onClick={handleSubmit} className="mt-2" variant="success">Add Publisher</Button>
          </Form>
        </Card.Body>
      </Card>

      {/* Toast bildirim */}
      <ToastContainer position="top-end" className="p-3">
        <Toast show={showToast} onClose={() => setShowToast(false)} delay={3000} autohide>
          <Toast.Header>
            <strong className="me-auto">Success</strong>
          </Toast.Header>
          <Toast.Body>Publisher added successfully!</Toast.Body>
        </Toast>
      </ToastContainer>

      {/* Modal hata mesajı */}
      <ModalComponent show={showModal} message={modalMessage} onHide={() => setShowModal(false)} />
    </div>
  );
};

export default Publisher;
