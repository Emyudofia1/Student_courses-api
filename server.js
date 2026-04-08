const express = require("express");
const app = express();
const { initDb } = require("./db/connect");

const studentsRoutes = require("./routes/students");
const coursesRoutes = require("./routes/courses");
const userRoutes = require("./routes/users");

const swagger = require("./swagger"); // ✅ FIXED

// Middleware
app.use(express.json());

// Swagger
swagger(app); // ✅ FIXED

// Routes
app.use("/users", userRoutes);
app.use("/students", studentsRoutes);
app.use("/courses", coursesRoutes);

// Home route
app.get("/", (req, res) => {
  res.send("Student API is running");
});

// Start server after DB connects
const port = process.env.PORT || 3000;

initDb((err) => {
  if (err) {
    console.error("DB connection failed");
    process.exit(1);
  }

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});