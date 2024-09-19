import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { FaSignInAlt, FaUserPlus, FaSignOutAlt, FaUser } from 'react-icons/fa'; // Iconos

function Header({ isAuthenticated, setAuthenticated }) {
  const [userName, setUserName] = React.useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && isAuthenticated) {
      setUserName(user.email); // Asigna el correo como nombre de usuario
    }
  }, [isAuthenticated]); // Actualiza cuando cambia el estado de autenticación

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated'); // Elimina el estado de autenticación
    setAuthenticated(false); // Cambia el estado a no autenticado
    setUserName(''); // Limpia el nombre del usuario
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
              <li>
                <FaUser className="auth-icon" />
                <span className="msj-bienvenida">Bienvenido, {userName}</span>
              </li>
              <li>
                <FaSignOutAlt className="auth-icon" onClick={handleLogout} />
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">
                  <FaSignInAlt className="auth-icon" />
                </Link>
              </li>
              <li>
                <Link to="/register">
                  <FaUserPlus className="auth-icon" />
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
