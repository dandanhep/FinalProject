import React, { useState } from "react";
import axios from "axios";

const EditEventForm = ({ eventId }) => {
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

  const handleEditEvent = (e) => {
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

  return (
    <div>
      <h2>Edit Event</h2>
      <form onSubmit={handleEditEvent}>
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
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditEventForm;
