import React, { useState, useEffect } from "react";
import axios from "axios";
import EditEventForm from "./EditEventForm";
import CancelEventForm from "./CancelEventForm";
//import api from "./api";

const AdminPanel = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventData, setEventData] = useState({
    name: "",
    description: "",
    imageUrl: "",
  });
  const authToken = localStorage.getItem("authToken");
  const isAdmin = localStorage.getItem("isAdmin") === "true"; // Convert to boolean
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  useEffect(() => {
    // Include the Authorization header with the token
    axios
      .get("/api/upcoming-events", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        setUpcomingEvents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching upcoming events:", error);
      });
  }, [authToken]);

  const handleEventSelection = (eventId) => {
    setSelectedEvent(eventId);
  };

  const handleAddEvent = (e) => {
    e.preventDefault();

    // test: Output the token value to the console before sending the request
    const authToken = localStorage.getItem("authToken");
    console.log("Token being sent:", authToken);
    // Including the Authorization header with the token
    axios
      .post("/api/add-event", eventData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        console.log(response.data.message);
        setUpcomingEvents([...upcomingEvents, response.data.event]);
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
    // Include the Authorization header with the token
    axios
      .put(`/edit-event/${eventId}`, eventData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        console.log(response.data.message);
      })
      .catch((error) => {
        console.error("Error editing event:", error);
      });
  };

  const handleCancelEvent = (eventId) => {
    // Include the Authorization header with the token
    axios
      .delete(`/cancel-event/${eventId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        console.log(response.data.message);
      })
      .catch((error) => {
        console.error("Error canceling event:", error);
      });
  };

  return (
    <div className="admin-panel">
      {/* Add Event Form */}
      <div className="add-event-form">
        <h2>Add Event</h2>
        <form onSubmit={handleAddEvent}>
          <div>
            <label htmlFor="name">Event Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={eventData.name}
              onChange={(e) =>
                setEventData({ ...eventData, name: e.target.value })
              }
              required
            />
          </div>
          <div>
            <label htmlFor="description">Event Description</label>
            <textarea
              id="description"
              name="description"
              value={eventData.description}
              onChange={(e) =>
                setEventData({ ...eventData, description: e.target.value })
              }
              required
            />
          </div>
          <div>
            <label htmlFor="imageUrl">Image URL</label>
            <input
              type="text"
              id="imageUrl"
              name="imageUrl"
              value={eventData.imageUrl}
              onChange={(e) =>
                setEventData({ ...eventData, imageUrl: e.target.value })
              }
              required
            />
          </div>
          <button type="submit">Add Event</button>
        </form>
      </div>

      {/* Edit Event Form */}
      <div>
        <h2>Events List</h2>
        <ul>
          {upcomingEvents.map((event) => (
            <li key={event._id}>
              <h3>{event.name}</h3>
              <p>{event.description}</p>
              {isAdmin === "true" && authToken && (
                <div>
                  <button onClick={() => handleEventSelection(event._id)}>
                    Edit Event
                  </button>
                  <button onClick={() => handleCancelEvent(event._id)}>
                    Cancel Event
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Edit Event Form */}
      {selectedEvent && (
        <EditEventForm
          eventId={selectedEvent}
          eventData={eventData}
          setEventData={setEventData}
          handleEditEvent={handleEditEvent}
        />
      )}

      {/* Cancel Event Form */}
      {selectedEvent && (
        <CancelEventForm
          eventId={selectedEvent}
          handleCancelEvent={handleCancelEvent}
        />
      )}
    </div>
  );
};

export default AdminPanel;
