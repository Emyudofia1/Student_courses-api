const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

// GET all students
const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDb().collection("students").find();
    const students = await result.toArray();
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET single student
const getSingle = async (req, res) => {
  try {
    const studentId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().collection("students").find({ _id: studentId });
    const student = await result.toArray();

    if (!student[0]) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json(student[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST create student
const createStudent = async (req, res) => {
  try {
    const { firstName, lastName, email, age, course, gpa, enrollmentDate } = req.body;

    // ✅ VALIDATION
    if (!firstName || !lastName || !email || !age || !course || !gpa || !enrollmentDate) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const student = {
      firstName,
      lastName,
      email,
      age,
      course,
      gpa,
      enrollmentDate
    };

    const response = await mongodb.getDb().collection("students").insertOne(student);

    res.status(201).json({ id: response.insertedId });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT update student
const updateStudent = async (req, res) => {
  try {
    const studentId = new ObjectId(req.params.id);
    const { firstName, lastName, email, age, course, gpa, enrollmentDate } = req.body;

    // ✅ VALIDATION
    if (!firstName || !lastName || !email || !age || !course || !gpa || !enrollmentDate) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const updatedStudent = {
      firstName,
      lastName,
      email,
      age,
      course,
      gpa,
      enrollmentDate
    };

    await mongodb.getDb().collection("students").replaceOne({ _id: studentId }, updatedStudent);

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE student
const deleteStudent = async (req, res) => {
  try {
    const studentId = new ObjectId(req.params.id);

    await mongodb.getDb().collection("students").deleteOne({ _id: studentId });

    res.status(200).json({ message: "Student deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createStudent,
  updateStudent,
  deleteStudent
};