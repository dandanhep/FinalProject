import React, { useState } from "react";
import axios from "axios";

const AdminPanel = () => {
  const [eventData, setEventData] = useState({
    name: "",
    description: "",
    imageUrl: "",
  });

  const handleChange = (e) => {
    setEventData({
      ...eventData,
      [e.target.name]: e.target.value,
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
        <label>
          Event Name:
          <input
            type="text"
            name="name"
            value={eventData.name}
            onChange={handleChange}
          />
        </label>
        <label>
          Description:
          <input
            type="text"
            name="description"
            value={eventData.description}
            onChange={handleChange}
          />
        </label>
        <label>
          Image URL:
          <input
            type="text"
            name="imageUrl"
            value={eventData.imageUrl}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Add Event</button>
      </form>

      {/* Edit Event Form */}
      <h2>Edit Event</h2>

      {/* On selecting an event, edit the form fields with its data */}
      {/* Allow editing and handleEditEvent when form is submitted */}

      {/* Cancel Event Form */}
      <h2>Cancel Event</h2>

      {/* On selecting an event, handleCancelEvent when form is submitted */}
    </div>
  );
};

export default AdminPanel;
