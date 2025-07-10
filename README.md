# AI Portfolio Matcher (Full-Stack)

This project is a full-stack portfolio application featuring a React frontend and an ASP.NET Core backend.

## Prerequisites

- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [Node.js and npm](https://nodejs.org/en/)

## How to Run

You need to run two processes in separate terminals: the backend API and the frontend development server.

### 1. Run the Backend (ASP.NET Core API)

1.  **Navigate to the API directory:**
    ```bash
    cd PortfolioApi
    ```

2.  **Run the backend server:**
    ```bash
    dotnet run
    ```

    The API will start listening on `http://localhost:5198` (or another port specified in the launch settings). It will use an in-memory database, which is seeded with initial data every time it starts.

### 2. Run the Frontend (React App)

1.  **Open a new terminal** at the root of the project.

2.  **Install dependencies:**
    *Note: This project is configured to work with a live development environment and does not require a traditional `npm install` step, as dependencies are loaded via an import map from a CDN.*

3.  **Start the development server:**
    This project is set up to be run in a live development environment like the one you are currently using. If you were running this locally, you would use a tool like `vite` or `live-server` to serve the `index.html` file.

    The frontend will be available and will automatically connect to the backend API running on `http://localhost:5198`.

## Admin Access

-   **Admin Login:** Click the "Admin Login" button in the footer.
-   **Password:** `password123`

Once logged in, you will be able to add and delete projects and skills.
