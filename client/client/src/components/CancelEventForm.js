import React from "react";

// CancelEventForm is a functional component that takes two props: eventId and handleCancelEvent
const CancelEventForm = ({ eventId, handleCancelEvent }) => {
  // Handle form submission to cancel the event
  const handleCancelSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    handleCancelEvent(eventId); // Call the parent component's handleCancelEvent function with eventId
  };

  return (
    <div>
      <h2>Cancel Event</h2>
      <form onSubmit={handleCancelSubmit}>
        <p>Are you sure you want to cancel this event?</p>
        <button type="submit">Yes, Cancel Event</button>
      </form>
    </div>
  );
};

export default CancelEventForm;
