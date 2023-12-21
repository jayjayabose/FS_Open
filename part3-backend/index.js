require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const PORT = process.env.PORT
const PASSWORD = process.env.PASSWORD
const USER_NAME = process.env.USER_NAME
const CLUSTER_NAME = process.env.CLUSTER_NAME


const url = `mongodb+srv://${USER_NAME}:${PASSWORD}@${CLUSTER_NAME}/?retryWrites=true&w=majority`;
mongoose.set('strictQuery',false)
mongoose.connect(url);

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// let notes = [
//   {
//     id: 1,
//     content: "HTML is easy",
//     important: true
//   },
//   {
//     id: 2,
//     content: "Browser can execute only JavaScript",
//     important: false
//   },
//   {
//     id: 3,
//     content: "GET and POST are the most important methods of HTTP protocol",
//     important: true
//   }
// ]

// middleware: use json parser
app.use(express.json());

app.get('/', (request, response) => {
  response.status = 200;
  response.send('Hola, amigo!!');
});

// v1 notes is local variable
// app.get('/api/notes', (request, response) => {
//   response.json(notes);
// });

// v2 get notes from mongo
app.get('/api/notes', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes);
  });
});

app.get('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id);
  const note = notes.find(note => note.id === id)
  if (note) {
    response.json(note);
  } else {
    response.statusMessage = 'note not found'
    response.status(404).end();
  }
});

app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id);
  notes = notes.filter(note => note.id !== id);
  response.status(204).end()
});

app.post('/api/notes', (request, response) => {
  function generateID() {
    return notes.length + 1;
  }
  const id = Number(request.params.id);
  // b/c we use json parser request.body is json already
  const body = request.body;

  if (!body.content) {
    return response.status(404).json({
      error: 'note content is missing'
    });
  }
  
  const newNote = {
    id: generateID(),
    content: body.content,
    important: body.important || false,
  }

  notes = notes.concat(newNote);
  console.log('create note', newNote)
  response.status(200).json(notes);
});

// NOTE: 'middleware' after all routes as catch all
app.use(unknownEndpoint)


app.listen(PORT)
console.log(`Server running on port: ${PORT}`);