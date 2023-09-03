import React from "react";

const EditEventForm = ({
  eventId, // The ID of the event being edited
  eventData, // Current data of the event being edited
  setEventData, // Function to update the event data state
  handleEditEvent, // Function to handle the edit event submission
}) => {
  // Handle input changes for the edit event form
  const handleChange = (e) => {
    // Update the eventData state with the new value
    setEventData({
      ...eventData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle edit event form submission
  const handleEditSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    handleEditEvent(e, eventId); // Call the parent component's handleEditEvent function
  };

  return (
    <div>
      <h2>Edit Event</h2>
      <form onSubmit={(e) => handleEditSubmit(e, eventId)}>
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
