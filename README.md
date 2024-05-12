***HireQuotient Assignment***

*Frontend Deployment*: https://chatapplication-eta.vercel.app/

*Backend Deployment*: https://chatapplication-2tey.onrender.com

*API Documentation*: https://documenter.getpostman.com/view/19271450/2sA3JNaL7H

# Chat Application

Welcome to the Chat Application! This application allows users to chat with each other in real-time.

## Features

- Real-time messaging between users using peer to peer sockets
- User authentication with login and registration
- User profiles with customizable status
- Attachment support for sending images and videos
- Responsive design for use on different devices


## Getting Started

Follow these steps to run the application locally:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/SaiAdithya3/hirequotient-assignment.git
   ```
2. **Install the dependencies**
    ```bash
    cd client
    npm install
    ```
    ```bash
    cd ..
    cd server
    npm install
    ```
3. **Start the frontend server**
    ```bash
    npm run dev
    ```
4. **Add environmental variables**
    Create a new .env file and copy the following env variables and paste it in the '.env' file in client folder
    ```bash
    publicKey='YOUR_IMAGEKIT_PUBLICKEY'
    privateKey='YOUR_IMAGEKIT_PRIVATEKEY'
    urlEndpoint='URL_ENDPOINT'
    authenticationEndpoint='AUTHENTICATION_ENDPOINT'
    ```
5. **Add environmental variables -server**
    Create a new .env file and copy the following env variables and paste it in the '.env' file in server folder
    ```bash
    MONGO_URI='YOUR_MONGO_URI'
    PORT = 5000
    JWT_SECRET = 'YOUR_JWT_SECRET'
    NODE_ENV=development
    GOOGLE_API_KEY='YOUR_GEMINIAPI_KEY'
    ```
6. **Start the backend server**
    ```bash
    npm start
    ```
7. **Access the application**
    *Frontend*: http://localhost:5173/
    *Backend*:http://localhost:5000/


## Highlights

- This application uses React for the front end and Node.js with Express for the back end.
- MongoDB is used as the database to store user information and messages.
- User authentication is implemented using JSON Web Tokens (JWT).
- Socket.IO is used for real-time communication between the server and clients.
- Imagekit CDN for storing of files such as images, videos, etc
- React Context for global state management
- TailwindCSS for styling and design purpose
