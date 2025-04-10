const express = require('express')
const app = express()
const port = 3000
const path = require('path')

var mysql = require('mysql');
const { stat } = require('fs');

var con = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  database:"wayfar"
});

// Middleware to parse JSON request bodies
app.use(express.json());

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
app.use('/', express.static(path.join(__dirname, './public')))

//Get Endpoint to get all users
app.get('/user', (req, res) => {
  const email = req.query.email;

  if (!email) {
      return res.status(400).json({ error: 'Email not provided in request headers' });
  }

  const query = 'SELECT * FROM users WHERE email = ?';
  con.query(query, [email], (err, results) => {
      if (err) {
          return res.status(500).json({ error: 'Database query error', details: err });
      }

      if (results.length === 0) {
          return res.status(404).json({ message: 'User not found',status:404 });
      }

      res.json(results[0]);
  });
});

//Post Endpoint to add a new user
app.post('/user', (req, res) => {
  console.log(req.body)
  const { email, password, gender, phone, name } = req.body;

  // Validate required fields
  if (!email || !password || !gender || !phone || !name) {
      return res.status(400).json({ error: 'All fields are required: email, password, gender, phone' });
  }

  const query = `
      INSERT INTO users (id,email, password, gender, phone, name)
      VALUES (?, ?, ?, ?, ?,?)
  `;

  con.query(query, [null,email, password, gender, phone, name], (err, result) => {
      if (err) {
          if (err.code === 'ER_DUP_ENTRY') {
              return res.status(409).json({ error: 'User with this ID already exists' });
          }
          return res.status(500).json({ error: 'Database error', details: err });
      }

      res.status(201).json({ message: 'User added successfully', userId: result.insertId });
  });
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})