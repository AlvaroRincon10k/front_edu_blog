import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; 
import { FaSignInAlt, FaUserPlus, FaSignOutAlt, FaUser } from 'react-icons/fa'; // Iconos

function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user); // Convertir el string a un objeto
      setIsAuthenticated(true);
      setUserName(parsedUser.username); // Acceder al 'username'
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUserName(''); // Limpiar el nombre al cerrar sesión
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
              <li><FaUser className="auth-icon" /><span className="msj-bienbevida">Bienvenido, {userName}</span></li>
              <li><FaSignOutAlt className="auth-icon" onClick={handleLogout} /></li>
            </>
          ) : (
            <>
              <li><Link to="/login"><FaSignInAlt className="auth-icon" /></Link></li>
              <li><Link to="/register"><FaUserPlus className="auth-icon" /></Link></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
