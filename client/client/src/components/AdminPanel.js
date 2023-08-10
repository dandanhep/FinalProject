import React, { useState, useEffect } from "react";
import axios from "axios";
import EditEventForm from "./EditEventForm";
import CancelEventForm from "./CancelEventForm";

const AdminPanel = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventData, setEventData] = useState({
    name: "",
    description: "",
    imageUrl: "",
  });
  const [upcomingEvents, setUpcomingEvents] = useState([]); // Define the state for upcomingEvents

  useEffect(() => {
    // Fetch upcoming events from the backend
    axios
      .get("/api/upcoming-events")
      .then((response) => {
        setUpcomingEvents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching upcoming events:", error);
      });
  }, []);

  // Function to handle selecting an event for editing or canceling
  const handleEventSelection = (event) => {
    setSelectedEvent(event._id); // Set selectedEvent with the event ID
  };

  const handleAddEvent = (e) => {
    e.preventDefault();

    // Send a POST request to add a new event
    axios
      .post("/api/add-event", eventData)
      .then((response) => {
        console.log(response.data.message);
        // Clear the form after successful addition
        setEventData({
          name: "",
          description: "",
          imageUrl: "",
        });
      })
      .catch((error) => {
        console.error("Error adding event:", error);
      });
  };

  const handleEditEvent = (e, eventId) => {
    e.preventDefault();

    // Send a PUT request to edit an existing event
    axios
      .put(`/api/edit-event/${eventId}`, eventData)
      .then((response) => {
        console.log(response.data.message);
      })
      .catch((error) => {
        console.error("Error editing event:", error);
      });
  };

  const handleCancelEvent = (e, eventId) => {
    e.preventDefault();

    // Send a DELETE request to cancel an existing event
    axios
      .delete(`/api/cancel-event/${eventId}`)
      .then((response) => {
        console.log(response.data.message);
      })
      .catch((error) => {
        console.error("Error canceling event:", error);
      });
  };

  return (
    <div>
      <h2>Add Event</h2>
      <form onSubmit={handleAddEvent}>
        {/* ... Form inputs ... */}
        <button type="submit">Add Event</button>
      </form>

      {/* Edit Event Form */}
      <div>
        <h2>Events List</h2>
        <ul>
          {/* Map over the events and display buttons */}
          {upcomingEvents.map((event) => (
            <li key={event._id}>
              <h3>{event.name}</h3>
              <p>{event.description}</p>
              <button onClick={() => handleEventSelection(event)}>
                Edit Event
              </button>
              <button onClick={() => handleEventSelection(event)}>
                Cancel Event
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Edit Event Form */}
      {selectedEvent && (
        <EditEventForm
          eventId={selectedEvent._id}
          eventData={eventData}
          setEventData={setEventData}
          handleEditEvent={handleEditEvent} // Pass handleEditEvent as a prop
        />
      )}

      {/* Cancel Event Form */}
      {selectedEvent && (
        <CancelEventForm
          eventId={selectedEvent._id}
          handleCancelEvent={handleCancelEvent} // Pass handleCancelEvent as a prop
        />
      )}
    </div>
  );
};

export default AdminPanel;
