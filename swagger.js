const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

module.exports = (app) => {
  const port = process.env.PORT || 3000;

  const serverUrl = process.env.RENDER_EXTERNAL_URL
    ? process.env.RENDER_EXTERNAL_URL
    : `http://localhost:${port}`;

  const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Student Courses API",
        version: "1.0.0",
        description: "API for managing students, courses, and users"
      },

      servers: [
        {
          url: serverUrl
        }
      ],

      // 🔐 JWT AUTH CONFIG
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT"
          }
        }
      },

      // 🔐 APPLY AUTH GLOBALLY
      security: [
        {
          bearerAuth: []
        }
      ]
    },

    // 🔥 IMPORTANT: must match your routes folder
    apis: ["./routes/**/*.js"]
  };

  const swaggerSpec = swaggerJsdoc(options);

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};