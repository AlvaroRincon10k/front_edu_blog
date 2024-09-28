import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer'; 
import Home from './components/Home';
import News from './components/News';
import Events from './components/Events';
import Login from './components/Login';
import Register from './components/Register';
import EventDetail from './components/EventDetail';

function App() {
  const [isAuthenticated, setAuthenticated] = useState(false);

  // Verificar el estado de autenticación desde el localStorage cuando se carga la app
  useEffect(() => {
    const auth = localStorage.getItem('isAuthenticated');
    setAuthenticated(auth === 'true'); // Verifica si está autenticado
  }, []);

  return (
    <Router>
      {/* Header recibe isAuthenticated y setAuthenticated */}
      <Header isAuthenticated={isAuthenticated} setAuthenticated={setAuthenticated} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/news" element={<News />} />
        <Route path="/events" element={<Events />} />
        <Route path="/login" element={<Login setAuthenticated={setAuthenticated} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/events/:eventoId" element={<EventDetail />} />
      </Routes>
      
      <Footer />
    </Router>
  );
}

export default App;
