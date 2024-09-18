import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import './Events.css'; 

// Datos estáticos de ejemplo
const staticEvents = [
  {
    id: 1,
    title: 'Conferencia de Educación 2024',
    description: 'Un evento para discutir las tendencias actuales en la educación.',
    date: '2024-03-15',
    location: 'Auditorio Principal, Colegio X',
    image: 'https://via.placeholder.com/150' // Imagen de ejemplo
  },
  {
    id: 2,
    title: 'Feria de Ciencias 2024',
    description: 'Los estudiantes presentan sus proyectos de ciencias.',
    date: '2024-04-22',
    location: 'Gimnasio del Colegio X',
    image: 'https://via.placeholder.com/150'
  }
  // Puedes agregar más eventos aquí
];

function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Simulación de usuario autenticado
  const [editingEvent, setEditingEvent] = useState(null); // Para manejar la edición de eventos
  const [formData, setFormData] = useState({ title: '', description: '', date: '', location: '', image: '' });

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem('events'));
    if (storedEvents && storedEvents.length > 0) {
      setEvents(storedEvents);
    } else {
      // Si no hay eventos en localStorage, usar los eventos estáticos
      localStorage.setItem('events', JSON.stringify(staticEvents));
      setEvents(staticEvents);
    }
    setLoading(false);
  }, []);

  // Función para eliminar un evento
  const deleteEvent = (eventId) => {
    const updatedEvents = events.filter(event => event.id !== eventId);
    setEvents(updatedEvents);
    localStorage.setItem('events', JSON.stringify(updatedEvents)); // Actualizar localStorage
  };

  // Función para iniciar la edición de un evento
  const startEditEvent = (event) => {
    setEditingEvent(event.id);
    setFormData({ ...event });
  };

  // Función para manejar el cambio de datos en el formulario de edición
  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Función para guardar los cambios en un evento
  const saveEditEvent = () => {
    const updatedEvents = events.map(event =>
      event.id === editingEvent ? { ...formData, id: editingEvent } : event
    );
    setEvents(updatedEvents);
    localStorage.setItem('events', JSON.stringify(updatedEvents)); // Actualizar localStorage
    setEditingEvent(null); // Cerrar el formulario de edición
  };

  if (loading) {
    return <p className="loading">Loading...</p>;
  }

  return (
    <main className="events-main">
      <h1 className="events-title">Events</h1>
      {events.length === 0 ? (
        <p className="no-events">No events available</p>
      ) : (
        <ul className="events-list">
          {events.map(event => (
            <li key={event.id} className="event-item">
              <Link to={`/events/${event.id}`}>
                <h2 className="event-title">{event.title}</h2>
                {event.image && <img src={event.image} alt={event.title} className="event-image" />}
              </Link>
              <p className="event-description">{event.description}</p>
              <small className="event-date">{new Date(event.date).toLocaleDateString()}</small>
              <p className="event-location">{event.location}</p>

              {isAuthenticated && (
                <div className="event-actions">
                  <button onClick={() => deleteEvent(event.id)}>Eliminar</button>
                  <button onClick={() => startEditEvent(event)}>Editar</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}

      {editingEvent && (
        <div className="edit-form">
          <h2>Edit Event</h2>
          <form onSubmit={saveEditEvent}>
            <label>
              Título:
              <input type="text" name="title" value={formData.title} onChange={handleFormChange} required />
            </label>
            <label>
              Descripción:
              <textarea name="description" value={formData.description} onChange={handleFormChange} required />
            </label>
            <label>
              Fecha:
              <input type="date" name="date" value={formData.date} onChange={handleFormChange} required />
            </label>
            <label>
              Ubicación:
              <input type="text" name="location" value={formData.location} onChange={handleFormChange} required />
            </label>
            <label>
              Imagen (URL):
              <input type="text" name="image" value={formData.image} onChange={handleFormChange} />
            </label>
            <button type="button" onClick={saveEditEvent}>Guardar</button>
            <button type="button" onClick={() => setEditingEvent(null)}>Cancelar</button>
          </form>
        </div>
      )}
    </main>
  );
}

export default Events;
