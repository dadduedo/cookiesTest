const express = require('express');
const db = require('./models/index.js');

const app = express();

app.use(express.json());

// Route to get all users
app.get('/utenti', async (req, res) => {
  const utenti = await db.User.findAll();
  res.json(utenti);
});

// Route to create a new user
app.post('/utenti', async (req, res) => {
  const { nome, email } = req.body;
  const newUser = await db.User.create({ nome, email });
  res.json(newUser);
});

// Route to get a user by ID
app.get('/utenti/:id', async (req, res) => {
  const user = await db.User.findByPk(req.params.id);
  if (!user) {
    res.status(404).json({ message: 'Utente non trovato' });
  } else {
    res.json(user);
  }
});

// Route to update a user
app.put('/utenti/:id', async (req, res) => {
  const { nome, email } = req.body;
  const user = await db.User.findByPk(req.params.id);
  if (!user) {
    res.status(404).json({ message: 'Utente non trovato' });
  } else {
    db.User.nome = nome;
    db.User.email = email;
    await db.User.save();
    res.json(user);
  }
});

// Route to delete a user
app.delete('/utenti/:id', async (req, res) => {
  const user = await db.User.findByPk(req.params.id);
  if (!user) {
    res.status(404).json({ message: 'Utente non trovato' });
  } else {
    await db.User.destroy();
    res.json({ message: 'Utente eliminato con successo' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`Server in ascolto sulla porta 727`);
});
