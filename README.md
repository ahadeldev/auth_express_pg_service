# User Authentication and Authorization Service

This is a simple yet robust User Authentication and Authorization API built using Node.js, Express.js, and PostgreSQL. The API provides basic user management functionalities such as registering, logging in, updating user profiles, and deleting user accounts. It uses JWT for secure authentication and authorization.

## Table of Contents
- [Project Overview](#project-overview)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Folder Structure](#folder-structure)
- [Routes](#routes)
- [Middleware](#middleware)
- [Error Handling](#error-handling)
- [Running the Application](#running-the-application)

## Project Overview

The API is designed to manage user profiles with the following key features:
- User registration with hashed passwords.
- Login functionality with JWT token generation.
- Protected routes for user profile retrieval, update, and deletion.
- Secure logout functionality to invalidate JWT tokens.

The following modules are utilized:
- **Express.js** for handling HTTP requests.
- **PostgreSQL** for database management.
- **JWT** for token-based authentication.
- **Bcrypt** for password hashing and comparison.

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the PostgreSQL database and tables by running the SQL schema:
   ```bash
   psql -U <username> -d <dbname> -f schema/schema.sql
   ```

4. Create a `.env` file in the root directory to set up environment variables (refer to [Environment Variables](#environment-variables)).

5. Run the application:
   ```bash
   npm start
   ```

## Environment Variables

Make sure to create a `.env` file in the root directory with the following content:

```env
PORT = 8000
JWT_SECRET = your_jwt_secret_key
DB_HOST = localhost
DB_PORT = 5432
DB_USER = your_db_username
DB_PASS = your_db_password
DB_NAME = jwt_auth
```

## Folder Structure

The project follows a modular folder structure to keep it clean and maintainable:

```
auth
│   auth.controllers.js      # Controller for handling authentication routes
│   auth.routes.js           # Defines the routes for authentication
│   auth.services.js         # Contains business logic for authentication

config
│   db.config.js             # Database connection configuration

middlewares
│   appErrorHandler.js       # Global error handler for the app
│   logger.js                # Logs the requests and responses
│   logoutMiddleware.js      # Handles token invalidation on logout
│   notFound.js              # Handles 404 errors for undefined routes
│   verifyToken.js           # Middleware to verify JWT tokens

node_modules
│   # Contains project dependencies

schema
│   schema.sql               # SQL schema for the PostgreSQL database

shared
│   apiError.js              # Custom error handler for the app
│   httpStatusCodes.js       # Contains HTTP status codes used in the app

utils
│   generateToken.js         # Utility to generate JWT tokens
│   hashPassword.js          # Utility to hash passwords

.env                        # Environment variable configuration
package-lock.json           # Contains the exact versions of installed dependencies
package.json                # Project metadata and dependencies

server.js                   # Entry point of the application
```

## Routes

### 1. Register new user
- **Route**: `POST /api/v1/register`
- **Access**: Public
- **Description**: Registers a new user by providing `name`, `email`, `username`, and `password`.

### 2. Login user
- **Route**: `POST /api/v1/login`
- **Access**: Public
- **Description**: Authenticates a user and returns a JWT token. Requires `username` and `password`.

### 3. Logout user
- **Route**: `POST /api/v1/logout`
- **Access**: Private
- **Description**: Logs out the user by invalidating the JWT token, storing it in the `logout_tokens` table.

### 4. Get user profile
- **Route**: `GET /api/v1/profile`
- **Access**: Private
- **Description**: Retrieves the authenticated user's profile information.

### 5. Update user info
- **Route**: `PUT /api/v1/profile`
- **Access**: Private
- **Description**: Updates the user's profile information. Requires `newName`, `newEmail`, `newUsername`, and `newPassword`.

### 6. Delete user profile
- **Route**: `DELETE /api/v1/profile`
- **Access**: Private
- **Description**: Deletes the user's account from the system.

## Middleware

### 1. `verifyToken.js`
This middleware is used to verify the JWT token provided in the request header. It checks if the token is valid and hasn't expired.

### 2. `logoutMiddleware.js`
This middleware invalidates the JWT token by storing it in the `logout_tokens` table. Once the token is in the blacklist, it can't be used again.

### 3. `appErrorHandler.js`
Handles global application errors and sends standardized error responses to the client.

### 4. `notFound.js`
Handles 404 errors for undefined routes, ensuring that any invalid request returns an appropriate response.

### 5. `logger.js`
Logs incoming requests and responses for debugging and auditing purposes.

## Error Handling

The project uses custom error handling through the `ApiError` class, which allows for standardized error messages and status codes. The `httpStatusCodes.js` file contains a list of common HTTP status codes to be used in responses.

## Running the Application

1. Make sure PostgreSQL is running and the database is set up.
2. Run the application using:
   ```bash
   npm start
   ```
3. The server will start on port 3000 (or the port specified in the `.env` file). You can now test the routes using tools like Insomnia or Postman.


### Highlights:
- **Modular Design**: The project is structured into clear, logical modules such as `auth`, `middlewares`, and `utils`.
- **Comprehensive API Description**: Each route is described in detail, including its method, path, and access level.
- **Middleware and Error Handling**: The README explains how different middlewares like `verifyToken`, `logoutMiddleware`, and error handling work to ensure secure and consistent behavior.
- **Environment Configuration**: Instructions for configuring the environment and database.
