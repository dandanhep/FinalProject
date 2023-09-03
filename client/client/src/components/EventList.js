import React, { useState, useEffect } from "react";
import axios from "axios";

function EventList() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch events from the backend
    axios
      .get("/events/fetch-events")
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  }, []);

  return (
    <div>
      <h2>Events</h2>
      <ul>
        {events.map((event) => (
          <li key={event._id}>
            <h3>{event.name}</h3>
            <p>{event.description}</p>
            <img src={event.imageUrl} alt={event.name} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EventList;
