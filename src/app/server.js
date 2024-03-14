const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const port = 3000;

const app = express();
app.use(cors());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'metair',
});

db.connect((err) => {
  if (err) {
    console.log('Unable to connect to the database:', err);
  } else {
    console.log('Connected to the database');
  }
});

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

app.get('/kupovine', (req, res) => {
  const query = 'SELECT `id`, `od`, `destinacija`, `vreme`, `brojputnika`, `zeljeniPrtljag`, `ukupnaCena` FROM `kupovine`';
  db.query(query, (error, results) => {
    if (error) {
      console.error('Error executing MySQL query:', error);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(results);
    }
  });
});



// Endpoint za čuvanje kupovine
app.post('/sacuvaj-kupovinu', (req, res) => {
  const { od, destinacija, vreme, brojputnika, zeljeniPrtljag, ukupnaCena } = req.body;

  const query = `INSERT INTO kupovine (od, destinacija, vreme, brojputnika, zeljeniPrtljag, ukupnaCena) 
                 VALUES (?, ?, ?, ?, ?, ?)`;

  db.query(query, [od, destinacija, vreme, brojputnika, zeljeniPrtljag, ukupnaCena], (err, result) => {
    if (err) {
      console.error('Error saving purchase:', err);
      res.status(500).send('Internal Server Error');
    } else {
      console.log('Purchase saved successfully');
      res.status(200).send('OK');
    }
  });
});


app.get('/kupovanje-karte/:id', (req, res) => {
  const id = req.params.id;
  const query = `SELECT * FROM flights WHERE id = ?`;

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error querying database:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      if (result.length === 0) {
        res.status(404).json({ error: 'Data not found' });
      } else {
        res.status(200).json(result[0]);
      }
    }
  });
});






app.post('/kupovanje-karte/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const brojPutnika = req.body.brojPutnika;

  try {
    // const letZaId = await Let.findByPk(id);
    const letZaId = await getLetById(id);

    if (letZaId) {
      if (letZaId.brojputnika >= brojPutnika) {
        await letZaId.update({ brojputnika: letZaId.brojputnika - brojPutnika });

        res.json({ success: true, message: 'Uspešno kupljena karta.' });
      } else {
        res.status(400).json({ success: false, message: 'Nema dovoljno slobodnih mesta.' });
      }
    } else {
      res.status(404).json({ success: false, message: 'Let nije pronađen.' });
    }
  } catch (error) {
    console.error('Greška pri kupovini karte:', error);
    res.status(500).json({ success: false, message: 'Greška pri kupovini karte.' });
  }
});

app.get('/admin', (req, res) => {
  db.query('SELECT * FROM flights', (err, result) => {
    if (err) {
      console.log('Error reading flights from the database:', err);
      res.status(500).send('Error reading flights from the database');
    } else {
      res.json(result);
    }
  });
});

app.post('/admin', (req, res) => {
  const { od, destinacija, vreme, brojputnika, cena } = req.body;

  db.query('INSERT INTO flights (od, destinacija, vreme, brojputnika, cena) VALUES (?, ?, ?, ?, ?)', [od, destinacija, vreme, brojputnika, cena], (err, result) => {
    if (err) {
      console.log('Error adding a new phone to the database:', err);
      res.status(500).send('Error adding a new phone to the database');
    } else {
      const insertedLetId = result.insertId;
      console.log('Inserted let:', { id: insertedLetId, od, destinacija, vreme, brojputnika, cena });
      res.json({ id: insertedLetId, od, destinacija, vreme, brojputnika, cena });
    }
  });
});

//ovde mozda i dole ide ketoviu
app.put('/admin/:id', (req, res) => {
  const id = req.params.id;
  const { od, destinacija, vreme, brojputnika, cena } = req.body;

  db.query('UPDATE flights SET od=?, destinacija=?, vreme=?, brojputnika=?, cena=? WHERE id=?', [od, destinacija, vreme, brojputnika,
    cena, id], (err) => {
    if (err) {
      console.log('Error updating the phone in the database:', err);
      res.status(500).send('Error updating the phone in the database');
    } else {
      res.send('Phone updated successfully');
    }
  });
});

app.delete('/admin/:id', (req, res) => {
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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


