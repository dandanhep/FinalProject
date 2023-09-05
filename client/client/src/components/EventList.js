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
    <div className="event-list"> {/* Add a className for styling */}
      <h2>Events List</h2> {/* Updated heading */}
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
