import React, { useState, useEffect } from "react";
//import axios from "axios";
import EditEventForm from "./EditEventForm";
import CancelEventForm from "./CancelEventForm";
import api from "./api";

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
    api
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

    //const authToken = localStorage.getItem("authToken"); // Get the authentication token from localStorage

    // Send a POST request to add a new event
    api
      .post("/api/add-event", eventData) // Send the eventData in the POST request
      .then((response) => {
        console.log(response.data.message);
        // Update the upcomingEvents state with the new event
        setUpcomingEvents([...upcomingEvents, eventData]);
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

    //const authToken = localStorage.getItem("authToken"); // Get the authentication token from localStorage

    // Send a PUT request to edit an existing event
    api
      .put(`/edit-event/${eventId}`, eventData)
      .then((response) => {
        console.log(response.data.message);
      })
      .catch((error) => {
        console.error("Error editing event:", error);
      });
  };

  const handleCancelEvent = (eventId) => {
    //const authToken = localStorage.getItem("authToken");

    api
      .delete(`/cancel-event/${eventId}`)
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
              <button onClick={() => handleCancelEvent(event._id)}>
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
