const express = require("express");
const mysql = require("mysql");

const app = express();
const port = 3000;

// Create a connection to the MySQL database
const db = mysql.createConnection({
  host: "localhost", // Update with your Docker container hostname or IP
  user: "root", // Update with your MySQL username
  password: "password", // Update with your MySQL password
  database: "donor_db", // Update with your database name
  port: 1433,
});

// Connect to the MySQL database
db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL database:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

// Parse JSON request bodies
app.use(express.json());

// Serve static files
app.use(express.static("public"));

// Handle form submission
app.post("/submit-donor", (req, res) => {
  const { name, email, bloodType, phone } = req.body;

  // Insert donor data into the MySQL database
  const sql =
    "INSERT INTO donors (name, email, bloodType, phone) VALUES (?, ?, ?, ?)";
  const values = [name, email, bloodType, phone];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error inserting donor data:", err);
      res
        .status(500)
        .json({ error: "An error occurred while submitting the form" });
      return;
    }

    console.log("Donor data inserted successfully");
    res.status(200).json({ message: "Form submitted successfully" });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
