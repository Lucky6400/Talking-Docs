# Talking Docs

**Talking Docs** is a full-stack web application that allows users to communicate through PDF documents. It combines the power of chat functionality with the PDF files seamlessly. This README provides an overview of the application's features, technologies used, and how to set it up.

## Features

- **PDF Chat**: Communicate with others in real-time while viewing and annotating PDF documents.
- **User Authentication**: Securely sign up and log in to access your chat history and documents.
- **PDF Upload**: Easily upload and share PDF files with other users.
- **PDF Storage**: Store PDF details, user information, and chat messages securely in a MongoDB database.
- **API Integration**: Utilizes the ChatPDF API for chat functionality, enhancing PDF interaction.
- **Responsive Design**: The application is built using React, TypeScript, and Tailwind CSS for a modern and responsive user interface.
- **State Management**: Redux is used for efficient state management on the frontend.
- **JWT Authentication**: JSON Web Tokens (JWT) are employed for secure user authentication.
- **API Integration**: Axios is used for seamless API integration in both the frontend and backend.
- **Node.js Backend**: The backend is developed in Node.js with Express, handling authentication and database operations.
- **MongoDB Database**: MongoDB is used to store user data, PDF details, and chat messages.
- **Formidable**: Formidable is used to handle file uploads and processing of PDFs on the backend.

## Technologies Used

- Frontend:
  - React
  - TypeScript
  - Tailwind CSS
  - Material Tailwind
  - Redux
  - Axios

- Backend:
  - Node.js
  - Express.js
  - MongoDB
  - JSON Web Tokens (JWT)
  - Formidable
  - Axios

## Getting Started

To run the "Talking Docs" application locally, follow these steps:

1. **Clone the Repository**:
   ```
   git clone https://github.com/Lucky6400/Talking-Docs.git
   ```

2. **Install Dependencies**:
   ```
   cd talking-docs/talking-docs-frontend
   npm install
   cd ../backend
   npm install
   ```

3. **Set Environment Variables**:
   Create a `.env` file in the `backend` directory and configure the following environment variables:

   ```
   PORT=3000
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   CHATPDF_API_KEY=your_chatpdf_api_key
   ```

4. **Run the Application**:
   ```
   cd backend
   npm start
   ```

   ```
   cd talking-docs-frontend
   npm start
   ```

5. **Access the Application**:
   Open your browser and navigate to `http://localhost:3000` to access the "Talking Docs" application.

## Usage

1. **Sign Up / Log In**: Create an account or log in to your existing account.

2. **PDF Upload**: Upload PDF files to your account.

3. **Chat with PDF**: Select a PDF document to chat with. You can send and receive messages.

**Talking Docs** is developed and maintained by Lucky Jain. If you have any questions or need assistance, please contact luckyjain6400@gmail.com.
