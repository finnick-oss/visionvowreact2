const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();

// Enable CORS
app.use(cors());
app.use(express.json()); // Parse JSON bodies

const db = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: '',
    database: 'dashboard'
});


// Route to handle data insertion
app.post('/survey', (req, res) => {
    const dateNew = new Date().toISOString().slice(0, 10);
    const { pid, uid, status, ip, date} = req.body;

    const sql = "INSERT INTO survey (pid, uid, status, ip, date) VALUES (?, ?, ?, ?, ?)";
    db.query(sql, [pid, uid, status, ip, dateNew], (err, result) => {
        if (err) {
            console.error("Error inserting data:", err);
            return res.status(500).json({ error: "Error inserting data into the database" });
        }
        console.log("Data inserted successfully");
        return res.status(200).json({ message: "Data inserted successfully" });
    });
});

// Route to fetch data
app.get('/survey', (req, res) => {
    const sql = "SELECT * FROM survey";
    db.query(sql, (err, result) => {
        if (err) {
            console.error("Error fetching data:", err);
            return res.status(500).json({ error: "Error fetching data from the database" });
        }
        console.log("Data fetched successfully");
        console.log(result); // Log the fetched data
        return res.status(200).json(result);
    });
});

app.listen(8083, () => {
    console.log(`Server is running on port 8083`);
});
