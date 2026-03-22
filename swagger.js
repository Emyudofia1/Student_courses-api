const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const port = process.env.PORT || 3000;

// ✅ Detect environment
const serverUrl = process.env.RENDER_EXTERNAL_URL
  ? process.env.RENDER_EXTERNAL_URL
  : `http://localhost:${port}`;

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Student Courses API",
      version: "1.0.0"
    },
    servers: [
      {
        url: serverUrl
      }
    ]
  },
  apis: ["./routes/*.js"]
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

module.exports = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};