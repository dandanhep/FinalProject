import React from "react";
import axios from "axios";

const CancelEventForm = ({ eventId }) => {
  const handleCancelEvent = (e) => {
    e.preventDefault();

    // Send a DELETE request to cancel an existing event
    axios
      .delete(`/api/cancel-event/${eventId}`)
      .then((response) => {
        console.log(response.data.message);
      })
      .catch((error) => {
        console.error("Error canceling event:", error);
      });
  };

  return (
    <div>
      <h2>Cancel Event</h2>
      <form onSubmit={handleCancelEvent}>
        <p>Are you sure you want to cancel this event?</p>
        <button type="submit">Cancel Event</button>
      </form>
    </div>
  );
};

export default CancelEventForm;
