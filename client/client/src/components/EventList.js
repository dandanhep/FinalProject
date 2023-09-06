import React, { useState, useEffect } from "react";
import axios from "axios";

function EventList() {
  // Define a state variable 'events' and a function 'setEvents' to update it
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Use the useEffect hook to fetch events from the backend when the component mounts
    axios
      .get("/events/fetch-events")
      .then((response) => {
        // Update the 'events' state with the data retrieved from the backend
        setEvents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  }, []); // The empty dependency array ensures that this effect runs only once when the component mounts

  return (
    <div className="event-list">
      <h2>Events List</h2> {/* Updated heading */}
      <ul>
        {/* Map through the 'events' array to render event items */}
        {events.map((event) => (
          <li key={event._id}>
            <h3>{event.name}</h3> {/* Display the event name */}
            <p>{event.description}</p> {/* Display the event description */}
            <p>Date: {new Date(event.date).toLocaleDateString()}</p>{" "}
            {/* Format and display the event date */}
            <img src={event.imageUrl} alt={event.name} />{" "}
            {/* Display the event image */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EventList;
