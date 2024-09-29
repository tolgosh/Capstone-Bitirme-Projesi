import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ModalComponent from '../components/ModalComponent';
import { Button, Card, Form, Spinner, Toast, ToastContainer } from 'react-bootstrap';

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({ name: '' });
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  // Kategorileri listeleme (GET)
  useEffect(() => {
    axios.get('/api/categories')
      .then(response => {
        setCategories(response.data);
        setLoading(false);
      })
      .catch(error => handleModal('Failed to fetch categories'));
  }, []);

  // Form input değişikliği işleme
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Kategori ekleme (POST)
  const handleSubmit = () => {
    axios.post('/api/categories', formData)
      .then(() => {
        setFormData({ name: '' });
        setShowToast(true);
        return axios.get('/api/categories');
      })
      .then(response => setCategories(response.data))
      .catch(() => handleModal('Failed to add category'));
  };

  // Kategori silme (DELETE)
  const handleDelete = (id) => {
    axios.delete(`/api/categories/${id}`)
      .then(() => setCategories(categories.filter(c => c.id !== id)))
      .catch(() => handleModal('Failed to delete category'));
  };

  // Modal kontrolü
  const handleModal = (message) => {
    setModalMessage(message);
    setShowModal(true);
  };

  return (
    <div className="mt-4">
      <h2>Categories</h2>
      {loading ? (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <div className="row">
          {categories.map(category => (
            <div key={category.id} className="col-md-4">
              <Card className="mb-4 shadow-sm">
                <Card.Body>
                  <Card.Title>{category.name}</Card.Title>
                  <Button variant="danger" onClick={() => handleDelete(category.id)}>Delete</Button>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      )}

      <Card className="mt-4">
        <Card.Body>
          <h4>Add New Category</h4>
          <Form>
            <Form.Group controlId="formCategoryName">
              <Form.Label>Category Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter Category Name"
                required
              />
            </Form.Group>
            <Button onClick={handleSubmit} className="mt-2" variant="success">Add Category</Button>
          </Form>
        </Card.Body>
      </Card>

      <ToastContainer position="top-end" className="p-3">
        <Toast show={showToast} onClose={() => setShowToast(false)} delay={3000} autohide>
          <Toast.Header>
            <strong className="me-auto">Success</strong>
          </Toast.Header>
          <Toast.Body>Category added successfully!</Toast.Body>
        </Toast>
      </ToastContainer>

      <ModalComponent show={showModal} message={modalMessage} onHide={() => setShowModal(false)} />
    </div>
  );
};

export default Category;
