# Issue Tracker: REST API with React Frontend

## Overview

This project is a simple **Issue Tracker** that demonstrates a basic **CRUD** (Create, Read, Update, Delete) application using:
- **Node.js** and **Express** for the backend (REST API).
- **React** for the frontend (client).

It allows users to create, read, update, and delete issues, similar to an issue tracker like **GitHub** or **Jira**.

## Features

- **Create** an issue by providing an ID, title, and description.
- **Read** a list of issues stored in a hardcoded array.
- **Update** an existing issue's title or description.
- **Delete** an issue by its ID.
- Full **client-server communication** using **fetch API** and **React Hooks**.
- Uses a **proxy** in React to forward API calls to the backend.

## Technologies Used

### Backend (Server)
- **Node.js**
- **Express**

### Frontend (Client)
- **React**

## Getting Started

### Prerequisites

Make sure you have **Node.js** and **npm** installed on your machine. You can download Node.js from [here](https://nodejs.org/).

### Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/your-repo-name.git
    cd your-repo-name
    ```

2. **Install dependencies for the server**:
    Navigate to the `server` directory and install the required Node.js packages:
    ```bash
    cd server
    npm install
    ```

3. **Install dependencies for the client**:
    Navigate to the `client` directory and install the React dependencies:
    ```bash
    cd ../client
    npm install
    ```

### Running the Application

1. **Start the backend server**:
    Inside the `server` directory, run:
    ```bash
    node index.js
    ```
    This will start the server at `http://localhost:3001`.

2. **Start the frontend (React) client**:
    Inside the `client` directory, run:
    ```bash
    npm start
    ```
    This will start the React development server at `http://localhost:3000`.

The React app will automatically proxy API requests to the backend server (thanks to the `"proxy"` setting in `package.json`).

### API Endpoints

The backend provides the following REST API endpoints:

- `GET /issues` - Retrieve all issues.
- `POST /issues` - Create a new issue.
- `PUT /issues/:id` - Update an issue by ID.
- `DELETE /issues/:id` - Delete an issue by ID.

### Client-Side Features

- **Create an Issue**: Fill in the form and click "Create Issue."
- **Update an Issue**: Click "Edit" next to an issue, modify the fields, and click "Update Issue."
- **Delete an Issue**: Click "Delete" to remove an issue.

## Example JSON Structure

Here is an example of the JSON object used for an issue:

```json
{
  "id": 1,
  "title": "First issue",
  "description": "This is the first issue."
} 
```

### Future Improvements

- Polished UI: Improve the design and responsiveness.
- Persistent Data: Use a database (e.g., MongoDB, MySQL) to store issues persistently.
- Unit Testing: Add tests to verify the functionality of both the backend and frontend.
- Dockerization: Create Docker containers for both client and server for easy deployment.
