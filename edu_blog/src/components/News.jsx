import React, { useState, useEffect } from 'react';
import './News.css';

// Datos de noticias simulados
const mockNews = [
  {
    id: 1,
    title: "Noticia 1",
    image: "https://via.placeholder.com/150",
    content: "Contenido de la noticia 1.",
    published_at: "2024-09-01"
  },
  {
    id: 2,
    title: "Noticia 2",
    image: "https://via.placeholder.com/150",
    content: "Contenido de la noticia 2.",
    published_at: "2024-09-02"
  },
  // Agrega más noticias simuladas si es necesario
];

function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simular la carga de noticias desde localStorage
    setTimeout(() => {
      try {
        const storedNews = JSON.parse(localStorage.getItem('news'));
        if (storedNews) {
          setNews(storedNews);
        } else {
          // Si no hay noticias en localStorage, usa datos simulados
          localStorage.setItem('news', JSON.stringify(mockNews));
          setNews(mockNews);
        }
        setLoading(false);
      } catch (err) {
        console.error('Error loading news:', err);
        setError('Error loading news');
        setLoading(false);
      }
    }, 1000); // Simula un pequeño retraso
  }, []);

  if (loading) {
    return <p className="news-loading">Loading...</p>;
  }

  if (error) {
    return <p className="news-error">{error}</p>;
  }

  return (
    <main className="news-main">
      <h1 className="news-header">Avisos y noticias</h1>
      {news.length === 0 ? (
        <p className="news-empty">No hay novedades</p>
      ) : (
        <ul className="news-list">
          {news.map(item => (
            <li key={item.id} className="news-item">
              <h2 className="news-title">{item.title}</h2>
              {item.image && <img className="news-image" src={item.image} alt={item.title} />}
              <p className="news-content">{item.content}</p>
              <small className="news-date">{item.published_at}</small>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

export default News;
