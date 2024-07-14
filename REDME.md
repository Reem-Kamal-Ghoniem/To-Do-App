# To-Do App

A simple To-Do application with backend and frontend using Expo, React, and Node.js.

## Overview

This project is a full-stack To-Do application that allows users to manage tasks. It includes a backend API built with Node.js and Express, using Prisma for database operations and JWT for authentication. The frontend is developed with Expo and React Native for cross-platform mobile support.

## Features

- User registration and authentication
- CRUD operations for tasks (Create, Read, Update, Delete)
- Secure authentication using JWT tokens
- Responsive and intuitive UI with Expo and React Native

## Prerequisites

Before running the project, ensure you have the following installed:

- Node.js (v14 or higher)
- NPM or Yarn
- Expo CLI (install globally)

## Getting Started

To get a local copy up and running, follow these steps:

- Clone the repository

- Install dependencies

- Create a .env file in the root directory with the following content

- Run the backend server

- Run the Expo frontend

-Access the application:
Open Expo Go on your mobile device and scan the QR code from the Expo DevTools webpage that opens in your browser.

Usage
Register or login to access the To-Do list.
Add, update, delete tasks.
Mark tasks as completed.
## API Documentation
### The API endpoints include:

-POST /user/register: Register a new user.
-POST /user/login: Login and receive a JWT token.
-GET /tasks/getTask/:id: Get a task by ID.
-POST /tasks/addTask/:user_id: Add a new task for a user.
-DELETE /tasks/deleteTask/:id: Delete a task by ID.
-PUT /tasks/updateTask/:id: Update a task by ID.

## Technologies Used
-Node.js
-Express
-Prisma
-JWT
-Expo
-React Native
