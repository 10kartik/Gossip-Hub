const mongoose = require("mongoose");
// use dotenv to get environment variables
require("dotenv").config();

class MongoDBConnection {
  constructor() {
    this.createConnection();
  }

  async createConnection() {
    // Get DB configs from environment properties file
    const connectionString = process.env.MONGODB_CONNECTION_STRING;

    if (!connectionString) {
      throw new Error("MongoDB connection string not found");
    }

    const dbOptions = {
      autoIndex: true, // Don't build indexes
      maxPoolSize: 10, // Maintain up to 10 socket connections
      serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      family: 4, // Use IPv4, skip trying IPv6
    };

    try {
      mongoose.set("strictQuery", true);
      await mongoose.connect(connectionString, dbOptions);
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = new MongoDBConnection();
