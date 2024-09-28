const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const { v4: uuidv4 } = require('uuid');
const bodyParser = require('body-parser');  
const app = express();
const PORT = process.env.PORT || 3001;
var cors = require('cors');

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
app.use(bodyParser.json()); // For parsing application/json

// Database setup
const db = new sqlite3.Database('./userAddressApp.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to SQLite database.');
});

// Create users and addresses tables if they don't exist
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL
  )
`);

db.run(`
  CREATE TABLE IF NOT EXISTS addresses (
    id TEXT PRIMARY KEY,
    address TEXT NOT NULL,
    user_id TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
  )
`);

// Route to create a new user with an address
app.post('/register', (req, res) => {
  const { name, address } = req.body;

  if (!name || !address) {
    return res.status(400).json({ error: 'Name and address are required' });
  }

  const userId = uuidv4();
  const addressId = uuidv4();

  // Insert user into users table
  db.run('INSERT INTO users (id, name) VALUES (?, ?)', [userId, name], function (err) {
    if (err) {
      return res.status(500).json({ error: 'Failed to create user' });
    }

    // Insert address into addresses table
    db.run('INSERT INTO addresses (id, address, user_id) VALUES (?, ?, ?)', [addressId, address, userId], function (err) {
      if (err) {
        return res.status(500).json({ error: 'Failed to store address' });
      }

      res.json({ message: 'User and address created successfully', userId, addressId });
    });
  });
});

// Route to get all users with their addresses
app.get('/users', (req, res) => {
  const query = `
    SELECT users.id as userId, users.name, addresses.id as addressId, addresses.address
    FROM users
    LEFT JOIN addresses ON users.id = addresses.user_id
  `;

  db.all(query, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch users and addresses' });
    }
    res.json(rows);
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
