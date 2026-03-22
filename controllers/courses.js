const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

// GET all courses
const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDb().collection("courses").find();
    const courses = await result.toArray();
    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET single course
const getSingle = async (req, res) => {
  try {
    const courseId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().collection("courses").find({ _id: courseId });
    const course = await result.toArray();

    if (!course[0]) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json(course[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST create course
const createCourse = async (req, res) => {
  try {
    const { courseName, courseCode, instructor, credits } = req.body;

    // ✅ VALIDATION
    if (!courseName || !courseCode || !instructor || !credits) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const course = { courseName, courseCode, instructor, credits };

    const response = await mongodb.getDb().collection("courses").insertOne(course);

    res.status(201).json({ id: response.insertedId });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT update course
const updateCourse = async (req, res) => {
  try {
    const courseId = new ObjectId(req.params.id);
    const { courseName, courseCode, instructor, credits } = req.body;

    // ✅ VALIDATION
    if (!courseName || !courseCode || !instructor || !credits) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const updatedCourse = { courseName, courseCode, instructor, credits };

    await mongodb.getDb().collection("courses").replaceOne({ _id: courseId }, updatedCourse);

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE course
const deleteCourse = async (req, res) => {
  try {
    const courseId = new ObjectId(req.params.id);

    await mongodb.getDb().collection("courses").deleteOne({ _id: courseId });

    res.status(200).json({ message: "Course deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createCourse,
  updateCourse,
  deleteCourse
};