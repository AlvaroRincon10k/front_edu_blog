import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Login.css'; 

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación simple
    if (username.length < 3 || password.length < 6) {
      setError("Por favor ingresa un nombre de usuario de al menos 3 caracteres y una contraseña de al menos 6 caracteres.");
      return;
    }

    // Simulación de inicio de sesión usando localStorage
    const storedUser = JSON.parse(localStorage.getItem('user')) || {};

    if (storedUser.username === username && storedUser.password === password) {
      localStorage.setItem('token', 'dummy-token'); // Simulate token storage
      navigate('/home'); 
    } else {
      setError('Nombre de usuario o contraseña incorrectos.');
    }
  };

  return (
    <main className="login-main">
      <div className="login-container">
        <h1>Iniciar sesión</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
          {error && <p className="error-message">{error}</p>} {/* Mostrar error */}
          <button type="submit" className="btn-submit">Iniciar sesión</button>
        </form>
      </div>
    </main>
  );
}

export default Login;
