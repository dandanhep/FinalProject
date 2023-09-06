import React, { useState } from "react";
import axios from "axios";
//import api from "./api";

const AddEventForm = () => {
  // Define a state to hold the event data
  const [eventData, setEventData] = useState({
    name: "",
    description: "",
    imageUrl: "",
    date: "",
  });

  // Handle changes in input fields
  const handleChange = (e) => {
    // Update the eventData state with the new value while preserving other fields
    setEventData({
      ...eventData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    const authToken = localStorage.getItem("authToken");
    // Send a POST request to add a new event
    axios
      .post("/api/add-event", eventData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        console.log(response.data.message);
        // Clear the form after successful addition
        setEventData({
          name: "",
          description: "",
          imageUrl: "",
          date: "",
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
        <label>
          Event Date:
          <input
            type="date"
            name="date"
            value={eventData.date}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Add Event</button>
      </form>
    </div>
  );
};

export default AddEventForm;
