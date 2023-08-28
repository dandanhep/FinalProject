import React, { useState } from "react";
//import axios from "axios";
import api from "./api";

const AddEventForm = () => {
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

  const handleSubmit = (e) => {
    e.preventDefault();

    // Retrieve the authentication token from localStorage
    // const authToken = localStorage.getItem("authToken");

    // Send a POST request to add a new event
    api
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

  return (
    <div>
      <h2>Add Event</h2>
      <form onSubmit={handleSubmit}>
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
    </div>
  );
};

export default AddEventForm;
