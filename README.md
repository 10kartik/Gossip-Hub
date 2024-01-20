# Gossip Hub - Real-time Chat Application

Gossip Hub is a Real-time Chat Application that allows users to connect, chat, and discuss in predefined channels related to technology topics like Artificial Intelligence, Blockchain, Machine Learning, and Distributed Systems.

## Features

- **User Authentication:** Users are prompted to enter their username upon connection.
- **Channel Selection:** Users can join predefined channels to discuss specific technology topics.
- **Real-time Messaging:** Users can send and receive messages in real-time within their selected channel.
- **Chat History:** Messages are stored in MongoDB, allowing users to retrieve and view the chat history upon connecting to a channel.
- **User Notifications:** New user entries and welcome messages are broadcasted to all connected users in the channel.
- **Technology Stack:** MongoDB, Mongoose, Node.js, Express, React.js, Socket.io.

## Getting Started

1. **Clone the Repository:**

    ```bash
    git clone https://github.com/10kartik/Gossip-Hub.git
    cd gossip-hub
    ```

2. **Install Dependencies:**

    ```bash
    cd backend
    npm install

    cd ../frontend
    npm install
    ```

3. **Set Up MongoDB:**

    - Ensure MongoDB is installed and running.
    - Set MongoDB URI under process environment variables with name "MONGODB_CONNECTION_STRING".

4. **Run the Application:**

    ```bash
    # Run the server
    cd backend
    npm run dev

    # Run the client
    cd ../frontend
    npm start
    ```

5. **Open in Browser:**

    Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. **Enter Username:**
    - Upon connection, users will be prompted to enter their username.

2. **Select Channel:**
    - Users can join one of the predefined channels to start chatting.

3. **Real-time Chatting:**
    - Users can send and receive messages in real-time within the selected channel.

4. **Chat History:**
    - Chat history is stored in MongoDB and retrieved when users connect to a channel.

## Contributing

Contributions are welcome! If you have suggestions, feature requests, or find a bug, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
