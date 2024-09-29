import React from 'react';
import { Link } from 'react-router-dom';

// Navbar bileşeni, tüm sayfalar arasında gezinmeyi sağlar
const NavbarComponent = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">📚 BookStore</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/publisher">Publisher</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/category">Category</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/book">Book</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/author">Author</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/book-order">Book Order</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavbarComponent;
