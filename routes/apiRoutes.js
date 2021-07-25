const path = require('path');
const { readAndAppend, readFromFile,  writeToFile } = require('../helpers/fsUtils');
const { v4: uuidv4 } = require('uuid');
const router = require('express').Router();


router.get('/notes', (req, res) =>{
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});
router.post('/notes', (req, res) =>{

   const {title,text} = req.body;
   if(title && text){
       const newNote = {
           title,
           text,
           id: uuidv4(),
           
       };
       readAndAppend(newNote, './db/db.json');

       const response = {
        status: 'success',
        body: newNote
      };
      res.json(response);
   }else{
       res.json('Error in posting note');
   }
});


// GET Route for a specific note to delete
router.delete('/notes/:id', (req, res) => {
    const NoteId = req.params.id;
    readFromFile('./db/db.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
        const result = json.filter((note) => note.id !== NoteId);
        writeToFile('./db/db.json', result);
        res.json(`Deleted ${NoteId}`);
        
  });
});
module.exports = router;