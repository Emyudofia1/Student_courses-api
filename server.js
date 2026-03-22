const express = require("express");
const app = express();
const { initDb } = require("./db/connect");
const studentsRoutes = require("./routes/students");
const coursesRoutes = require("./routes/courses");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

// Middleware
app.use(express.json());

// Routes
app.use("/students", studentsRoutes);

// Home route
app.get("/", (req, res) => {
  res.send("Student API is running");
});

app.use("/courses", coursesRoutes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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