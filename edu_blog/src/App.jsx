// App.jsx

//import './App.css';

import React from 'react';
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
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/news" element={<News />} />
        <Route path="/events" element={<Events />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/events/:eventoId" element={<EventDetail />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
