import React, { useState, useEffect } from "react";
import "./App.css";
import EventCard from "./components/EventCard";
import axios from "axios";
import SignIn from "./components/SignIn";
import Register from "./components/Register";
import AdminPanel from "./components/AdminPanel";
import sectionImage from "./images/Event-5.jpeg";

function App() {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [isSignInVisible, setIsSignInVisible] = useState(false);
  const authToken = localStorage.getItem("authToken"); // Get the authentication token from localStorage
  const isAdmin = localStorage.getItem("isAdmin");

  useEffect(() => {
    axios
      .get("/api/upcoming-events")
      .then((response) => {
        setUpcomingEvents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching upcoming events:", error);
      });
  }, []);

  const handleSignOutClick = () => {
    localStorage.removeItem("authToken");
    setIsSignInVisible(true);
  };

  // Define the handleSignIn function
  const handleSignIn = (credentials) => {
    return axios
      .post("/auth/login", credentials)
      .then((response) => {
        const authToken = response.data.token;
        const isAdmin = response.data.isAdmin; // Get the isAdmin flag from the response

        localStorage.setItem("authToken", authToken);
        localStorage.setItem("isAdmin", isAdmin); // Store the isAdmin flag
        setIsSignInVisible(false);

        return { success: true, isAdmin }; // Return success and isAdmin values
      })
      .catch((error) => {
        console.error("Error signing in:", error);
        return { success: false, isAdmin: false }; // Return false for both success and isAdmin
      });
  };

  const [isRegisterVisible, setIsRegisterVisible] = useState(false);

  const handleRegister = (registrationData) => {
    // Send a POST request to register the user
    axios
      .post("/auth/register", registrationData)
      .then((response) => {
        // Handle successful registration
        console.log(response.data.message);
        setIsRegisterVisible(false); // Hide the registration form after successful registration
      })
      .catch((error) => {
        console.error("Error registering user:", error);
      });
  };

  return (
    <div className="landing-page">
      <header className="menu-bar">
        {/*logo */}
        <div className="logo">EVENTS4U</div>

        {authToken ? (
          // If the user is authenticated, show the "Sign Out" button
          <button className="sign-in-btn" onClick={handleSignOutClick}>
            Sign Out
          </button>
        ) : (
          // If the user is not authenticated, show the "Sign In" button
          <div>
            <button
              className="sign-in-btn"
              onClick={() => setIsSignInVisible(true)}
            >
              Sign In
            </button>
            <button
              className="sign-in-btn"
              onClick={() => setIsRegisterVisible(true)}
            >
              Register
            </button>
          </div>
        )}
      </header>

      <section className="event-section">
        {/* Map over the upcoming events and display EventCard for each event */}
        {upcomingEvents.map((event) => (
          <EventCard key={event._id} event={event} />
        ))}

        {/* Display the upcoming events as a list */}
        <div className="upcoming-events">
          <h2>Upcoming Events</h2>
          <ul>
            {upcomingEvents.map((event) => (
              <li key={event._id}>
                <h3>{event.name}</h3>
                <p>{event.description}</p>
                <img src={event.imageUrl} alt={event.name} />
              </li>
            ))}
          </ul>
        </div>
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

      {/* Conditional rendering of AdminPanel */}
      {isAdmin === "true" && authToken && <AdminPanel />}

      {/* Render the SignIn component if isSignInVisible is true */}
      {isSignInVisible && <SignIn handleSignIn={handleSignIn} />}
      {isRegisterVisible && <Register handleRegister={handleRegister} />}

      <footer>
        {/* footer content */}
        <p>© {new Date().getFullYear()} Events4U. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
