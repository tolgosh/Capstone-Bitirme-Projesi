import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavbarComponent from './components/Navbar';
import Home from './pages/Home';
import Publisher from './pages/Publisher';
import Category from './pages/Category';
import Book from './pages/Book';
import Author from './pages/Author';
import BookOrder from './pages/BookOrder';

// Ana uygulama bileşeni, tüm sayfalar arası geçişleri ve ana yapıyı içerir
function App() {
  return (
    <div className="container">
      <NavbarComponent /> {/* Navbar bileşeni */}
      <Routes>
        <Route path="/" element={<Home />} /> {/* Anasayfa */}
        <Route path="/publisher" element={<Publisher />} /> {/* Yayımcı */}
        <Route path="/category" element={<Category />} /> {/* Kategori */}
        <Route path="/book" element={<Book />} /> {/* Kitap */}
        <Route path="/author" element={<Author />} /> {/* Yazar */}
        <Route path="/book-order" element={<BookOrder />} /> {/* Kitap Ödünç Alma */}
      </Routes>
    </div>
  );
}

export default App;
