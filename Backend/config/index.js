// LOAD ENVIRONMENT VARIABLES
require("dotenv").config();

// EXPORT CONFIGURATION OBJECT
module.exports = {
  app: {
    name: process.env.APP_NAME || "Bootcamp Project Tracker",
    port: process.env.PORT || 3000,
    env: process.env.NODE_ENV || "development",
  },
  cors: {
    origin: process.env.CORS_ORIGIN || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
};
