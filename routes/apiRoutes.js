const router = require('express').Router();
const uuid = require('../helpers/uuid');
const fs = require('fs');
router.get('/', function (req, res) {
//get all notes from DB
    console.info(`Received your ${req.method} request}`)
    const dataFromJSON = fs.readFileSync('./db/db.json', 'utf8');
    res.json(JSON.parse(dataFromJSON));

});

router.post('/', function (req, res) {
// add notes to the db
    console.info(`Received your ${req.method} request`);
    const { title, text } = req.body;
    if (title && text) {
    const newNote = {
        title,
        text,
        id: uuid(),
    };
    const currentNotes = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
    currentNotes.push(newNote);

    fs.writeFile('./db/db.json', JSON.stringify(currentNotes), (err) =>
    err
    ? console.err(err)
    : console.log(`Note for ${newNote.title} has been taken`)
    );
    const response = {
        status: 'Saved Note',
        body: newNote,
    };
    
    console.log(response)
    res.status(201).json(response);
    } else {
        res.status(500).json('Your note was not Saved');
    }
});
router.delete("/:id", function(req, res) {
   let data = fs.readFileSync('./db/db.json', 'utf8');
   const dataFromJSON = JSON.parse(data)

   const newNotes = dataFromJSON.filter((note) => {
    return note.id !== req.params.id;
   });
   fs.writeFile('./db/db.json', JSON.stringify(newNotes), (err) => {
   if (err) {
    console.error(err);
    return;
   }
   
  });
  res.json(newNotes);
});

// BONUS portion be able to delete note.

module.exports = router;