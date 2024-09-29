import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ModalComponent from '../components/ModalComponent';
import { Button, Card, Form, Spinner, Toast, ToastContainer } from 'react-bootstrap';

const Author = () => {
  const [authors, setAuthors] = useState([]);
  const [formData, setFormData] = useState({ name: '' });
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  // Yazarları listeleme (GET)
  useEffect(() => {
    axios.get('/api/authors')
      .then(response => {
        setAuthors(response.data);
        setLoading(false);
      })
      .catch(error => handleModal('Failed to fetch authors'));
  }, []);

  // Form input değişikliği işleme
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Yazar ekleme (POST)
  const handleSubmit = () => {
    axios.post('/api/authors', formData)
      .then(() => {
        setFormData({ name: '' });
        setShowToast(true);
        return axios.get('/api/authors');
      })
      .then(response => setAuthors(response.data))
      .catch(() => handleModal('Failed to add author'));
  };

  // Yazar silme (DELETE)
  const handleDelete = (id) => {
    axios.delete(`/api/authors/${id}`)
      .then(() => setAuthors(authors.filter(a => a.id !== id)))
      .catch(() => handleModal('Failed to delete author'));
  };

  // Modal kontrolü
  const handleModal = (message) => {
    setModalMessage(message);
    setShowModal(true);
  };

  return (
    <div className="mt-4">
      <h2>Authors</h2>
      {loading ? (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <div className="row">
          {authors.map(author => (
            <div key={author.id} className="col-md-4">
              <Card className="mb-4 shadow-sm">
                <Card.Body>
                  <Card.Title>{author.name}</Card.Title>
                  <Button variant="danger" onClick={() => handleDelete(author.id)}>Delete</Button>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      )}

      <Card className="mt-4">
        <Card.Body>
          <h4>Add New Author</h4>
          <Form>
            <Form.Group controlId="formAuthorName">
              <Form.Label>Author Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter Author Name"
                required
              />
            </Form.Group>
            <Button onClick={handleSubmit} className="mt-2" variant="success">Add Author</Button>
          </Form>
        </Card.Body>
      </Card>

      <ToastContainer position="top-end" className="p-3">
        <Toast show={showToast} onClose={() => setShowToast(false)} delay={3000} autohide>
          <Toast.Header>
            <strong className="me-auto">Success</strong>
          </Toast.Header>
          <Toast.Body>Author added successfully!</Toast.Body>
        </Toast>
      </ToastContainer>

      <ModalComponent show={showModal} message={modalMessage} onHide={() => setShowModal(false)} />
    </div>
  );
};

export default Author;
