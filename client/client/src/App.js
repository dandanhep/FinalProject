import React, { useState, useEffect } from "react";
import "./App.css";
import EventCard from "./components/EventCard";
import axios from "axios";
import SignIn from "./components/SignIn";
import AdminPanel from "./components/AdminPanel";
import sectionImage from "./images/Event-5.jpeg";

const event1 = {
  _id: 1,
  name: "Rhythm Fusion",
  description:
    "Welcome to the rhythmic wonderland of Rhythm Fusion! This show is all about the infectious beats and heart-pounding rhythms that bring people together on the dance floor. Witness an electrifying blend of global rhythms, from Latin grooves to African beats and everything in between. Rhythm Fusion promises to get your feet tapping, body moving, and soul dancing to the pulse of the world's most infectious rhythms.",
  imageUrl:
    "https://www.wtcmanila.com.ph/wp-content/uploads/2022/08/rear-view-of-audience-in-the-conference-hall-or-se-2021-08-30-06-51-57-utc-1.jpg",
};

const event2 = {
  _id: 2,
  name: "TuneTastic",
  description:
    "Get ready to embark on a musical adventure like no other with TuneTastic! This captivating music show is a celebration of the most tuneful and catchy tunes that have ever graced our ears. Whether you're a pop lover, rock enthusiast, or an indie aficionado, TuneTastic has something to offer for everyone. Join us as we explore the memorable tunes that have shaped generations and continue to resonate with music lovers across the globe.",
  imageUrl:
    "https://www.eventsindustryforum.co.uk/images/articles/about_the_eif.jpg",
};

const event3 = {
  _id: 3,
  name: "Melody Mania",
  description:
    "Prepare yourself for an auditory feast like no other! Melody Mania is an explosive music show that embraces the power of captivating melodies. From soothing ballads to high-energy anthems, this show brings you a vast array of musical genres, all centered around the beauty of melodies. Discover new sounds and rediscover timeless classics as we showcase the magic that melodies can weave in our lives.",
  imageUrl:
    "https://www.jwu.edu/news/2021/04/images/brenda-eckler-story-banner.jpg",
};

function App() {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [isSignInVisible, setIsSignInVisible] = useState(false);
  const authToken = localStorage.getItem("authToken"); // Get the authentication token from localStorage

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

  const handleSignOutClick = () => {
    localStorage.removeItem("authToken");
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

  // Adding the three events to the upcomingEvents state
  useEffect(() => {
    setUpcomingEvents([event1, event2, event3]);
  }, []);

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
          <button
            className="sign-in-btn"
            onClick={() => setIsSignInVisible(true)}
          >
            Sign In
          </button>
        )}
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

      {/* Conditional rendering of AdminPanel */}
      {authToken && <AdminPanel />}

      <footer>
        {/* footer content */}
        <p>© {new Date().getFullYear()} Events4U. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
