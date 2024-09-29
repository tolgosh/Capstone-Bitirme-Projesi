import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ModalComponent from '../components/ModalComponent';
import { Button, Card, Form, Spinner, Toast, ToastContainer } from 'react-bootstrap';

const Book = () => {
  const [books, setBooks] = useState([]);
  const [formData, setFormData] = useState({ title: '', author: '' });
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  // Kitapları listeleme (GET)
  useEffect(() => {
    axios.get('/api/books')
      .then(response => {
        setBooks(response.data);
        setLoading(false);
      })
      .catch(error => handleModal('Failed to fetch books'));
  }, []);

  // Form input değişikliği işleme
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Kitap ekleme (POST)
  const handleSubmit = () => {
    axios.post('/api/books', formData)
      .then(() => {
        setFormData({ title: '', author: '' });
        setShowToast(true);
        return axios.get('/api/books');
      })
      .then(response => setBooks(response.data))
      .catch(() => handleModal('Failed to add book'));
  };

  // Kitap silme (DELETE)
  const handleDelete = (id) => {
    axios.delete(`/api/books/${id}`)
      .then(() => setBooks(books.filter(b => b.id !== id)))
      .catch(() => handleModal('Failed to delete book'));
  };

  // Modal kontrolü
  const handleModal = (message) => {
    setModalMessage(message);
    setShowModal(true);
  };

  return (
    <div className="mt-4">
      <h2>Books</h2>
      {loading ? (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <div className="row">
          {books.map(book => (
            <div key={book.id} className="col-md-4">
              <Card className="mb-4 shadow-sm">
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <Card.Text>{book.author}</Card.Text>
                  <Button variant="danger" onClick={() => handleDelete(book.id)}>Delete</Button>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      )}

      <Card className="mt-4">
        <Card.Body>
          <h4>Add New Book</h4>
          <Form>
            <Form.Group controlId="formBookTitle">
              <Form.Label>Book Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter Book Title"
                required
              />
            </Form.Group>
            <Form.Group controlId="formBookAuthor" className="mt-2">
              <Form.Label>Author Name</Form.Label>
              <Form.Control
                type="text"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
                placeholder="Enter Author Name"
                required
              />
            </Form.Group>
            <Button onClick={handleSubmit} className="mt-2" variant="success">Add Book</Button>
          </Form>
        </Card.Body>
      </Card>

      <ToastContainer position="top-end" className="p-3">
        <Toast show={showToast} onClose={() => setShowToast(false)} delay={3000} autohide>
          <Toast.Header>
            <strong className="me-auto">Success</strong>
          </Toast.Header>
          <Toast.Body>Book added successfully!</Toast.Body>
        </Toast>
      </ToastContainer>

      <ModalComponent show={showModal} message={modalMessage} onHide={() => setShowModal(false)} />
    </div>
  );
};

export default Book;
