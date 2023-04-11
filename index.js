const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require("mysql");
const port =  8000;

//parse application or json
app.use(bodyParser.json());

//create database connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Sambit123",
    database: "empdb"
});

db.connect((err) => {
    if (err) throw err
    console.log("Database Connection successfull");
});

app.get("/", (req, res) => {
    res.send("hii");
})

//create new recor
app.post("/api/create", (req, res) => {
    let data = {
        name: req.body.name,
        jobtitle:req.body.jobtitle,
        location: req.body.location,
        contact: req.body.contact
    };
    let sql = "INSERT INTO employees SET ?";
    let query = db.query(sql, data, (err, result) => {
        if (err) throw err;
        res.send(JSON.stringify({ status: 200, Response: "new record added succesfully" }));
    })
    
})


// Fetch all records with pagination
app.get("/api/employees", (req, res) => {
    const page = parseInt(req.query.page) || 1; // Default page is 1
    const limit = parseInt(req.query.limit) || 5; // Default limit is 5

    // Calculate the offset for the query
    const offset = (page - 1) * limit;

    let sql = `SELECT * FROM employees LIMIT ${limit} OFFSET ${offset}`;
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        res.send(JSON.stringify({ status: 200, response: result }));
    });
});


//fetch individual record
app.get("/api/employees/:id", (req, res) => {
   
    let sql = "SELECT * FROM employees WHERE id="+req.params.id;
    let query = db.query(sql, (err, result) => {
        if (err) {
            console.error('Error retrieving employees:', err);
            res.status(500).json({ error: 'Failed to retrieve employees' });
        } else {
            res.send(JSON.stringify({ status: 200, response: result }));
        }
    })
})


// Update Employee
app.put('/api/update/:id', (req, res) => {
    const { name, jobtitle, location, contact } = req.body;
    const id = req.params.id;
    const query = 'UPDATE employees SET name = ?, jobtitle = ?, location = ?, contact = ? WHERE id = ?';
    db.query(query, [name, jobtitle, location, contact, id], (err, result) => {
        if (err) {
            console.error('Error updating employee:', err);
            res.status(500).json({ error: 'Failed to update employee' });
        } else {
            res.status(200).json({ message: 'Employee updated successfully' });
        }
    });
});


//delete recor
app.delete("/api/delete/:id", (req, res) => {
    let sql = "DELETE FROM employees WHERE id=" + req.params.id;
    let query = db.query(sql, (err, result) => {
        if (err) {
            console.error('Error retrieving employees:', err);
            res.status(500).json({ error: 'Failed to retrieve employees' });
        } else {
            res.send(JSON.stringify({ status: 200, response: result }));
        }
    })
})


app.listen(port, () => {
    console.log("Server started on port:", port);
})
