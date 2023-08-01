import React from "react";

const EventCard = ({ event }) => {
  const { name, description, imageUrl } = event;

  return (
    <div className="event-card">
      <img src={imageUrl} alt={name} />
      <h3>{name}</h3>
      <p>{description}</p>
    </div>
  );
};

export default EventCard;
