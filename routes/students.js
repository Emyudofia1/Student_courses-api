const express = require("express");
const router = express.Router();
const studentsController = require("../controllers/students");
const verifyToken = require("../middleware/auth");

// ROUTES ONLY (no logic here)

/**
 * @openapi
 * /test:
 *   get:
 *     summary: Test route
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/test", (req, res) => {
  res.send("Test working");
});


/**
 * @swagger
 * /students:
 *   get:
 *     summary: Get all students
 *     tags: [Students]
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/", studentsController.getAll);


/**
 * @swagger
 * /students/{id}:
 *   get:
 *     summary: Get student by ID
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/:id", studentsController.getSingle);

/**
 * @swagger
 * /students:
 *   post:
 *     summary: Create a new student
 *     tags: [Students]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               age:
 *                 type: number
 *               course:
 *                 type: string
 *               gpa:
 *                 type: number
 *               enrollmentDate:
 *                 type: string
 *     responses:
 *       201:
 *         description: Student created
 */
// router.post("/", studentsController.createStudent);
router.post("/", verifyToken, studentsController.createStudent);


/**
 * @swagger
 * /students/{id}:
 *   put:
 *     summary: Update a student
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               age:
 *                 type: number
 *               course:
 *                 type: string
 *               gpa:
 *                 type: number
 *               enrollmentDate:
 *                 type: string
 *     responses:
 *       204:
 *         description: Student updated
 */
// router.put("/:id", studentsController.updateStudent);
router.put("/:id", verifyToken, studentsController.updateStudent);


/**
 * @swagger
 * /students/{id}:
 *   delete:
 *     summary: Delete a student
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Student deleted
 */
// router.delete("/:id", studentsController.deleteStudent);
router.delete("/:id", verifyToken, studentsController.deleteStudent);

module.exports = router;