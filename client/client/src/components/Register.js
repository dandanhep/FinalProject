import React, { useState } from "react";

const Register = ({ handleRegister }) => {
  // State for storing user's registration credentials
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    role: "user", // Default role is "user"
  });

  // Handle input changes for registration form
  const handleChange = (e) => {
    // Update the corresponding field in credentials state
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  // Handle registration form submission
  const handleRegisterSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    handleRegister(credentials); // Call the parent component's handleRegister function
  };

  return (
    <div className="register-form">
      <h2>Register</h2>
      <form onSubmit={handleRegisterSubmit}>
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
        <label>
          Role:
          <select name="role" value={credentials.role} onChange={handleChange}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </label>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
