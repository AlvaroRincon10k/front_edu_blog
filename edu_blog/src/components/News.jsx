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
  {
    id: 3,
    title: "Noticia 3",
    image: "https://via.placeholder.com/150",
    content: "Contenido de la noticia 3.",
    published_at: "2024-09-02"
  },
  {
    id: 4,
    title: "Noticia 4",
    image: "https://via.placeholder.com/150",
    content: "Contenido de la noticia 4.",
    published_at: "2024-09-02"
  },
  {
    id: 5,
    title: "Noticia 5",
    image: "https://via.placeholder.com/150",
    content: "Contenido de la noticia 5.",
    published_at: "2024-09-02"
  },
  {
    id: 6,
    title: "Noticia 6",
    image: "https://via.placeholder.com/150",
    content: "Contenido de la noticia 6.",
    published_at: "2024-09-02"
  },
  // Agrega más noticias simuladas si es necesario
];

function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Cargar noticias desde localStorage
    const loadNews = () => {
      try {
        const storedNews = JSON.parse(localStorage.getItem('news')) || [];
        if (storedNews.length === 0) {
          // Si localStorage está vacío, guardar noticias simuladas
          localStorage.setItem('news', JSON.stringify(mockNews));
          setNews(mockNews);
        } else {
          setNews(storedNews);
        }
        setLoading(false);
      } catch (err) {
        console.error('Error loading news:', err);
        setError('Error loading news');
        setLoading(false);
      }
    };

    loadNews();
  }, []);

  useEffect(() => {
    // Guardar noticias en localStorage cuando se actualice el estado
    localStorage.setItem('news', JSON.stringify(news));
  }, [news]);

  const addNews = (newNewsItem) => {
    setNews(prevNews => [...prevNews, newNewsItem]);
  };

  const removeNews = (id) => {
    setNews(prevNews => prevNews.filter(newsItem => newsItem.id !== id));
  };

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
