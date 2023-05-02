const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const csv = require('fast-csv');

const app = express();

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "lehcorsql110120",
  database: "facerecattendance",
  connectionLimit: 20,
});

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './images/profile'); // set the destination folder
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // set the filename
  }
});

const upload = multer({ storage: storage });

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

// Registration

app.post("/api/insert",upload.single('photo'), (req, res) => {
  const id = req.body.employee_id;
  const name = req.body.employee_name;
  const dep = req.body.department;
  const des = req.body.designation;
  const photo = req.file.path;
  const registered_at = req.body.registered_at;
  const updated_at = req.body.updated_at;

  const sqlInsert = 
    `INSERT INTO employee (employee_id, name, 
    department, designation, image, registered_at, updated_at) 
    VALUES (?,?,?,?,?,?,?)`;
  
  try {
    db.query(
      sqlInsert,
      [id, name, dep, des, photo, registered_at, updated_at],
      (err, result) => {
        if(err) console.log(err); 
        res.send(result);
    })
  } catch (error) {
    console.error(error)
  }
});


// Route to retrieve attendance data from MySQL and send it to frontend
app.get("/api/data", (req, res) => {
  try {
    db.query('SELECT * FROM attendance_record', (err, result) => {
      if(err) throw err;
      const data = result.map(row => {
        return {
          id: row.id,
          employee_id: row.employee_id,
          name: row.name,
          date: row.attendance_date,
          status: row.status,
          morning_in: row.morning_in,
          morning_out: row.morning_out,
          afternoon_in: row.afternoon_in,
          afternoon_out: row.afternoon_out
        };
      });
      // Send JSON response to the client
      res.json(data);
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});


// Route to retrieve employee data from MySQL and send it to frontend
app.get("/api/employee_list", (req, res) => {
  try {
    db.query('SELECT * FROM employee', (err, result) => {
      if(err) throw err;
     
      const data = result.map(row => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'};
        const registered_at = row.registered_at.toLocaleString('en-US', options)
        const updated_at = row.registered_at.toLocaleString('en-US', options)
        return {
          id: row.id,
          employee_id: row.employee_id,
          name: row.name,
          department: row.department,
          designation: row.designation,
          registered_at: registered_at,
          updated_at: updated_at,
        };
      });

      // Send JSON response to the client
      res.json(data);
    });
  } catch (error) {
    console.log('error');
    res.status(500).send('Server error');
  }
});

// Getting employee information on select
app.get("/api/employee_info/:id", (req, res) => {
  try {
    db.query('SELECT * FROM employee WHERE employee_id = ?', [req.params.id], (err, result) => {
      if(err) throw err;
      res.json(result);
    });
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Deleting the selected employee
app.delete("/api/delete_employee/:id", (req, res) => {
  try {
    db.query('DELETE FROM employee WHERE employee_id = ?', [req.params.id], (err, result) => {
      if(err) throw err;
      res.send(result);
      console.log('deleted successfully');
    })
  } catch (error) {
    res.status(500).send('Server error')
  }
})

//generating csv file

app.get("/api/csv_export", (req, res) => {
  const ws = fs.createWriteStream('./reports/report.csv')

  db.query("SELECT * FROM attendance_record", (error, data, fields) => {
    if (error) throw error;
  
    const jsonData = JSON.parse(JSON.stringify(data));
    console.log("jsonData", jsonData);
  
    csv.write(jsonData,{ headers: true }).on("finish", () => {
      console.log("wrote csv successfully");
    }).pipe(ws);
  })
})


app.listen(5000, () => {
  console.log("listening to port 5000");
});
