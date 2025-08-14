const express = require("express");
const cors = require("cors");
const projectRoutes = require("./routes/projectRoutes");

const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// ROUTES
app.use("/api/projects", projectRoutes);

// DEFAULT ROUTE
app.get("/", (req, res) => {
  res.send(`${process.env.APP_NAME} - Backend API`);
});

module.exports = app;
