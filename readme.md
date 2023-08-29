# Software Requirements Documentation - Event Management App

### a. Explanation of how to use the app:

The Events4U app is a platform that allows users to browse upcoming events, sign in to their accounts, and view event details. Users can register and log in to their accounts securely. Admin users can also access an admin panel to add, edit, or cancel events. The landing page displays upcoming events, and users can click on the "Sign In" button to log in or view the event details. The admin panel is accessible only to authorized admin users, who can perform CRUD operations on events.

use this login - username:admintest@gmail.com password: test

### b. Instructions for installing, testing, and running the app on a local machine:

1. Prerequisites:
   Node.js and npm should be installed on your machine.
2. Clone the repository:
   Open a terminal or command prompt.
   Clone the GitHub repository to your local machine using the following command:
   git clone https://github.com/dandanhep/FinalProject.git
3. Install dependencies:
   -Navigate to the project folder:
   cd conference-app
   -Install the server-side dependencies:
   cd server
   npm install
   -Install the client-side dependencies:
   cd ../client
   npm install
4. Run the app: -In the server folder, start the back-end server:
   npm start. -In the client folder, start the front-end development server: npm start
5. Open the app in your browser:
   The app will be accessible at http://localhost:3000/.
6. Testing: To run the tests for the client-side, use the following command in the client folder:
   npm test

### c. Security measures taken:

User Authentication: The app uses bcrypt to securely hash and store user passwords in the database. JWT tokens are used for authentication, which are generated upon successful login and validated before granting access to protected routes.
API Keys: API keys (if any) are stored securely using environment variables or configuration files that are not committed to the version control system. This prevents exposing sensitive data in the repository.

### e. Deployment:

Deploying both the back-end and front-end together on the same server is simpler and easier to manage, especially for smaller applications.
Deployed here: https://vercel.com/dhepburn97-gmailcom/final-project
https://final-project-one-tawny.vercel.app

-

### System Architecture

The Event Management App will be developed using the MERN stack, which stands for MongoDB, Express.js, React, and Node.js. This choice of architecture offers several advantages:

MongoDB: A NoSQL database that allows us to store event and user information in a flexible and scalable manner.
Express.js: A lightweight and flexible web application framework for Node.js, which will handle the backend logic and API endpoints.
React: A popular front-end library for building dynamic and interactive user interfaces.
Node.js: A server-side runtime environment for executing JavaScript code, enabling us to build a complete JavaScript-based application.

Frontend:

The frontend of the application will be built using Create React App (CRA). CRA provides a simple and efficient way to set up a React application with minimal configuration, allowing us to focus on development rather than build setup.
For styling, we will use CSS-in-JS with styled-components. This approach enables us to write component-based styles and maintain a consistent look and feel across the application.

Backend:

The backend server will be created using Express.js, handling API endpoints for event management and user authentication.
MongoDB will serve as the database to store event and user information.
User authentication will be implemented using JSON Web Tokens (JWT) for secure and stateless authentication.

### System Requirements Specification:

The Event Management App aims to provide a platform for the conference center to advertise upcoming events and manage event information effectively. The application will cater to two types of users: normal end-users and administrators.

### User Stories:

As a normal end-user, I want to view a list of upcoming events to see what events are scheduled at the conference center.
As a normal end-user, I want to view event details including event name, description, date, and a relevant image.
As an administrator, I want to be able to add new events to the system, providing event details and an optional image.
As an administrator, I want to edit existing events, including event details and images.
As an administrator, I want to cancel events if they are no longer going to take place.

### Competitor Comparison:

Currently, there are similar Event Management App available, but they may lack certain functionalities or have complex user interfaces. Our application aims to provide a simpler, more user-friendly interface for managing events and a smooth user experience. We will also emphasize seamless event creation and editing capabilities for administrators.

### Functional Requirements:

Users should be able to view a list of upcoming events on the landing page.
Users should be able to click on an event to view its detailed information.
Administrators should have a separate admin panel for event management.
Administrators should be able to add, edit, and cancel events.
User authentication should be implemented to distinguish between normal users and administrators.

### Non-Functional Requirements:

The application should be responsive and accessible, providing an optimal user experience across different devices.
The system should handle a large number of concurrent users without significant performance degradation.
User data, including passwords and personal information, should be securely encrypted and stored.
The application should have a visually appealing design, reflecting the branding of the conference center.
Error handling should be robust to provide helpful feedback to users in case of any issues.
The application should be deployed on a reliable and scalable hosting platform to ensure high availability.
