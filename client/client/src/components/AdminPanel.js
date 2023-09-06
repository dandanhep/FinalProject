import React, { useState, useEffect } from "react";
import axios from "axios";
import EditEventForm from "./EditEventForm";
import CancelEventForm from "./CancelEventForm";
//import api from "./api";

const AdminPanel = () => {
  const [selectedEvent] = useState(null);
  const [eventData, setEventData] = useState({
    name: "",
    description: "",
    imageUrl: "",
    date: "",
  });

  // Retrieve the authentication token and isAdmin status from local storage
  const authToken = localStorage.getItem("authToken");
  const isAdmin = localStorage.getItem("isAdmin") === "true"; // Convert to boolean
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  //const [isLoading, setIsLoading] = useState(true);
  const [allEvents, setAllEvents] = useState([]);

  useEffect(() => {
    // Fetch all events from the backend when the component mounts
    axios
      .get("/events/fetch-events")
      .then((response) => {
        console.log("All Events:", response.data);
        setAllEvents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  }, []);
  /*
  useEffect(() => {
    // Include the Authorization header with the token
    axios
      .get("/api/upcoming-events", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        console.log("Upcoming Events:", response.data); // test- Log the data
        setUpcomingEvents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching upcoming events:", error);
      });
  }, [authToken]);
*/
  /*const handleEventSelection = (eventId) => {
    setSelectedEvent(eventId);
  };*/

  const handleAddEvent = (e) => {
    e.preventDefault();
    // Retrieve the authentication token from local storage
    const authToken = localStorage.getItem("authToken");
    // Including the Authorization header with the token
    // Send a POST request to add a new event with event data
    axios
      .post("/api/add-event", eventData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        console.log(response.data.message);
        // Update the upcoming events list with the newly added event
        setUpcomingEvents([...upcomingEvents, response.data.event]);
        // Clear the form fields after successful addition
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

  const handleEditEvent = (eventId) => {
    // Retrieve the authentication token from local storage
    const authToken = localStorage.getItem("authToken");

    // Send a PUT request to edit an event with event data
    axios
      .put(`/events/edit-event/${eventId}`, eventData, {
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
    // Retrieve the authentication token from local storage
    const authToken = localStorage.getItem("authToken");
    // Send a DELETE request to cancel an event
    axios
      .delete(`/events/cancel-event/${eventId}`, {
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
          {/* The event date input field */}
          <div>
            <label htmlFor="eventDate">Event Date</label>
            <input
              type="date"
              id="eventDate"
              name="eventDate"
              value={eventData.date}
              onChange={(e) =>
                setEventData({ ...eventData, date: e.target.value })
              }
              required
            />
          </div>
          <button type="submit">Add Event</button>
        </form>
      </div>

      {/* Events List */}
      {authToken && (
        <div className="event-list">
          <h2>All Events</h2>
          <ul>
            {allEvents.map((event) => (
              <li key={event._id}>
                <h3>{event.name}</h3>
                <p>{event.description}</p>
                <p>{event.date}</p>
                <img src={event.imageUrl} alt={event.name} />
                {isAdmin && (
                  <div>
                    <button
                      className="custom-button"
                      onClick={() => handleEditEvent(event._id)}
                    >
                      Edit Event
                    </button>
                    <button
                      className="custom-button"
                      onClick={() => handleCancelEvent(event._id)}
                    >
                      Cancel Event
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

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
