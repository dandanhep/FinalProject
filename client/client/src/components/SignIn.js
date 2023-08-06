import React, { useState } from "react";

const SignIn = ({ handleSignIn }) => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [loginSuccess, setLoginSuccess] = useState(false);

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignInSubmit = (e) => {
    e.preventDefault();
    handleSignIn(credentials); // Call the parent component's handleSignIn function
    // For simplicity, assume the handleSignIn function handles API calls and login success/failure
    setLoginSuccess(true); // Set loginSuccess to true (you can handle this based on API response)
  };

  return (
    <div>
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
