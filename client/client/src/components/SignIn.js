import React, { useState } from "react";

const SignIn = ({ handleSignIn }) => {
  // State for storing user's credentials
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  // State for tracking successful login
  const [loginSuccess, setLoginSuccess] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    // Update the corresponding field in credentials state
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSignInSubmit = (e) => {
    e.preventDefault();
    handleSignIn(credentials); // Call the parent component's handleSignIn function
    setLoginSuccess(true); // Set loginSuccess to true
  };

  return (
    <div className="sign-in-form">
      <h2>Sign In</h2>
      {loginSuccess && <p>Login successful!</p>}
      <form onSubmit={handleSignInSubmit}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={credentials.username}
            onChange={handleChange}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default SignIn;
