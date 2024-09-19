import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Events.css';

function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [formData, setFormData] = useState({ title: '', description: '', date: '', location: '', image: '' });
  const [showAddEventForm, setShowAddEventForm] = useState(false);

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem('events'));
    if (storedEvents && storedEvents.length > 0) {
      setEvents(storedEvents);
    } else {
      const staticEvents = [
        { id: 1, title: 'Conferencia de Educación 2024', description: 'Un evento para discutir las tendencias actuales en la educación.', date: '2024-03-15', location: 'Auditorio Principal, Colegio X', image: 'https://via.placeholder.com/150' },
        { id: 2, title: 'Feria de Ciencias 2024', description: 'Los estudiantes presentan sus proyectos de ciencias.', date: '2024-04-22', location: 'Gimnasio del Colegio X', image: 'https://via.placeholder.com/150' }
      ];
      localStorage.setItem('events', JSON.stringify(staticEvents));
      setEvents(staticEvents);
    }
  
    // Obtener el usuario almacenado en localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    
    // Verificar si existe el usuario
    setIsAuthenticated(!!user); // Cambia a `true` si existe un usuario válido
    
    // Debug para verificar si se está autenticando correctamente
    console.log("Usuario autenticado:", user, "Estado de autenticación:", !!user);
  
    setLoading(false); // Finaliza la carga una vez se ha verificado la autenticación
  }, []);

  const deleteEvent = (eventId) => {
    const updatedEvents = events.filter(event => event.id !== eventId);
    setEvents(updatedEvents);
    localStorage.setItem('events', JSON.stringify(updatedEvents));
  };

  const startEditEvent = (event) => {
    setEditingEvent(event.id);
    setFormData({ ...event });
  };

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const saveEditEvent = () => {
    const updatedEvents = events.map(event =>
      event.id === editingEvent ? { ...formData, id: editingEvent } : event
    );
    setEvents(updatedEvents);
    localStorage.setItem('events', JSON.stringify(updatedEvents));
    setEditingEvent(null);
  };

  const addNewEvent = (e) => {
    e.preventDefault();
  
    // Encuentra el ID más alto actual y asigna uno nuevo incrementado
    const maxId = events.length > 0 ? Math.max(...events.map(event => event.id)) : 0;
  
    const newEvent = {
      id: maxId + 1, // Generar un nuevo ID único
      title: formData.title,
      description: formData.description,
      date: formData.date,
      location: formData.location,
      image: formData.image
    };
  
    const updatedEvents = [...events, newEvent];
    setEvents(updatedEvents);
    localStorage.setItem('events', JSON.stringify(updatedEvents)); // Guardar en localStorage
    setShowAddEventForm(false); // Cerrar el formulario después de agregar el evento
  };

  if (loading) {
    return <p className="loading">Loading...</p>;
  }

  return (
    <main className="events-main">
      <h1 className="events-title">Próximos Eventos</h1>
      {events.length === 0 ? (
        <p className="no-events">No events available</p>
      ) : (
        <ul className="events-list">
          {events.map(event => (
            <li key={event.id} className="event-item">
              <Link to={`/events/${event.id}`} className="event-link">
                <h2 className="event-title">{event.title}</h2>
                {event.image && <img src={event.image} alt={event.title} className="event-image" />}
              </Link>
              <p className="event-description">{event.description}</p>
              <div className="event-meta">
                <small className="event-date">{new Date(event.date).toLocaleDateString()}</small>
                <p className="event-location">{event.location}</p>
              </div>

              {/* Botones de Eliminar y Editar: solo si el usuario está autenticado */}
              {isAuthenticated && (
                <div className="event-actions">
                  <button onClick={() => deleteEvent(event.id)} className="delete-btn">Eliminar</button>
                  <button onClick={() => startEditEvent(event)} className="edit-btn">Editar</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}

      {/* Formulario de edición: solo si se está editando un evento */}
      {editingEvent && (
        <div className="edit-form">
          <h2>Edit Event</h2>
          <form onSubmit={saveEditEvent} className="form">
            <label>
              Título:
              <input className="form-input" type="text" name="title" value={formData.title} onChange={handleFormChange} required />
            </label>
            <label>
              Descripción:
              <textarea className="form-textarea" name="description" value={formData.description} onChange={handleFormChange} required />
            </label>
            <label>
              Fecha:
              <input className="form-input" type="date" name="date" value={formData.date} onChange={handleFormChange} required />
            </label>
            <label>
              Ubicación:
              <input className="form-input" type="text" name="location" value={formData.location} onChange={handleFormChange} required />
            </label>
            <label>
              Imagen (URL):
              <input className="form-input" type="text" name="image" value={formData.image} onChange={handleFormChange} />
            </label>
            <button type="button" className="save-btn" onClick={saveEditEvent}>Guardar</button>
            <button type="button" className="cancel-btn" onClick={() => setEditingEvent(null)}>Cancelar</button>
          </form>
        </div>
      )}

      {/* Botón para agregar evento: solo si el usuario está autenticado */}
      {isAuthenticated && (
        <button onClick={() => setShowAddEventForm(true)} className="add-event-button">Agregar Evento</button>
      )}

      {/* Formulario para agregar evento: solo visible si showAddEventForm es true */}
      {showAddEventForm && isAuthenticated && (
        <div className="add-event-form">
          <h2>Agregar Evento</h2>
          <form onSubmit={addNewEvent}>
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
            <button type="submit">Agregar Evento</button>
            <button type="button" onClick={() => setShowAddEventForm(false)}>Cancelar</button>
          </form>
        </div>
      )}
    </main>
  );
}

export default Events;
