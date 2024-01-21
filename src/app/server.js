const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
// const Sequelize = require('sequelize');
const { Sequelize, DataTypes } = require('sequelize');

const port = 3000;

const app = express();
app.use(cors());

// Konfiguracija MySQL baze podataka
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'metair'
});

const sequelize = new Sequelize('metair', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});


// Povezivanje sa bazom
db.connect((err) => {
  if (err) {
    console.log('Unable to connect to the database:', err);
  } else {
    console.log('Connected to the database');
  }
});

// Omogućavanje JSON parsiranja za POST zahteve
app.use(bodyParser.json());

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const query = `SELECT * FROM login WHERE username = ? AND password = ?`;

  db.query(query, [username, password], (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      res.status(500).json({ success: false, message: 'Server error' });
    } else if (results.length > 0) {
      res.status(200).json({ success: true, message: 'Admin login successful' });
    } else {
      res.status(401).json({ success: false, message: 'Invalid admin credentials' });
    }
  });
});


const Flight = sequelize.define('flight', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  od: Sequelize.STRING,
  destinacija: Sequelize.STRING,
  vreme: Sequelize.STRING,
  brojputnika: Sequelize.INTEGER,
  cena: Sequelize.INTEGER,
});

app.get('/kupovanje-karte/:id', async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    // Povuci podatke iz baze za određeni id
    const letZaId = await Flight.findByPk(id);

    if (letZaId) {
      res.json(letZaId);
    } else {
      res.status(404).json({ error: 'Let nije pronađen.' });
    }
  } catch (error) {
    console.error('Greška pri čitanju iz baze:', error);
    res.status(500).json({ error: 'Greška pri čitanju iz baze.' });
  }
});


// app.get('/kupovanje-karte/:id', (req, res) => {
//   // Ovde je potrebno dohvatiti podatke o letovima
//   // i zatim ih proslediti na odgovarajući način.

//   // Primer:
//   const letovi = getLetovi(); // Funkcija koja dohvata podatke o letovima
//   const id = req.params.id;
//   const selectedLet = letovi.find(let => let.id === id);

//   if (selectedLet) {
//     res.json(selectedLet);
//   } else {
//     res.status(404).send('Let nije pronađen.');
//   }
// // });
// app.get('/kupovanje-karte/:id', (req, res) => {
//   const id = parseInt(req.params.id);

//   const letZaId = letovi.find(leto => leto.id === id);

//   if (letZaId) {
//     res.json(letZaId);
//   } else {
//     res.status(404).json({ error: 'Let nije pronađen.' });
//   }
// });





// Endpoint za čitanje svih letova
app.get('/letovi', (req, res) => {
  db.query('SELECT * FROM flights', (err, result) => {
    if (err) {
      console.log('Error reading flights from the database:', err);
      res.status(500).send('Error reading flights from the database');
    } else {
      res.json(result);
    }
  });
});

// Endpoint za dodavanje novog telefona
app.post('/letovi', (req, res) => {
  const { od, destinacija, vreme, brojputnika, cena} = req.body;

  db.query('INSERT INTO flights (od, destinacija, vreme, brojputnika, cena) VALUES (?, ?, ?, ?, ?)', [od, destinacija, vreme, brojputnika, cena], (err, result) => {
    if (err) {
      console.log('Error adding a new phone to the database:', err);
      res.status(500).send('Error adding a new phone to the database');
    } else {
      const insertedLetId = result.insertId;
      console.log('Inserted let:', { id: insertedLetId, od, destinacija, vreme, brojputnika, cena});
      res.json({ id: insertedLetId, od, destinacija, vreme, brojputnika, cena });
    }
  });
});

// Endpoint za ažuriranje letova
app.put('/letovi/:id', (req, res) => {
  const id = req.params.id;
  const { od, destinacija, vreme, brojputnika, cena} = req.body;

  db.query('UPDATE flights SET od=?, destinacija=?, vreme=?, brojputnika=?, cena=? WHERE id=?', [od, destinacija, vreme, brojputnika, cena, id], (err) => {
    if (err) {
      console.log('Error updating the phone in the database:', err);
      res.status(500).send('Error updating the phone in the database');
    } else {
      res.send('Phone updated successfully');
    }
  });
});

// Endpoint za brisanje letova
app.delete('/letovi/:id', (req, res) => {
  const id = req.params.id;

  db.query('DELETE FROM flights WHERE id=?', [id], (err) => {
    if (err) {
      console.log('Error deleting the phone from the database:', err);
      res.status(500).send('Error deleting the phone from the database');
    } else {
      res.send('Phone deleted successfully');
    }
  });
});





// app.get('/flights', (req, res) => {
//   const sql = 'SELECT * FROM flights';
//   db.query(sql, (err, flights) => {
//     if (err) {
//       res.status(500).send(err);
//     } else {
//       res.status(200).json(flights);
//     }
//   });
// });

// app.post('/flights', (req, res) => {
//   const { name, destination } = req.body;
//   const sql = 'INSERT INTO flights (name, destination) VALUES (?, ?)';
//   db.query(sql, [name, destination], (err, result) => {
//     if (err) {
//       res.status(500).send(err);
//     } else {
//       res.status(201).json({ id: result.insertId });
//     }
//   });
// });

// app.put('/flights/:id', (req, res) => {
//   const flightId = req.params.id;
//   const { name, destination } = req.body;
//   const sql = 'UPDATE flights SET name = ?, destination = ? WHERE id = ?';
//   db.query(sql, [name, destination, flightId], (err, result) => {
//     if (err) {
//       res.status(500).send(err);
//     } else {
//       res.status(200).json({ id: flightId });
//     }
//   });
// });

// app.delete('/flights/:id', (req, res) => {
//   const flightId = req.params.id;
//   const sql = 'DELETE FROM flights WHERE id = ?';
//   db.query(sql, [flightId], (err, result) => {
//     if (err) {
//       res.status(500).send(err);
//     } else {
//       res.status(200).json({ id: flightId });
//     }
//   });
// });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
