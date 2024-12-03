-- Create the database
CREATE DATABASE jwt_auth;

-- Switch the connection to jwt_auth database
\c jwt_auth;

-- Create users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  username VARCHAR(100) NOT NULL UNIQUE,
  password TEXT NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create loggedout tokens table
CREATE TABLE logout_tokens (
  id SERIAL PRIMARY KEY,
  token TEXT NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create a New User
CREATE USER db_user WITH PASSWORD 'jwt_pass';

-- Grant Access to the Database
GRANT CONNECT ON DATABASE jwt_auth TO db_user;

-- Grant Usage on Schemas
GRANT USAGE ON SCHEMA public TO db_user;

-- Grant Privileges on All Tables
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO db_user;

-- Grant Privileges on Future Tables
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL PRIVILEGES ON TABLES TO db_user;

-- Grant Privileges on Sequences
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO db_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL PRIVILEGES ON SEQUENCES TO db_user;