import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap'in stil dosyasını dahil ediyoruz
import './custom.scss'; // Özel SCSS dosyasını dahil ediyoruz
import App from './App';

// Uygulamanın kök bileşenini render ediyoruz ve Router ile sarmalıyoruz
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);
