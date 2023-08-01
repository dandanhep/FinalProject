import React, { useState } from "react";
import axios from "axios";

const SignIn = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [loginSuccess, setLoginSuccess] = useState(false); // New state for login success

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignIn = (e) => {
    e.preventDefault();

    // Send a POST request to the backend to handle sign-in
    axios
      .post("/auth/login", credentials)
      .then((response) => {
        console.log(response.data.token);
        // Handle successful sign-in
        localStorage.setItem("authToken", response.data.token);
        setLoginSuccess(true);
      })
      .catch((error) => {
        console.error("Error signing in:", error);
      });
  };

  return (
    <div>
      <h2>Sign In</h2>
      {loginSuccess && <p>Login successful!</p>} {/* Display success message */}
      <form onSubmit={handleSignIn}>
        {/* ... form inputs and submit button ... */}
      </form>
    </div>
  );
};

export default SignIn;
