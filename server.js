// Dependencies

const express = require('express');
const path = require('path');
const fs = require('fs');
const db = require("./db/db.json")

// Sets up the Express App

const app = express();
//need to set PORT to process.env.PORT for heroku deployment
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'))

// Star Wars Characters (DATA)


 


// Routes

// Basic route that sends the user first to the AJAX Page
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, './public/notes.html')));

app.post('/api/notes', (req, res) => {
    db.push(req.body);
    fs.writeFileSync('./db/db.json', JSON.stringify(db));
    res.json("ok");
});
app.get('/api/notes',(req,res)=> {
    res.json(db)
});

app.delete('/api/notes/:id', (req, res) => {
    db.splice(req.params.id, 1);
    fs.writeFileSync('./db/db.json', JSON.stringify(db));
    res.json("ok")
});
// Displays all characters

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
