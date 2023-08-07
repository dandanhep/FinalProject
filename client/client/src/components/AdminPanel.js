import React, { useState } from "react";
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

  // Function to handle selecting an event for editing or canceling
  const handleEventSelection = (event) => {
    setSelectedEvent(event);
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
