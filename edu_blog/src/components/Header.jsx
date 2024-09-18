import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; 

function Header() {
  // Estado para simular el estado de autenticación
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Simulamos la autenticación verificando un valor en el localStorage
    const user = localStorage.getItem('user');
    if (user) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsAuthenticated(false);
  };

  return (
    <header>
      <nav>
        <ul className="nav-links">
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/news">Noticias</Link></li>
          <li><Link to="/events">Eventos</Link></li>
        </ul>
        <ul className="auth-links">
          {isAuthenticated ? (
            <>
              <li><span>Bienvenido, Usuario</span></li>
              <li><button onClick={handleLogout}>Cerrar sesión</button></li>
            </>
          ) : (
            <>
              <li><Link to="/login">Ingresa</Link></li>
              <li><Link to="/register">Regístrate</Link></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
