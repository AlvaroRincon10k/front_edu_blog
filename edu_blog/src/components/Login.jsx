import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login({ setAuthenticated }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Realizar la solicitud a la API para autenticar al usuario
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Error en la autenticación');
      }

      const data = await response.json();

      // Verifica si el usuario está autenticado
      if (data.success) {
        // Almacena un indicador de que el usuario está autenticado
        localStorage.setItem('isAuthenticated', true);
        
        // Actualiza el estado de autenticación para el header
        setAuthenticated(true);
        
        // Redirige a la página de inicio
        navigate('/home');
      } else {
        setError(data.message || "Email o contraseña incorrectos.");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <main className="login-main">
      <div className="login-container">
        <h1>Iniciar sesión</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="btn-submit">
            Iniciar sesión
          </button>
        </form>

        <div className="login-help">
          <p>¿No tienes una cuenta? <a href="/register">Registrarse</a></p>
        </div>
      </div>
    </main>
  );
}

export default Login;
