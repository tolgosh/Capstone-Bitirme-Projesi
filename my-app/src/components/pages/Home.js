import React from 'react';

// Anasayfa bileşeni, kullanıcılara hoş geldiniz mesajı verir
const Home = () => {
  return (
    <div className="jumbotron mt-4">
      <h1 className="display-4">Welcome to BookStore!</h1>
      <p className="lead">Manage your publishers, categories, books, authors, and book orders efficiently.</p>
      <hr className="my-4" />
      <p>Use the navigation menu to explore different sections and perform CRUD operations.</p>
    </div>
  );
};

export default Home;
