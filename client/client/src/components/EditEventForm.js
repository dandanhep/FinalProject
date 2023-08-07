import React from "react";

const EditEventForm = ({
  eventId,
  eventData,
  setEventData,
  handleEditEvent,
}) => {
  const handleChange = (e) => {
    setEventData({
      ...eventData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    handleEditEvent(e, eventId);
  };

  return (
    <div>
      <h2>Edit Event</h2>
      <form onSubmit={handleEditSubmit}>
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
