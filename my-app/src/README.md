# BookStore CRUD Application

This is a complete BookStore management application built with React and Bootstrap. The application allows users to manage publishers, categories, books, authors, and book orders using full CRUD operations (Create, Read, Update, Delete).

## Features
- **CRUD Operations**: For Publishers, Categories, Books, Authors, and Book Orders.
- **Responsive Layout**: Designed for a fixed width of 1200px for desktops.
- **Real-Time Feedback**: Uses modals and toast notifications for user interactions.
- **Fully Functional Router**: React Router for smooth navigation.

## Tech Stack
- **Frontend**: React, React Router, Bootstrap, Axios.
- **Backend**: RESTful API for handling CRUD operations (API not included in this repository).

## API Endpoints:
Ensure that your backend supports the following endpoints for proper functionality:

- Publishers: `GET /api/publishers`, `POST /api/publishers`, `DELETE /api/publishers/:id`.
- Categories: `GET /api/categories`, `POST /api/categories`, `DELETE /api/categories/:id`.
- Books: `GET /api/books`, `POST /api/books`, `DELETE /api/books/:id`.
- Authors: `GET /api/authors`, `POST /api/authors`, `DELETE /api/authors/:id`.
- Book Orders: `GET /api/orders`, `POST /api/orders`, `DELETE /api/orders/:id`.