const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");

dotenv.config();

let db;

const initDb = async (callback) => {
  if (db) return callback(null, db);

  try {
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();

    db = client.db();
    console.log("Connected to MongoDB!");

    callback(null, db);
  } catch (err) {
    console.error("DB connection error:", err);
    callback(err);
  }
};

const getDb = () => db;

module.exports = { initDb, getDb };