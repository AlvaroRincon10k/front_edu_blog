// src/components/Footer.jsx

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faLinkedin, faYoutube } from '@fortawesome/free-brands-svg-icons'; // Íconos de redes sociales
import './Footer.css'; 

function Footer() {
    return (
      <footer>
        <div className="footer-content">
          <div className="footer-section contact-info">
            <h3>Contacto</h3>
            <p>Colegio XXXXXXXXXXX</p>
            <p>Carrera XX # 000-00</p>
            <p>PBX (555) 555-5555</p>
            <p>Whatsapp: 123-456-7890</p>
            <p>Cúcuta, Colombia</p>
          </div>
  
          <div className="footer-section sections">
            <h3>Secciones</h3>
            <ul>
              <li><a href="/">Inicio</a></li>
              <li><a href="/news">Noticias</a></li>
              <li><a href="/events">Eventos</a></li>
              <li><a href="/login">Ingresar</a></li>
              <li><a href="/register">Regístrate</a></li>
            </ul>
          </div>
  
          <div className="footer-section social-media">
            <h3>Redes Sociales</h3>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon className="fa-icon" icon={faFacebook} /> Facebook
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon className="fa-icon" icon={faInstagram} /> Instagram
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon className="fa-icon" icon={faLinkedin} /> LinkedIn
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon className="fa-icon" icon={faYoutube} /> YouTube
            </a>
          </div>
        </div>
      </footer>
    );
  }
  
  export default Footer;