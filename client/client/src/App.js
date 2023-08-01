import React, { useState, useEffect } from "react";
import "./App.css";
import EventCard from "./components/EventCard";
import axios from "axios";
import SignIn from "./components/SignIn";
import sectionImage from "./images/Event-5.jpeg";

function App() {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [isSignInVisible, setIsSignInVisible] = useState(false);

  useEffect(() => {
    // Fetch upcoming events from the backend
    axios
      .get("/api/upcoming-events")
      .then((response) => {
        setUpcomingEvents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching upcoming events:", error);
      });
  }, []);

  const handleSignInClick = () => {
    setIsSignInVisible(true);
  };

  const handleSignIn = (credentials) => {
    // Send a POST request to the backend to handle sign-in
    axios
      .post("/auth/login", credentials)
      .then((response) => {
        console.log(response.data.token);
        // Handle successful sign-in
        localStorage.setItem("authToken", response.data.token);
        setIsSignInVisible(false);
      })
      .catch((error) => {
        console.error("Error signing in:", error);
      });
  };

  return (
    <div className="landing-page">
      <header className="menu-bar">
        {/*logo */}
        <div className="logo">EVENTS4U</div>

        <button className="sign-in-btn" onClick={handleSignInClick}>
          Sign In
        </button>
      </header>

      <section className="event-section">
        {/* Map over the upcoming events and display EventCard for each event */}
        {upcomingEvents.map((event) => (
          <EventCard key={event._id} event={event} />
        ))}
      </section>

      <section className="section-with-picture">
        <div className="picture">
          {/* image */}
          <img src={sectionImage} alt="Section" />
        </div>
        <div className="section-text">
          <h2>Experience Unforgettable Moments with Events4U!</h2>
          <p>
            At Events4U, we offer a diverse and exciting range of events to
            cater to every taste and preference.
          </p>
        </div>
      </section>

      {/* Render the SignIn component if isSignInVisible is true */}
      {isSignInVisible && <SignIn />}

      <footer>
        {/* footer content */}
        <p>© {new Date().getFullYear()} Events4U. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
