require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db");

const morgan = require("morgan");

const app = express();

app.use(cors());
app.use(express.json());

// Get all courses
app.get("/api/courses", async (req, res) => {
  try {
    const coursesData = await db.query("select * from courses");
    res.status(200).json({
      status: "success",
      results: coursesData.rows.length,
      data: {
        courses: coursesData.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// Create a course
app.post("/api/courses", async (req, res) => {
  console.log(req.body);

  try {
    const results = await db.query(
      "INSERT INTO courses (name, platform, instructor, price_range) values ($1, $2, $3, $4) returning *",
      [
        req.body.name,
        req.body.platform,
        req.body.instructor,
        req.body.price_range,
      ]
    );
    console.log(results);
    res.status(201).json({
      status: "succes",
      data: {
        course: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// Delete a Course

app.delete("/api/courses/:id", async (req, res) => {
  try {
    const results = db.query("DELETE FROM courses where id = $1", [
      req.params.id,
    ]);
    res.status(204).json({
      status: "sucess",
    });
  } catch (err) {
    console.log(err);
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`server is up and listening on port ${port}`);
});
