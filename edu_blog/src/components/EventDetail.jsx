import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './EventDetail.css';

function EventDetail() {
  const { eventoId } = useParams();
  const [evento, setEvento] = useState(null);
  const [comentarios, setComentarios] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [status, setStatus] = useState({ loading: true, error: null });

  useEffect(() => {
    // Simulate fetching event and comments from localStorage
    const storedEventos = JSON.parse(localStorage.getItem('eventos')) || [];
    const storedComentarios = JSON.parse(localStorage.getItem('comentarios')) || [];
    
    const evento = storedEventos.find(e => e.id === parseInt(eventoId));
    const comentarios = storedComentarios.filter(c => c.eventoId === parseInt(eventoId));

    if (evento) {
      setEvento(evento);
    } else {
      setStatus({ loading: false, error: 'Evento no encontrado' });
      return;
    }

    setComentarios(comentarios);
    setStatus({ loading: false, error: null });
  }, [eventoId]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    const newCommentData = {
      id: Date.now(), // Simulate a unique ID
      contenido: newComment,
      usuario: 'Usuario', // Simulated user
      fecha_publicacion: new Date().toISOString(),
      eventoId: parseInt(eventoId),
    };

    const storedComentarios = JSON.parse(localStorage.getItem('comentarios')) || [];
    storedComentarios.push(newCommentData);

    localStorage.setItem('comentarios', JSON.stringify(storedComentarios));
    setComentarios([...comentarios, newCommentData]);
    setNewComment('');
  };

  if (status.loading) {
    return <p>Loading...</p>;
  }

  if (status.error) {
    return <p>{status.error}</p>;
  }

  return (
    <div className="event-detail">
      {/* Event Details */}
      {evento && (
        <>
          <h1 className="evento-title">{evento.title}</h1>
          {evento.image && <img src={evento.image} alt={evento.title} className="evento-image" />}
          <p>{evento.description}</p>
          <p>Fecha: {new Date(evento.date).toLocaleDateString()}</p>
        </>
      )}

      {/* Comment Section */}
      <h2>Comentarios</h2>
      {comentarios.length > 0 ? (
        <ul className="comentarios-list">
          {comentarios.map(comentario => (
            <li key={comentario.id} className="comentario-item">
              <strong>{comentario.usuario}</strong>: {comentario.contenido}
              <br />
              <small>Publicado el {new Date(comentario.fecha_publicacion).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay comentarios aún. Sé el primero en comentar.</p>
      )}

      {/* Comment Form */}
      <form onSubmit={handleCommentSubmit} className="comentario-form">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          rows="4"
          placeholder="Escribe tu comentario"
          required
          className="comentario-textarea"
        />
        <button type="submit" className="comentario-button">Enviar comentario</button>
      </form>
    </div>
  );
}

export default EventDetail;
