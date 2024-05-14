const mongoose = require("mongoose");
require("dotenv").config();

class MongoDBConnection {
  constructor() {
    this.createConnection();
  }

  async createConnection() {
    const connectionString = process.env.MONGODB_CONNECTION_STRING;

    if (!connectionString) {
      throw new Error("MongoDB connection string not found");
    }

    const dbOptions = {
      autoIndex: true,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4,
    };

    try {
      mongoose.set("strictQuery", true);
      await mongoose.connect(connectionString, dbOptions);
      console.log("Connected to MongoDB successfully.");
    } catch (error) {
      console.error("Error connecting to MongoDB: ", error);
    }
  }
}

module.exports = new MongoDBConnection();
