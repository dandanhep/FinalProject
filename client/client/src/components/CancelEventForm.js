import React from "react";

const CancelEventForm = ({ eventId, handleCancelEvent }) => {
  const handleCancelSubmit = (e) => {
    e.preventDefault();
    handleCancelEvent(eventId);
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
