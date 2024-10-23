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
    fetch('http://localhost:5000/api/events')
      .then(response => response.json())
      .then(data => {
        setEvents(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching events:', error);
        setLoading(false);
      });

    const user = JSON.parse(localStorage.getItem('user'));
    setIsAuthenticated(!!user);  
  }, []);

 
  const deleteEvent = (eventId) => {
    fetch(`http://localhost:5000/api/events/${eventId}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (response.ok) {
          setEvents(events.filter(event => event.id !== eventId));
        } else {
          console.error('Failed to delete event');
        }
      })
      .catch(error => console.error('Error deleting event:', error));
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
    fetch(`http://localhost:5000/api/events/${editingEvent}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(data => {
        const updatedEvents = events.map(event =>
          event.id === editingEvent ? data : event
        );
        setEvents(updatedEvents);
        setEditingEvent(null);
      })
      .catch(error => console.error('Error updating event:', error));
  };

  
  const addNewEvent = (e) => {
    e.preventDefault();

    fetch('http://localhost:5000/api/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(data => {
        setEvents([...events, data.event]);
        setShowAddEventForm(false);
      })
      .catch(error => console.error('Error adding event:', error));
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

      {isAuthenticated && (
        <button onClick={() => setShowAddEventForm(true)} className="add-event-button">Agregar Evento</button>
      )}

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
