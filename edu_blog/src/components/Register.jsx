import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Para redirigir después de registrar
import './Register.css';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate(); // Para redireccionar después del registro

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación simple
    if (!email.includes("@") || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError("Por favor ingresa un email válido.");
      return;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    if (password !== password2) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setError(null);
    setIsSubmitting(true);

    // Datos del registro
    const userData = { username, email, password };

    // Simular el registro y almacenar en localStorage
    setTimeout(() => {
      localStorage.setItem('user', JSON.stringify(userData));
      setIsSubmitting(false);
      alert('Registro exitoso');
      // Redirigir al usuario a la página de inicio de sesión
      navigate('/login'); 
    }, 1000);
  };

  return (
    <main className="register-main">
      <div className="register-container">
        <h1>Registro</h1>
        <form className="register-form" onSubmit={handleSubmit}>
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
          <div className="form-group">
            <label>Confirm Password:</label>
            <input
              type="password"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              className="form-input"
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="btn-submit" disabled={isSubmitting}>
            {isSubmitting ? 'Registrando...' : 'Registrarse'}
          </button>
        </form>

        <div className="register-help">
          <p>¿Ya tienes una cuenta? <a href="/login">Iniciar sesión</a></p>
        </div>
      </div>
    </main>
  );
}

export default Register;
